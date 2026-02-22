'use strict';

/**
 * Batch Fulfill Pre-Orders - Azure Function
 * Triggered manually or on schedule to fulfill pre-orders when book is ready
 *
 * POST /api/fulfill-preorders
 * Body: {
 *   productType: 'bundle' | 'book' | 'workbook',
 *   dryRun: boolean (default: false),
 *   batchSize: number (default: 10, max: 100)
 * }
 *
 * Returns: {
 *   total: number,
 *   succeeded: number,
 *   failed: number,
 *   skipped: number,
 *   errors: Array<{ orderId: string, error: string }>
 * }
 */

const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} = require('@azure/storage-blob');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ORDERS_TABLE =
  process.env.ENVIRONMENT === 'prod' ? 'pdforders' : 'pdfordersdev';
const BASE_PDFS_CONTAINER = 'base-pdfs';
const STAMPED_PDFS_CONTAINER = 'stamped-pdfs';
const SAS_VALIDITY_DAYS = 7;

/** Mask email address for logging to protect PII */
function maskEmailForLogging(email) {
  if (!email || typeof email !== 'string') return '***@unknown';
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return '***@invalid';
  return `***${email.substring(atIndex)}`;
}

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

/** Product type to base PDF blob name mapping */
function getBasePdfBlob(productType) {
  switch (productType) {
    case 'book':
      return 'resonance-core-framework-book.pdf';
    case 'workbook':
      return 'resonance-core-framework-workbook.pdf';
    case 'bundle':
      return null; // bundle handled specially
    default:
      return null;
  }
}

/** Query pre-orders from Azure Table Storage */
async function queryPreOrders(connectionString, productType, limit = 100) {
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

  const preOrders = [];
  const queryResults = tableClient.listEntities({
    queryOptions: {
      filter: `PartitionKey eq '${productType}' and fulfillmentStatus eq 'pre-order'`,
    },
  });

  for await (const entity of queryResults) {
    preOrders.push(entity);
    if (preOrders.length >= limit) break;
  }

  return preOrders;
}

/** Update order status in Azure Table Storage */
async function updateOrderStatus(
  connectionString,
  partitionKey,
  rowKey,
  status,
  fulfillmentStatus,
  downloadUrl
) {
  const creds = parseConnectionString(connectionString);
  if (!creds) return;

  const credential = new AzureNamedKeyCredential(
    creds.accountName,
    creds.accountKey
  );
  const tableClient = new TableClient(
    `https://${creds.accountName}.table.core.windows.net`,
    ORDERS_TABLE,
    credential
  );

  const entity = {
    partitionKey,
    rowKey,
    status: status || 'completed',
    fulfillmentStatus: fulfillmentStatus || 'fulfilled',
    fulfilledDate: new Date().toISOString(),
  };
  if (downloadUrl) entity.downloadUrl = downloadUrl;

  await tableClient.updateEntity(entity, 'Merge');
}

/** Download base PDF bytes from Azure Blob Storage */
async function downloadBasePdf(connectionString, blobName) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient =
    blobServiceClient.getContainerClient(BASE_PDFS_CONTAINER);
  const blobClient = containerClient.getBlobClient(blobName);

  const downloadResponse = await blobClient.download();
  const chunks = [];
  for await (const chunk of downloadResponse.readableStreamBody) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Stamp a PDF with customer name and email in the upper-right corner of every page.
 * Uses pdf-lib to overlay text without altering the original document structure.
 */
async function stampPdf(pdfBytes, customerName, customerEmail) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const stampFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const stampDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  for (const page of pages) {
    const { width, height } = page.getSize();
    const margin = 18;
    const fontSize = 7.5;
    const lineHeight = fontSize * 1.4;

    // Build stamp lines (name on first line, email+date on second)
    const nameLine = `Licensed to: ${customerName}`;
    const detailLine = `${customerEmail} | ${stampDate}`;

    // Measure text widths to right-align
    const nameWidth = font.widthOfTextAtSize(nameLine, fontSize);
    const detailWidth = stampFont.widthOfTextAtSize(detailLine, fontSize);

    const nameX = width - margin - nameWidth;
    const detailX = width - margin - detailWidth;
    const nameY = height - margin - fontSize;
    const detailY = nameY - lineHeight;

    // Draw semi-transparent background rectangle
    const boxWidth = Math.max(nameWidth, detailWidth) + 8;
    const boxHeight = lineHeight * 2 + 6;
    const boxX = width - margin - boxWidth;
    const boxY = detailY - 4;

    page.drawRectangle({
      x: boxX,
      y: boxY,
      width: boxWidth,
      height: boxHeight,
      color: rgb(1, 1, 1),
      opacity: 0.75,
    });

    page.drawText(nameLine, {
      x: nameX,
      y: nameY,
      size: fontSize,
      font,
      color: rgb(0.15, 0.15, 0.15),
    });

    page.drawText(detailLine, {
      x: detailX,
      y: detailY,
      size: fontSize,
      font: stampFont,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  return Buffer.from(await pdfDoc.save());
}

/** Upload stamped PDF to Azure Blob Storage and return the blob name */
async function uploadStampedPdf(connectionString, blobName, pdfBuffer) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(
    STAMPED_PDFS_CONTAINER
  );

  // Ensure container exists with private access (no public blob access)
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(pdfBuffer, pdfBuffer.length, {
    blobHTTPHeaders: { blobContentType: 'application/pdf' },
  });
  return blobName;
}

/** Generate a time-limited SAS URL for a stamped PDF blob */
function generateSasUrl(connectionString, blobName) {
  const creds = parseConnectionString(connectionString);
  if (!creds) throw new Error('Invalid Azure storage connection string');

  const sharedKeyCredential = new StorageSharedKeyCredential(
    creds.accountName,
    creds.accountKey
  );
  const expiresOn = new Date();
  expiresOn.setDate(expiresOn.getDate() + SAS_VALIDITY_DAYS);

  const sasQuery = generateBlobSASQueryParameters(
    {
      containerName: STAMPED_PDFS_CONTAINER,
      blobName,
      permissions: BlobSASPermissions.parse('r'),
      expiresOn,
    },
    sharedKeyCredential
  ).toString();

  return `https://${creds.accountName}.blob.core.windows.net/${STAMPED_PDFS_CONTAINER}/${blobName}?${sasQuery}`;
}

/** Send fulfillment email with download link(s) */
async function sendFulfillmentEmail(
  customerEmail,
  customerName,
  productType,
  downloadUrl
) {
  const smtpHost = process.env.SMTP_HOST || 'mail.smtp2go.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '2525', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || 'no-reply@fluxline.pro';

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials not configured');
  }

  const productNames = {
    book: 'Resonance Core Framework eBook',
    workbook: 'Resonance Core Framework Workbook',
    bundle: 'Resonance Core Framework Bundle',
  };
  const productName = productNames[productType] || 'PDF';

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SAS_VALIDITY_DAYS);
  const expiryStr = expiryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format download links: bundle has JSON-encoded { book, workbook } URLs; others have a single URL
  let downloadSection;
  if (productType === 'bundle') {
    let urls;
    try {
      urls = JSON.parse(downloadUrl);
    } catch (parseErr) {
      urls = { book: downloadUrl };
    }
    downloadSection = [
      'Your download links (each valid for ' +
        SAS_VALIDITY_DAYS +
        ' days, until ' +
        expiryStr +
        '):',
      '',
      'eBook PDF:',
      urls.book || '',
      '',
      'Workbook PDF:',
      urls.workbook || '',
    ].join('\n');
  } else {
    downloadSection = `Your personalized PDF is ready to download. This link is valid for ${SAS_VALIDITY_DAYS} days (until ${expiryStr}).\n\nDownload your PDF here:\n${downloadUrl}`;
  }

  const emailBody = `
Hi ${customerName},

Great news! Your pre-order for the ${productName} is now ready!

${downloadSection}

These PDFs have been personalized with your name and email address.

Thank you for your patience and for supporting this project. If you have any questions or issues, please contact us at support@fluxline.pro.

Warm regards,
The Fluxline Team
fluxline.pro
  `.trim();

  await transporter.sendMail({
    from: smtpFrom,
    to: customerEmail,
    subject: `Your ${productName} Pre-Order is Ready!`,
    text: emailBody,
  });
}

/** Process a single PDF product type: stamp, upload, return SAS URL */
async function processSinglePdf(
  connectionString,
  productType,
  customerName,
  customerEmail,
  orderId
) {
  const baseBlobName = getBasePdfBlob(productType);
  if (!baseBlobName) throw new Error(`Unknown productType: ${productType}`);

  const pdfBytes = await downloadBasePdf(connectionString, baseBlobName);
  const stampedBytes = await stampPdf(pdfBytes, customerName, customerEmail);
  const stampedBlobName = `${orderId}-${productType}.pdf`;
  await uploadStampedPdf(connectionString, stampedBlobName, stampedBytes);
  return generateSasUrl(connectionString, stampedBlobName);
}

module.exports = async function (context, req) {
  context.log('fulfill-preorders: request received');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  const storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!storageConnectionString) {
    context.log.error(
      'fulfill-preorders: AZURE_STORAGE_CONNECTION_STRING not configured'
    );
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Storage not configured.' }),
    };
    return;
  }

  const body = req.body || {};
  const { productType = 'bundle', dryRun = false, batchSize = 10 } = body;

  // Validate inputs
  if (!['book', 'workbook', 'bundle'].includes(productType)) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Invalid productType. Must be book, workbook, or bundle.',
      }),
    };
    return;
  }

  const safeBatchSize = Math.min(Math.max(1, parseInt(batchSize, 10)), 100);

  context.log(
    `fulfill-preorders: Starting fulfillment for productType=${productType}, dryRun=${dryRun}, batchSize=${safeBatchSize}`
  );

  try {
    // 1. Query pre-orders from Azure Table Storage
    const preOrders = await queryPreOrders(
      storageConnectionString,
      productType,
      safeBatchSize
    );

    context.log(`fulfill-preorders: Found ${preOrders.length} pre-orders`);

    const results = {
      total: preOrders.length,
      succeeded: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    };

    // 2. Process each pre-order
    for (const order of preOrders) {
      try {
        const orderId = order.rowKey;

        // Check if already fulfilled (idempotency)
        if (order.fulfillmentStatus === 'fulfilled') {
          context.log(
            `fulfill-preorders: order already fulfilled orderId=${orderId}, skipping`
          );
          results.skipped++;
          continue;
        }

        if (dryRun) {
          context.log(
            `fulfill-preorders: [DRY RUN] Would fulfill orderId=${orderId} email=${maskEmailForLogging(order.customerEmail)}`
          );
          results.skipped++;
          continue;
        }

        // 3. Update status to 'fulfilling' to prevent double-processing if function is called multiple times
        await updateOrderStatus(
          storageConnectionString,
          order.partitionKey,
          orderId,
          'processing',
          'fulfilling',
          null
        );

        context.log(
          `fulfill-preorders: Processing orderId=${orderId} email=${maskEmailForLogging(order.customerEmail)}`
        );

        // 4. Generate and upload PDFs
        let downloadUrl;

        if (order.productType === 'bundle') {
          // For bundles, generate both book and workbook PDFs
          const [bookUrl, workbookUrl] = await Promise.all([
            processSinglePdf(
              storageConnectionString,
              'book',
              order.customerName,
              order.customerEmail,
              `${orderId}-book`
            ),
            processSinglePdf(
              storageConnectionString,
              'workbook',
              order.customerName,
              order.customerEmail,
              `${orderId}-workbook`
            ),
          ]);
          downloadUrl = JSON.stringify({
            book: bookUrl,
            workbook: workbookUrl,
          });
        } else {
          downloadUrl = await processSinglePdf(
            storageConnectionString,
            order.productType,
            order.customerName,
            order.customerEmail,
            orderId
          );
        }

        // 5. Update order status to 'fulfilled'
        await updateOrderStatus(
          storageConnectionString,
          order.partitionKey,
          orderId,
          'completed',
          'fulfilled',
          downloadUrl
        );

        // 6. Send fulfillment email with download link
        await sendFulfillmentEmail(
          order.customerEmail,
          order.customerName,
          order.productType,
          downloadUrl
        );

        results.succeeded++;
        context.log(
          `fulfill-preorders: Successfully fulfilled orderId=${orderId}`
        );

        // Small delay to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (err) {
        results.failed++;
        results.errors.push({
          orderId: order.rowKey,
          error: err.message,
        });

        context.log.error(
          `fulfill-preorders: Failed to fulfill orderId=${order.rowKey}: ${err.message}`
        );

        // Mark as failed but don't stop the batch
        try {
          await updateOrderStatus(
            storageConnectionString,
            order.partitionKey,
            order.rowKey,
            'failed',
            'fulfillment-failed',
            null
          );
        } catch (updateErr) {
          context.log.error(
            `fulfill-preorders: Failed to update failed status: ${updateErr.message}`
          );
        }
      }
    }

    context.log(
      `fulfill-preorders: Completed - succeeded: ${results.succeeded}, failed: ${results.failed}, skipped: ${results.skipped}`
    );

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(results),
    };
  } catch (error) {
    context.log.error('fulfill-preorders: error:', error.message);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to process pre-orders.' }),
    };
  }
};
