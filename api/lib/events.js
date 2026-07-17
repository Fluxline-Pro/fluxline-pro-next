const { randomUUID } = require('crypto');
const { getTableClient } = require('./tableClient');

/**
 * Operational event log (Azure Table Storage — the "events & state" layer).
 *
 * Table: Events (override via EVENTS_TABLE)
 *   partitionKey = userId (Entra oid)
 *   rowKey       = reverse-ticks + '-' + uuid  → newest-first when listed
 * Columns: Type, Source, Data (JSON string), CreatedAt (ISO).
 *
 * Event writing is best-effort by design: an event-log outage must never
 * fail the business operation that produced it (grant, progress save, etc.).
 */

const EVENT_SOURCE = process.env.EVENT_SOURCE || 'www';

function getEventsTable() {
  return getTableClient(process.env.EVENTS_TABLE || 'Events');
}

/** Reverse-chronological sort key (max ticks minus now), zero-padded. */
function reverseTicks(date) {
  const MAX_TICKS = 8640000000000000; // ECMAScript max time value
  return String(MAX_TICKS - date.getTime()).padStart(19, '0');
}

/**
 * Records one integration event. Never throws.
 *
 * @param {object} params
 * @param {string} params.userId Entra oid
 * @param {string} params.type   e.g. 'entitlement.granted', 'progress.updated'
 * @param {object} [params.data] JSON-serializable payload
 * @param {string} [params.source] defaults to EVENT_SOURCE env / 'www'
 * @param {object} [context] Azure Functions context, for logging failures
 */
async function recordEvent({ userId, type, data = {}, source = EVENT_SOURCE }, context) {
  try {
    const now = new Date();
    const table = getEventsTable();
    await table.createEntity({
      partitionKey: userId,
      rowKey: `${reverseTicks(now)}-${randomUUID()}`,
      Type: type,
      Source: source,
      Data: JSON.stringify(data),
      CreatedAt: now.toISOString(),
    });
  } catch (err) {
    if (context && context.log && context.log.warn) {
      context.log.warn(`recordEvent(${type}) failed: ${err.message}`);
    }
  }
}

/**
 * Lists the newest events for a user (newest first, thanks to reverse ticks).
 *
 * @param {string} userId Entra oid
 * @param {number} [limit=50]
 * @returns {Promise<Array<{type: string, source: string, data: object, createdAt: string}>>}
 */
async function listEvents(userId, limit = 50) {
  const table = getEventsTable();
  const escaped = userId.replace(/'/g, "''");
  const iterator = table.listEntities({
    queryOptions: { filter: `PartitionKey eq '${escaped}'` },
  });
  const events = [];
  for await (const entity of iterator) {
    let data = {};
    try {
      data = JSON.parse(entity.Data || '{}');
    } catch {
      /* tolerate malformed rows */
    }
    events.push({
      type: entity.Type || '',
      source: entity.Source || '',
      data,
      createdAt: entity.CreatedAt || '',
    });
    if (events.length >= limit) break;
  }
  return events;
}

module.exports = { recordEvent, listEvents, reverseTicks };
