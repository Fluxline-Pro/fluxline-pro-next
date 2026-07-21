import { getServiceEndpoint, type ServiceName } from './config';

/**
 * Authenticated fetch core for the ecosystem orchestrator.
 *
 * Every cross-app call goes through here so that auth, timeouts, and error
 * shape are decided once rather than per call site. Callers get either the
 * parsed body or an `IntegrationError` — never a bare `Response` to interpret
 * and never an unhandled network rejection.
 */

/** How a request treats the signed-in user's access token. */
export type AuthMode =
  /** Fail fast if no token — the endpoint always 401s without one. */
  | 'required'
  /** Send a token when we have one; the endpoint serves anonymous callers too. */
  | 'optional'
  /** Never send a token (public endpoints such as the storefront catalog). */
  | 'none';

export type IntegrationErrorCode =
  | 'unauthenticated'
  | 'forbidden'
  | 'not_found'
  | 'timeout'
  | 'network'
  | 'server'
  | 'bad_response';

/**
 * One error type for every failure mode, so callers branch on `code` rather
 * than juggling `TypeError` (network), `AbortError` (timeout), and HTTP status.
 */
export class IntegrationError extends Error {
  readonly service: ServiceName;
  readonly code: IntegrationErrorCode;
  /** HTTP status, or 0 when the request never got a response. */
  readonly status: number;

  constructor(
    service: ServiceName,
    code: IntegrationErrorCode,
    message: string,
    status = 0,
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = 'IntegrationError';
    this.service = service;
    this.code = code;
    this.status = status;
  }

  /** True when signing in (or re-acquiring a token) could fix this. */
  get isAuthError(): boolean {
    return this.code === 'unauthenticated' || this.code === 'forbidden';
  }
}

/** Returns the current Entra access token, or null when signed out. */
export type TokenProvider = () => Promise<string | null>;

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** JSON-serialised into the request body. */
  body?: unknown;
  auth?: AuthMode;
  /** Caller-owned cancellation, combined with the internal timeout. */
  signal?: AbortSignal;
  timeoutMs?: number;
  /**
   * Statuses to resolve as `null` instead of throwing. The account portal
   * returns 404 for "this user has no record yet", which is an empty state,
   * not a failure.
   */
  nullOn?: number[];
}

const DEFAULT_TIMEOUT_MS = 10_000;

function codeForStatus(status: number): IntegrationErrorCode {
  if (status === 401) return 'unauthenticated';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  return 'server';
}

/** Best-effort error message from a body that may be JSON, text, or empty. */
async function readErrorMessage(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text) return response.statusText || `HTTP ${response.status}`;
    try {
      const parsed = JSON.parse(text) as { error?: string; message?: string };
      return parsed.error || parsed.message || text;
    } catch {
      return text;
    }
  } catch {
    return response.statusText || `HTTP ${response.status}`;
  }
}

export interface ServiceClient {
  request<T>(path: string, options?: RequestOptions): Promise<T>;
  service: ServiceName;
}

/**
 * Builds a client bound to one service and one token source.
 *
 * @param service Which Fluxline app to call.
 * @param getAccessToken Supplies the Entra access token; see `useFluxline`.
 */
export function createServiceClient(
  service: ServiceName,
  getAccessToken: TokenProvider
): ServiceClient {
  async function request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      body,
      auth = 'required',
      signal,
      timeoutMs = DEFAULT_TIMEOUT_MS,
      nullOn = [],
    } = options;

    const headers: Record<string, string> = { Accept: 'application/json' };

    if (auth !== 'none') {
      let token: string | null = null;
      try {
        token = await getAccessToken();
      } catch (cause) {
        // A token provider that throws (expired session, MSAL failure) is an
        // auth problem, not a transport one.
        throw new IntegrationError(
          service,
          'unauthenticated',
          'Could not acquire an access token.',
          0,
          { cause }
        );
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else if (auth === 'required') {
        throw new IntegrationError(
          service,
          'unauthenticated',
          'Sign-in required for this request.'
        );
      }
    }

    if (body !== undefined) headers['Content-Type'] = 'application/json';

    // Timeout and caller cancellation share one signal, so whichever fires
    // first aborts the request and neither leaks a pending timer.
    const timeoutController = new AbortController();
    const timer = setTimeout(() => timeoutController.abort(), timeoutMs);
    const onCallerAbort = () => timeoutController.abort();
    signal?.addEventListener('abort', onCallerAbort);

    let response: Response;
    try {
      response = await fetch(getServiceEndpoint(service, path), {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: timeoutController.signal,
        // Cross-origin calls authenticate with the Bearer token above; sending
        // cookies would widen the CORS contract for no benefit.
        credentials: 'omit',
      });
    } catch (cause) {
      // A caller-driven abort is not an integration failure — let it propagate.
      if (signal?.aborted) throw cause;
      const timedOut = timeoutController.signal.aborted;
      throw new IntegrationError(
        service,
        timedOut ? 'timeout' : 'network',
        timedOut
          ? `${service} did not respond within ${timeoutMs}ms.`
          : `Could not reach ${service}.`,
        0,
        { cause }
      );
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onCallerAbort);
    }

    if (nullOn.includes(response.status)) return null as T;

    if (!response.ok) {
      throw new IntegrationError(
        service,
        codeForStatus(response.status),
        await readErrorMessage(response),
        response.status
      );
    }

    // 204, or a success with no body, is a valid empty result.
    if (response.status === 204) return null as T;
    const text = await response.text();
    if (!text) return null as T;

    try {
      return JSON.parse(text) as T;
    } catch (cause) {
      throw new IntegrationError(
        service,
        'bad_response',
        `${service} returned a malformed JSON response.`,
        response.status,
        { cause }
      );
    }
  }

  return { request, service };
}
