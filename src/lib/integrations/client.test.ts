import { createServiceClient, IntegrationError } from './client';

/** Minimal Response stand-in — jsdom has no fetch to spy on by default. */
function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `HTTP ${status}`,
    text: async () => (body === undefined ? '' : JSON.stringify(body)),
  } as Response;
}

function textResponse(text: string, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `HTTP ${status}`,
    text: async () => text,
  } as Response;
}

const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock as unknown as typeof fetch;
});

const token = async () => 'test-token';
const noToken = async () => null;

describe('createServiceClient', () => {
  describe('authentication', () => {
    it('attaches the bearer token', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));

      await createServiceClient('cms', token).request('/thing');

      const init = fetchMock.mock.calls[0][1];
      expect(init.headers.Authorization).toBe('Bearer test-token');
    });

    it('fails fast without a token when auth is required', async () => {
      const client = createServiceClient('cms', noToken);

      await expect(client.request('/thing')).rejects.toMatchObject({
        code: 'unauthenticated',
      });
      // The request must not go out at all — a guaranteed 401 is wasted latency.
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('proceeds without a token when auth is optional', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));

      await createServiceClient('cms', noToken).request('/thing', {
        auth: 'optional',
      });

      expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined();
    });

    it('never asks for a token when auth is none', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));
      const provider = jest.fn(token);

      await createServiceClient('storefront', provider).request('/catalog', {
        auth: 'none',
      });

      expect(provider).not.toHaveBeenCalled();
    });

    it('reports a throwing token provider as an auth failure, not a network one', async () => {
      const client = createServiceClient('cms', async () => {
        throw new Error('MSAL exploded');
      });

      await expect(client.request('/thing')).rejects.toMatchObject({
        code: 'unauthenticated',
      });
    });
  });

  describe('error mapping', () => {
    it.each([
      [401, 'unauthenticated'],
      [403, 'forbidden'],
      [404, 'not_found'],
      [500, 'server'],
    ])('maps HTTP %i to %s', async (status, code) => {
      fetchMock.mockResolvedValue(jsonResponse({ error: 'nope' }, status));

      await expect(
        createServiceClient('cms', token).request('/thing')
      ).rejects.toMatchObject({ code, status });
    });

    it('surfaces the server error message', async () => {
      fetchMock.mockResolvedValue(
        jsonResponse({ error: 'Item is out of stock' }, 409)
      );

      await expect(
        createServiceClient('storefront', token).request('/thing')
      ).rejects.toThrow('Item is out of stock');
    });

    it('falls back to raw text when the error body is not JSON', async () => {
      fetchMock.mockResolvedValue(textResponse('Unauthorized', 401));

      await expect(
        createServiceClient('account', token).request('/thing')
      ).rejects.toThrow('Unauthorized');
    });

    it('reports a network failure as network, not as a crash', async () => {
      fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

      await expect(
        createServiceClient('cms', token).request('/thing')
      ).rejects.toMatchObject({ code: 'network', status: 0 });
    });

    it('reports malformed JSON rather than returning undefined', async () => {
      fetchMock.mockResolvedValue(textResponse('{not json', 200));

      await expect(
        createServiceClient('cms', token).request('/thing')
      ).rejects.toMatchObject({ code: 'bad_response' });
    });

    it('marks auth errors so callers can prompt a re-login', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}, 401));

      await createServiceClient('cms', token)
        .request('/thing')
        .catch((err: IntegrationError) => {
          expect(err.isAuthError).toBe(true);
        });
      expect.assertions(1);
    });
  });

  describe('empty and tolerated responses', () => {
    it('returns null for 204', async () => {
      fetchMock.mockResolvedValue(jsonResponse(undefined, 204));

      await expect(
        createServiceClient('account', token).request('/thing')
      ).resolves.toBeNull();
    });

    it('returns null for an empty 200 body', async () => {
      fetchMock.mockResolvedValue(textResponse('', 200));

      await expect(
        createServiceClient('account', token).request('/thing')
      ).resolves.toBeNull();
    });

    // The account portal answers 404 for "no record yet", which is an empty
    // state rather than a failure.
    it('resolves null for a status listed in nullOn', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ error: 'Not found' }, 404));

      await expect(
        createServiceClient('account', token).request('/progress', {
          nullOn: [404],
        })
      ).resolves.toBeNull();
    });
  });

  describe('request shaping', () => {
    it('serialises a JSON body and sets the content type', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));

      await createServiceClient('storefront', token).request('/checkout', {
        method: 'POST',
        body: { itemId: 'book-1' },
      });

      const init = fetchMock.mock.calls[0][1];
      expect(init.method).toBe('POST');
      expect(init.body).toBe('{"itemId":"book-1"}');
      expect(init.headers['Content-Type']).toBe('application/json');
    });

    it('omits credentials so the CORS contract stays token-only', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));

      await createServiceClient('cms', token).request('/thing');

      expect(fetchMock.mock.calls[0][1].credentials).toBe('omit');
    });

    it('targets the right service origin', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));

      await createServiceClient('cms', token).request('/content-access');

      expect(fetchMock.mock.calls[0][0]).toBe(
        'https://cms.fluxline.pro/api/content-access'
      );
    });
  });
});
