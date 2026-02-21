'use strict';

/**
 * Stripe Webhook Handler - Azure Function
 * Listens for checkout.session.completed events and:
 * 1. Stores order metadata in Azure Table Storage
 * 2. Generates a personalized (watermarked) PDF
 * 3. Uploads the stamped PDF to Azure Blob Storage
 * 4. Generates a 7-day SAS download URL
 * 5. Sends a thank-you email with the download link
 *
 * POST /api/stripe-webhook
 * Headers: stripe-signature (required for verification)
 */

const Stripe = require('stripe');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
};

const ORDERS_TABLE = 'pdforders';
const BASE_PDFS_CONTAINER = 'base-pdfs';
const STAMPED_PDFS_CONTAINER = 'stamped-pdfs';
const SAS_VALIDITY_DAYS = 7;

/** Product type to base PDF blob name mapping */
function getBasePdfBlob(productType) {
  switch (productType) {
    case 'book': return 'resonance-core-framework-book.pdf';
    case 'workbook': return 'resonance-core-framework-workbook.pdf';
    case 'bundle': return null; // bundle handled specially
    default: return null;
  }
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

/** Store order metadata in Azure Table Storage */
async function storeOrder(connectionString, order) {
  const creds = parseConnectionString(connectionString);
  if (!creds) throw new Error('Invalid Azure storage connection string');

  const credential = new AzureNamedKeyCredential(creds.accountName, creds.accountKey);
  const tableClient = new TableClient(
    `https://${creds.accountName}.table.core.windows.net`,
    ORDERS_TABLE,
    credential
  );

  // Ensure table exists
  try { await tableClient.createTable(); } catch (err) {
    if (!err.message?.includes('exists') && !err.code?.includes('TableAlreadyExists')) {
      throw err;
    }
  }

  await tableClient.createEntity({
    partitionKey: order.productType,
    rowKey: order.orderId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    productType: order.productType,
    stripeSessionId: order.stripeSessionId,
    timestamp: order.timestamp,
    status: 'processing',
  });
}

/** Update order status in Azure Table Storage */
async function updateOrderStatus(connectionString, partitionKey, rowKey, status, downloadUrl) {
  const creds = parseConnectionString(connectionString);
  if (!creds) return;

  const credential = new AzureNamedKeyCredential(creds.accountName, creds.accountKey);
  const tableClient = new TableClient(
    `https://${creds.accountName}.table.core.windows.net`,
    ORDERS_TABLE,
    credential
  );

  const entity = { partitionKey, rowKey, status };
  if (downloadUrl) entity.downloadUrl = downloadUrl;
  await tableClient.updateEntity(entity, 'Merge');
}

/** Download base PDF bytes from Azure Blob Storage */
async function downloadBasePdf(connectionString, blobName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(BASE_PDFS_CONTAINER);
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
  const stampDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

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
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(STAMPED_PDFS_CONTAINER);

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

  const sharedKeyCredential = new StorageSharedKeyCredential(creds.accountName, creds.accountKey);
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

/** Send thank-you email with download link(s) */
async function sendDownloadEmail(customerEmail, customerName, productType, downloadUrl) {
  const smtpHost = process.env.SMTP_HOST || 'mail.smtp2go.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '2525', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || 'no-reply@fluxline.pro';

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials not configured');
  }

  const productNames = { book: 'Resonance Core Framework eBook', workbook: 'Resonance Core Framework Workbook', bundle: 'Resonance Core Framework Bundle' };
  const productName = productNames[productType] || 'PDF';

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + SAS_VALIDITY_DAYS);
  const expiryStr = expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Format download links: bundle has JSON-encoded { book, workbook } URLs; others have a single URL
  let downloadSection;
  if (productType === 'bundle') {
    let urls;
    try { urls = JSON.parse(downloadUrl); } catch (_) { urls = { book: downloadUrl }; }
    downloadSection = [
      'Your download links (each valid for ' + SAS_VALIDITY_DAYS + ' days, until ' + expiryStr + '):',
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

Thank you for purchasing the ${productName}!

${downloadSection}

These PDFs have been personalized with your name and email address.

If you have any questions or issues, please contact us at support@fluxline.pro.

Warm regards,
The Fluxline Team
fluxline.pro
  `.trim();

  await transporter.sendMail({
    from: smtpFrom,
    to: customerEmail,
    subject: `Your ${productName} Download is Ready`,
    text: emailBody,
  });
}

/** Process a single PDF product type: stamp, upload, return SAS URL */
async function processSinglePdf(connectionString, productType, customerName, customerEmail, orderId) {
  const baseBlobName = getBasePdfBlob(productType);
  if (!baseBlobName) throw new Error(`Unknown productType: ${productType}`);

  const pdfBytes = await downloadBasePdf(connectionString, baseBlobName);
  const stampedBytes = await stampPdf(pdfBytes, customerName, customerEmail);
  const stampedBlobName = `${orderId}-${productType}.pdf`;
  await uploadStampedPdf(connectionString, stampedBlobName, stampedBytes);
  return generateSasUrl(connectionString, stampedBlobName);
}

module.exports = async function (context, req) {
  context.log('stripe-webhook: event received');

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    context.log.error('stripe-webhook: Stripe credentials not configured');
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Webhook service not configured.' }),
    };
    return;
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = req.headers && req.headers['stripe-signature'];

  if (!signature) {
    context.log.warn('stripe-webhook: missing stripe-signature header');
    context.res = { status: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing signature.' }) };
    return;
  }

  // Azure Functions v2 provides raw body as Buffer when enableContentNegotiation is false
  // req.rawBody is available for non-JSON content types
  const rawBody = req.rawBody || (req.body ? JSON.stringify(req.body) : '');

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    context.log.warn(`stripe-webhook: signature verification failed: ${err.message}`);
    context.res = { status: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid signature.' }) };
    return;
  }

  // Acknowledge receipt immediately
  if (event.type !== 'checkout.session.completed') {
    context.res = { status: 200, headers: CORS_HEADERS, body: JSON.stringify({ received: true }) };
    return;
  }

  const session = event.data.object;
  const customerEmail = session.customer_details?.email || '';
  const customerName = session.metadata?.customerName || session.customer_details?.name || 'Valued Customer';
  const productType = session.metadata?.productType || 'book';
  const orderId = session.id;
  const timestamp = new Date().toISOString();

  context.log(`stripe-webhook: processing order orderId=${orderId} productType=${productType} email=${customerEmail}`);

  const storageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!storageConnectionString) {
    context.log.error('stripe-webhook: AZURE_STORAGE_CONNECTION_STRING not configured');
    context.res = { status: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Storage not configured.' }) };
    return;
  }

  // 1. Store order in Azure Table Storage
  try {
    await storeOrder(storageConnectionString, {
      orderId,
      customerName,
      customerEmail,
      productType,
      stripeSessionId: session.id,
      timestamp,
    });
    context.log(`stripe-webhook: order stored orderId=${orderId}`);
  } catch (err) {
    context.log.error(`stripe-webhook: failed to store order: ${err.message}`);
    // Non-fatal: continue to PDF processing
  }

  // 2. Generate and deliver PDFs
  try {
    let downloadUrl;

    if (productType === 'bundle') {
      // For bundles, generate both book and workbook PDFs
      const [bookUrl, workbookUrl] = await Promise.all([
        processSinglePdf(storageConnectionString, 'book', customerName, customerEmail, `${orderId}-book`),
        processSinglePdf(storageConnectionString, 'workbook', customerName, customerEmail, `${orderId}-workbook`),
      ]);
      downloadUrl = JSON.stringify({ book: bookUrl, workbook: workbookUrl });
    } else {
      downloadUrl = await processSinglePdf(storageConnectionString, productType, customerName, customerEmail, orderId);
    }

    context.log(`stripe-webhook: PDF generated and uploaded orderId=${orderId}`);

    // 3. Update order status with download URL
    await updateOrderStatus(storageConnectionString, productType, orderId, 'completed', downloadUrl).catch((err) =>
      context.log.warn(`stripe-webhook: failed to update order status: ${err.message}`)
    );

    // 4. Send email with download link
    try {
      await sendDownloadEmail(customerEmail, customerName, productType, downloadUrl);
      context.log(`stripe-webhook: email sent to ${customerEmail}`);
    } catch (emailErr) {
      context.log.error(`stripe-webhook: failed to send email: ${emailErr.message}`);
      // Non-fatal: order still processed
    }

    context.res = { status: 200, headers: CORS_HEADERS, body: JSON.stringify({ received: true }) };
  } catch (err) {
    context.log.error(`stripe-webhook: PDF processing failed: ${err.message}`);

    // Mark order as failed
    await updateOrderStatus(storageConnectionString, productType, orderId, 'failed').catch(() => {});

    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'PDF processing failed.' }),
    };
  }
};
