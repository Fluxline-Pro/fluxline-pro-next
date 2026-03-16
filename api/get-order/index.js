'use strict';

/**
 * Get Order Details - Azure Function
 * Retrieves order information from Azure Table Storage by Stripe session ID
 *
 * GET /api/get-order?session_id=cs_test_...
 * Returns: { orderId, customerName, productType, timestamp, status }
 */

const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ORDERS_TABLE =
  process.env.ENVIRONMENT === 'prod' ? 'pdforders' : 'pdfordersdev';

/** Parse Azure storage connection string into account name and key */
function parseConnectionString(connectionString) {
  const accountNameMatch = connectionString.match(/AccountName=([^;]+)/);
  const accountKeyMatch = connectionString.match(/AccountKey=([^;]+)/);
  if (!accountNameMatch || !accountKeyMatch) return null;
  return {
    accountName: accountNameMatch[1],
    accountKey: accountKeyMatch[1],
  };
}

/** Query order by Stripe session ID (rowKey = session ID) */
async function getOrderBySessionId(connectionString, sessionId) {
  const creds = parseConnectionString(connectionString);
  if (!creds) throw new Error('Invalid Azure storage connection string');

  const credential = new AzureNamedKeyCredential(
    creds.accountName,
    creds.accountKey
  );
  const tableClient = new TableClient(
    `https://${creds.accountName}.table.core.windows.net`,
    ORDERS_TABLE,
    credential
  );

  // Query all partitions for the given rowKey (session ID)
  const queryResults = tableClient.listEntities({
    queryOptions: { filter: `RowKey eq '${sessionId}'` },
  });

  for await (const entity of queryResults) {
    return entity; // Return first matching order
  }

  return null; // Not found
}

module.exports = async function (context, req) {
  context.log('get-order: request received');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  const sessionId = req.query.session_id;

  if (!sessionId || typeof sessionId !== 'string') {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'session_id query parameter is required.',
      }),
    };
    return;
  }

  const storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!storageConnectionString) {
    context.log.error(
      'get-order: AZURE_STORAGE_CONNECTION_STRING not configured'
    );
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Storage not configured.' }),
    };
    return;
  }

  try {
    const order = await getOrderBySessionId(storageConnectionString, sessionId);

    if (!order) {
      context.res = {
        status: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'Order not found. It may still be processing.',
        }),
      };
      return;
    }

    // Return sanitized order details (exclude internal fields)
    const orderDetails = {
      orderId: order.rowKey,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      productType: order.productType,
      timestamp: order.timestamp,
      status: order.status,
    };

    context.log(
      `get-order: order found sessionId=${sessionId} status=${order.status}`
    );

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(orderDetails),
    };
  } catch (error) {
    context.log.error('get-order: error:', error.message);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to retrieve order.' }),
    };
  }
};
