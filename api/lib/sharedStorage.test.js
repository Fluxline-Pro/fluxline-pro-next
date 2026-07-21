'use strict';

const {
  getSharedTableName,
  resolveSharedStorageConnString,
  getSharedStorageHealth,
  resetSharedStorageLogState,
} = require('./sharedStorage');

const STORAGE_ENV = [
  'SHARED_STORAGE_CONNECTION_STRING',
  'AZURE_STORAGE_CONNECTION_STRING',
  'STORAGE_ACCOUNT_NAME',
  'STORAGE_ACCOUNT_KEY',
  'ENTITLEMENTS_TABLE',
  'ORDERS_TABLE',
  'EVENTS_TABLE',
  'PROGRESS_TABLE',
  'ACHIEVEMENTS_TABLE',
];

const SHARED = 'DefaultEndpointsProtocol=https;AccountName=shared;AccountKey=sharedkey==;EndpointSuffix=core.windows.net';
const OWN = 'DefaultEndpointsProtocol=https;AccountName=own;AccountKey=ownkey==;EndpointSuffix=core.windows.net';

describe('sharedStorage', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = {};
    for (const key of STORAGE_ENV) {
      originalEnv[key] = process.env[key];
      delete process.env[key];
    }
    resetSharedStorageLogState();
  });

  afterEach(() => {
    for (const key of STORAGE_ENV) {
      if (originalEnv[key] === undefined) delete process.env[key];
      else process.env[key] = originalEnv[key];
    }
  });

  describe('resolveSharedStorageConnString', () => {
    it('prefers SHARED_STORAGE_CONNECTION_STRING and reports it as shared', () => {
      process.env.SHARED_STORAGE_CONNECTION_STRING = SHARED;
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;

      const result = resolveSharedStorageConnString();

      expect(result.connectionString).toBe(SHARED);
      expect(result.source).toBe('SHARED_STORAGE_CONNECTION_STRING');
      expect(result.shared).toBe(true);
    });

    it('falls back to AZURE_STORAGE_CONNECTION_STRING and flags it as not shared', () => {
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;

      const result = resolveSharedStorageConnString();

      expect(result.connectionString).toBe(OWN);
      expect(result.source).toBe('AZURE_STORAGE_CONNECTION_STRING');
      expect(result.shared).toBe(false);
    });

    it('builds a connection string from the storefront account name/key pair', () => {
      process.env.STORAGE_ACCOUNT_NAME = 'fluxlineshared';
      process.env.STORAGE_ACCOUNT_KEY = 'abc123==';

      const result = resolveSharedStorageConnString();

      expect(result.connectionString).toBe(
        'DefaultEndpointsProtocol=https;AccountName=fluxlineshared;' +
          'AccountKey=abc123==;EndpointSuffix=core.windows.net'
      );
      expect(result.shared).toBe(false);
    });

    it('ignores a half-configured account name/key pair', () => {
      process.env.STORAGE_ACCOUNT_NAME = 'fluxlineshared';

      expect(resolveSharedStorageConnString().connectionString).toBeNull();
    });

    it('returns null when nothing is configured', () => {
      const result = resolveSharedStorageConnString();

      expect(result.connectionString).toBeNull();
      expect(result.source).toBeNull();
      expect(result.shared).toBe(false);
    });

    // Regression guard: capturing env at module load broke test stubbing and
    // missed app settings that land after the module graph is required.
    it('re-reads the environment on every call', () => {
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;
      expect(resolveSharedStorageConnString().shared).toBe(false);

      process.env.SHARED_STORAGE_CONNECTION_STRING = SHARED;
      expect(resolveSharedStorageConnString().shared).toBe(true);
    });

    it('logs the fallback once per source, and never logs the secret', () => {
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;
      const verbose = jest.fn();
      const logger = { log: Object.assign(jest.fn(), { verbose }) };

      resolveSharedStorageConnString(logger);
      resolveSharedStorageConnString(logger);

      expect(verbose).toHaveBeenCalledTimes(1);
      const message = verbose.mock.calls[0][0];
      expect(message).toContain('AZURE_STORAGE_CONNECTION_STRING');
      expect(message).not.toContain('ownkey==');
    });

    it('does not log a fallback when the shared connection is set', () => {
      process.env.SHARED_STORAGE_CONNECTION_STRING = SHARED;
      const verbose = jest.fn();

      resolveSharedStorageConnString({ log: Object.assign(jest.fn(), { verbose }) });

      expect(verbose).not.toHaveBeenCalled();
    });

    it('never throws when the logger is an odd shape', () => {
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;

      expect(() => resolveSharedStorageConnString({})).not.toThrow();
      expect(() => resolveSharedStorageConnString({ log: null })).not.toThrow();
    });
  });

  describe('getSharedTableName', () => {
    it('returns the ecosystem default for every shared table', () => {
      expect(getSharedTableName('entitlements')).toBe('Entitlements');
      expect(getSharedTableName('orders')).toBe('Orders');
      expect(getSharedTableName('events')).toBe('Events');
      expect(getSharedTableName('progress')).toBe('Progress');
      expect(getSharedTableName('achievements')).toBe('Achievements');
    });

    it('honours the per-table override used for local/test isolation', () => {
      process.env.ENTITLEMENTS_TABLE = 'EntitlementsTest';

      expect(getSharedTableName('entitlements')).toBe('EntitlementsTest');
      expect(getSharedTableName('orders')).toBe('Orders');
    });

    it('throws on an unknown table rather than silently reading an empty one', () => {
      expect(() => getSharedTableName('entitlement')).toThrow(/Unknown shared table/);
    });
  });

  describe('getSharedStorageHealth', () => {
    it('reports healthy on the shared connection and omits the secret', () => {
      process.env.SHARED_STORAGE_CONNECTION_STRING = SHARED;

      const health = getSharedStorageHealth();

      expect(health.configured).toBe(true);
      expect(health.shared).toBe(true);
      expect(health.warning).toBeUndefined();
      expect(health.tables.entitlements).toBe('Entitlements');
      expect(JSON.stringify(health)).not.toContain('sharedkey==');
    });

    it('warns when only the per-app fallback is configured', () => {
      process.env.AZURE_STORAGE_CONNECTION_STRING = OWN;

      const health = getSharedStorageHealth();

      expect(health.configured).toBe(true);
      expect(health.shared).toBe(false);
      expect(health.warning).toMatch(/SHARED_STORAGE_CONNECTION_STRING/);
    });

    it('warns when no storage is configured at all', () => {
      const health = getSharedStorageHealth();

      expect(health.configured).toBe(false);
      expect(health.warning).toMatch(/No storage connection configured/);
    });
  });
});
