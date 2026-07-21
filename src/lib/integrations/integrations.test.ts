import {
  activeEntitlements,
  hasActiveSubscription,
  hasLocalAccess,
  listEntitlements,
} from './entitlements';
import { canAccess, checkContentAccess } from './cms';
import { createCheckoutSession, getCatalog } from './storefront';
import { getProgress } from './account';
import { createFluxlineClient, getEcosystemSnapshot } from './index';
import { IntegrationError, type ServiceClient } from './client';
import type { Entitlement } from './types';

/** A ServiceClient whose single `request` is stubbed. */
function stubClient(impl: (path: string) => unknown): ServiceClient {
  return {
    service: 'www',
    request: jest.fn(async (path: string) => impl(path)) as never,
  };
}

function entitlement(overrides: Partial<Entitlement> = {}): Entitlement {
  return {
    itemId: 'book-1',
    status: 'active',
    productName: 'A Book',
    productType: 'one_time',
    category: 'book',
    fulfillment: 'digital',
    sourceItemId: null,
    purchasedAt: null,
    expiresAt: null,
    contentRef: null,
    ...overrides,
  };
}

const FUTURE = new Date(Date.now() + 86_400_000).toISOString();
const PAST = new Date(Date.now() - 86_400_000).toISOString();

describe('entitlements', () => {
  describe('listEntitlements', () => {
    it('returns the entitlements array', async () => {
      const client = stubClient(() => ({
        entitlements: [entitlement()],
      }));

      await expect(listEntitlements(client)).resolves.toHaveLength(1);
    });

    // Entitlements decide what a user is shown, so an unreadable payload must
    // mean "nothing" rather than crashing a page.
    it.each([
      ['a malformed entitlements value', { entitlements: 'nope' }],
      ['array items of the wrong shape', { entitlements: [{ oops: true }] }],
      ['a missing key', {}],
      ['a null body', null],
    ])('returns an empty list for %s', async (_label, body) => {
      const client = stubClient(() => body);

      await expect(listEntitlements(client)).resolves.toEqual([]);
    });
  });

  describe('activeEntitlements', () => {
    it('drops cancelled and expired rows', () => {
      const rows = [
        entitlement({ itemId: 'live' }),
        entitlement({ itemId: 'cancelled', status: 'cancelled' }),
        entitlement({ itemId: 'expired', expiresAt: PAST }),
        entitlement({ itemId: 'not-yet-expired', expiresAt: FUTURE }),
      ];

      expect(activeEntitlements(rows).map((e) => e.itemId)).toEqual([
        'live',
        'not-yet-expired',
      ]);
    });
  });

  describe('hasActiveSubscription', () => {
    it('is true for an active plan', () => {
      expect(
        hasActiveSubscription([entitlement({ productType: 'plan' })])
      ).toBe(true);
    });

    it('is false when the only plan has expired', () => {
      expect(
        hasActiveSubscription([
          entitlement({ productType: 'plan', expiresAt: PAST }),
        ])
      ).toBe(false);
    });

    it('is false for one-time purchases alone', () => {
      expect(hasActiveSubscription([entitlement()])).toBe(false);
    });
  });

  describe('hasLocalAccess', () => {
    it('an active plan grants access to anything', () => {
      const rows = [entitlement({ productType: 'plan' })];

      expect(
        hasLocalAccess(rows, { kind: 'course', slug: 'anything-at-all' })
      ).toBe(true);
    });

    it('matches by itemId', () => {
      expect(hasLocalAccess([entitlement()], { itemId: 'book-1' })).toBe(true);
      expect(hasLocalAccess([entitlement()], { itemId: 'book-2' })).toBe(false);
    });

    it('matches by contentRef kind + slug', () => {
      const rows = [
        entitlement({ contentRef: { kind: 'course', slug: 'intro' } }),
      ];

      expect(hasLocalAccess(rows, { kind: 'course', slug: 'intro' })).toBe(true);
      expect(hasLocalAccess(rows, { kind: 'course', slug: 'other' })).toBe(
        false
      );
      // Same slug, different kind, must not match.
      expect(hasLocalAccess(rows, { kind: 'lesson', slug: 'intro' })).toBe(
        false
      );
    });

    it('matches by sanityDocumentId', () => {
      const rows = [
        entitlement({ contentRef: { kind: 'lesson', sanityDocumentId: 'abc' } }),
      ];

      expect(hasLocalAccess(rows, { sanityDocumentId: 'abc' })).toBe(true);
      expect(hasLocalAccess(rows, { sanityDocumentId: 'xyz' })).toBe(false);
    });

    it('denies on an expired entitlement even when the ref matches', () => {
      const rows = [entitlement({ expiresAt: PAST })];

      expect(hasLocalAccess(rows, { itemId: 'book-1' })).toBe(false);
    });

    // Fail closed: a corrupt expiry must not over-grant, even in the UI hint.
    it('denies on an unparseable expiry', () => {
      const rows = [entitlement({ expiresAt: 'not-a-date' })];

      expect(hasLocalAccess(rows, { itemId: 'book-1' })).toBe(false);
    });

    it('denies when the user owns nothing', () => {
      expect(hasLocalAccess([], { itemId: 'book-1' })).toBe(false);
    });
  });
});

describe('cms gate', () => {
  it('builds a kind+slug query', async () => {
    const client = stubClient(() => ({ allowed: true, reason: 'entitlement' }));

    await checkContentAccess(client, { kind: 'course', slug: 'intro' });

    expect(client.request).toHaveBeenCalledWith(
      '/content-access?kind=course&slug=intro',
      expect.anything()
    );
  });

  it('builds an itemId query', async () => {
    const client = stubClient(() => ({ allowed: false, reason: 'none' }));

    await checkContentAccess(client, { itemId: 'sub-monthly' });

    expect(client.request).toHaveBeenCalledWith(
      '/content-access?itemId=sub-monthly',
      expect.anything()
    );
  });

  // A signed-out visitor is an ordinary "no access", not an error to handle.
  it('treats an unauthenticated caller as denied', async () => {
    const client = stubClient(() => {
      throw new IntegrationError('cms', 'unauthenticated', 'no token');
    });

    await expect(
      checkContentAccess(client, { itemId: 'x' })
    ).resolves.toEqual({ allowed: false, reason: 'none' });
  });

  // But a broken gate must not masquerade as a deliberate denial.
  it('propagates a server failure', async () => {
    const client = stubClient(() => {
      throw new IntegrationError('cms', 'server', 'boom', 500);
    });

    await expect(checkContentAccess(client, { itemId: 'x' })).rejects.toThrow(
      'boom'
    );
  });

  it('canAccess fails closed on any error', async () => {
    const client = stubClient(() => {
      throw new IntegrationError('cms', 'server', 'boom', 500);
    });

    await expect(canAccess(client, { itemId: 'x' })).resolves.toBe(false);
  });
});

describe('storefront', () => {
  it('unwraps the catalog items', async () => {
    const client = stubClient(() => ({ items: [{ id: 'book-1' }] }));

    await expect(getCatalog(client)).resolves.toHaveLength(1);
  });

  it('returns an empty catalog rather than undefined', async () => {
    const client = stubClient(() => ({}));

    await expect(getCatalog(client)).resolves.toEqual([]);
  });

  it('returns the checkout URL', async () => {
    const client = stubClient(() => ({ url: 'https://stripe.test/s/1', id: 's1' }));

    await expect(createCheckoutSession(client, 'book-1')).resolves.toMatchObject(
      { url: 'https://stripe.test/s/1' }
    );
  });

  it('omits amount unless one is given (PWYC only)', async () => {
    const client = stubClient(() => ({ url: 'u', id: 'i' }));

    await createCheckoutSession(client, 'book-1');
    expect((client.request as jest.Mock).mock.calls[0][1].body).toEqual({
      itemId: 'book-1',
    });

    await createCheckoutSession(client, 'pwyc-1', 2500);
    expect((client.request as jest.Mock).mock.calls[1][1].body).toEqual({
      itemId: 'pwyc-1',
      amount: 2500,
    });
  });

  // Redirecting to `undefined` would strand the buyer on a blank page.
  it('rejects a session with no redirect URL', async () => {
    const client = stubClient(() => ({ id: 's1' }));

    await expect(createCheckoutSession(client, 'book-1')).rejects.toMatchObject({
      code: 'bad_response',
    });
  });
});

describe('account', () => {
  it('returns an empty record for a user with no progress yet', async () => {
    const client = stubClient(() => null);

    await expect(getProgress(client)).resolves.toEqual({
      modules: {},
      overallPercent: 0,
    });
  });

  it('passes the record through when one exists', async () => {
    const record = { modules: { intro: { percent: 50 } }, overallPercent: 50 };
    const client = stubClient(() => record);

    await expect(getProgress(client)).resolves.toEqual(record);
  });
});

describe('getEcosystemSnapshot', () => {
  function clientWith(
    entitlementsImpl: () => unknown,
    subscriptionImpl: () => unknown
  ) {
    const fluxline = createFluxlineClient(async () => 'token');
    jest
      .spyOn(fluxline.entitlements, 'list')
      .mockImplementation(async () => entitlementsImpl() as Entitlement[]);
    jest
      .spyOn(fluxline.account, 'getSubscription')
      .mockImplementation(async () => subscriptionImpl() as never);
    return fluxline;
  }

  it('combines entitlements and subscription', async () => {
    const fluxline = clientWith(
      () => [entitlement({ productType: 'plan' })],
      () => ({ planId: 'pro', planName: 'Pro' })
    );

    const snapshot = await getEcosystemSnapshot(fluxline);

    expect(snapshot.entitlements).toHaveLength(1);
    expect(snapshot.subscription?.planId).toBe('pro');
    expect(snapshot.hasActiveSubscription).toBe(true);
    expect(snapshot.errors).toEqual([]);
  });

  // One app being down must not blank the data the others returned.
  it('keeps entitlements when the account portal fails', async () => {
    const fluxline = clientWith(
      () => [entitlement({ productType: 'plan' })],
      () => {
        throw new IntegrationError('account', 'server', 'portal down', 500);
      }
    );

    const snapshot = await getEcosystemSnapshot(fluxline);

    expect(snapshot.entitlements).toHaveLength(1);
    expect(snapshot.subscription).toBeNull();
    // Derived from entitlements, so it survives the portal being down.
    expect(snapshot.hasActiveSubscription).toBe(true);
    expect(snapshot.errors).toEqual([
      { service: 'account', error: expect.any(IntegrationError) },
    ]);
  });

  it('reports both failures without throwing', async () => {
    const fluxline = clientWith(
      () => {
        throw new IntegrationError('www', 'network', 'offline');
      },
      () => {
        throw new IntegrationError('account', 'network', 'offline');
      }
    );

    const snapshot = await getEcosystemSnapshot(fluxline);

    expect(snapshot.entitlements).toEqual([]);
    expect(snapshot.hasActiveSubscription).toBe(false);
    expect(snapshot.errors).toHaveLength(2);
  });
});
