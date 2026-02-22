# Pre-Order Fulfillment System Guide

This guide explains how to set up and use the pre-order fulfillment system for the book bundle.

## Overview

The pre-order system allows you to accept pre-order payments through Stripe while deferring PDF generation and delivery until the book is ready. When a customer purchases a pre-order product:

1. Payment is processed immediately
2. Order is stored in Azure Table Storage with `fulfillmentStatus: 'pre-order'`
3. Customer receives a confirmation email (no download link)
4. PDFs are **not** generated until you manually trigger fulfillment

## Setup Instructions

### 1. Create Pre-Order Product in Stripe

1. Go to your Stripe Dashboard → Products
2. Create a new product (or edit existing bundle product)
3. Set the price to $29.99
4. Add the following **metadata** to the product:
   - `fulfillmentType`: `pre-order`
   - `releaseDate`: `April 15, 2026` (or your target date)
   - `isPreOrder`: `true` (optional, backup check)

**Important**: The metadata is what tells the webhook this is a pre-order.

### 2. Update Environment Variables

In your Azure Function App settings (or `local.settings.json` for testing), ensure these are set:

```json
{
  "STRIPE_SECRET_KEY": "sk_live_...",
  "STRIPE_WEBHOOK_SECRET": "whsec_...",
  "AZURE_STORAGE_CONNECTION_STRING": "DefaultEndpointsProtocol=...",
  "SMTP_HOST": "mail.smtp2go.com",
  "SMTP_PORT": "2525",
  "SMTP_USER": "your-smtp-user",
  "SMTP_PASS": "your-smtp-password",
  "SMTP_FROM": "no-reply@fluxline.pro",
  "ENVIRONMENT": "prod"
}
```

### 3. Upload Base PDFs to Azure Blob Storage

Before fulfilling pre-orders, ensure the base PDFs are uploaded:

1. Go to Azure Storage Account → `base-pdfs` container
2. Upload these files:
   - `resonance-core-framework-book.pdf`
   - `resonance-core-framework-workbook.pdf`

These are the master PDFs that will be personalized for each customer.

## How Pre-Orders Work

### Customer Purchase Flow

```
Customer selects bundle →
  Stripe checkout ($29.99) →
    Payment succeeds →
      Webhook receives event →
        Check product metadata →
          If pre-order:
            ✓ Store order with fulfillmentStatus='pre-order'
            ✓ Send confirmation email
            ✗ Skip PDF generation
          If immediate:
            ✓ Store order with fulfillmentStatus='immediate'
            ✓ Generate & upload PDFs
            ✓ Send download email
```

### Pre-Order Confirmation Email

Customers receive this email immediately after purchase:

```
Subject: Pre-Order Confirmation: Resonance Core Framework Bundle

Hi [Name],

Thank you for pre-ordering the Resonance Core Framework Bundle!

Your order has been confirmed and your payment has been processed.
We're currently working on the final production version and expect
to deliver your personalized PDF by April 15, 2026.

You'll receive another email with your personalized download link
as soon as the book is released.

We appreciate your patience and support!
```

## Fulfilling Pre-Orders (When Book is Ready)

### Step 1: Test with Dry Run

Before fulfilling real orders, do a dry run to see what would be processed:

```bash
curl -X POST https://your-site.azurewebsites.net/api/fulfill-preorders \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "bundle",
    "dryRun": true,
    "batchSize": 5
  }'
```

**Expected response:**

```json
{
  "total": 5,
  "succeeded": 0,
  "failed": 0,
  "skipped": 5,
  "errors": []
}
```

This shows you how many pre-orders would be fulfilled without actually processing them.

### Step 2: Fulfill in Small Batches

Start with a small batch to ensure everything works:

```bash
curl -X POST https://your-site.azurewebsites.net/api/fulfill-preorders \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "bundle",
    "dryRun": false,
    "batchSize": 10
  }'
```

**Expected response:**

```json
{
  "total": 10,
  "succeeded": 10,
  "failed": 0,
  "skipped": 0,
  "errors": []
}
```

### Step 3: Process All Remaining Pre-Orders

Once you've verified the first batch works, increase the batch size:

```bash
curl -X POST https://your-site.azurewebsites.net/api/fulfill-preorders \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "bundle",
    "dryRun": false,
    "batchSize": 100
  }'
```

Keep running this command until `total: 0` (no more pre-orders to fulfill).

### Step 4: Handle Failures

If any orders fail, check the error details:

```json
{
  "total": 10,
  "succeeded": 8,
  "failed": 2,
  "skipped": 0,
  "errors": [
    {
      "orderId": "cs_test_abc123",
      "error": "Base PDF not found: resonance-core-framework-book.pdf"
    },
    {
      "orderId": "cs_test_def456",
      "error": "SMTP connection failed"
    }
  ]
}
```

Failed orders are marked with `fulfillmentStatus: 'fulfillment-failed'` in the database. After fixing the root cause, you can re-run the fulfillment command to retry them.

## Fulfillment Email

When pre-orders are fulfilled, customers receive this email:

```
Subject: Your Resonance Core Framework Bundle Pre-Order is Ready!

Hi [Name],

Great news! Your pre-order for the Resonance Core Framework Bundle
is now ready!

Your download links (each valid for 7 days, until [date]):

eBook PDF:
[personalized download URL]

Workbook PDF:
[personalized download URL]

These PDFs have been personalized with your name and email address.

Thank you for your patience and for supporting this project!
```

## Database Schema

### Orders Table (`pdforders` or `pdfordersdev`)

| Field               | Type       | Description                                                               |
| ------------------- | ---------- | ------------------------------------------------------------------------- |
| `partitionKey`      | String     | Product type: `bundle`, `book`, or `workbook`                             |
| `rowKey`            | String     | Stripe session ID (orderId)                                               |
| `customerName`      | String     | Customer's full name                                                      |
| `customerEmail`     | String     | Customer's email address                                                  |
| `productType`       | String     | Product type purchased                                                    |
| `stripeSessionId`   | String     | Stripe checkout session ID                                                |
| `timestamp`         | ISO String | Order creation timestamp                                                  |
| `status`            | String     | `confirmed`, `processing`, `completed`, `failed`                          |
| `fulfillmentStatus` | String     | `pre-order`, `fulfilling`, `fulfilled`, `immediate`, `fulfillment-failed` |
| `releaseDate`       | String     | Expected release date (pre-orders only)                                   |
| `fulfilledDate`     | ISO String | When fulfillment completed                                                |
| `downloadUrl`       | String     | SAS URL(s) for downloads (JSON for bundles)                               |

### Fulfillment Status Flow

```
Pre-Order:
  pre-order → fulfilling → fulfilled
           └─────────────→ fulfillment-failed (on error)

Immediate:
  immediate → processing → completed
           └────────────→ failed (on error)
```

## Querying Pre-Orders Manually

### Check Pre-Order Count

In Azure Storage Explorer or via code:

```javascript
// Query: PartitionKey eq 'bundle' and fulfillmentStatus eq 'pre-order'
```

### Check Fulfilled Count

```javascript
// Query: PartitionKey eq 'bundle' and fulfillmentStatus eq 'fulfilled'
```

### Check Failed Fulfillments

```javascript
// Query: PartitionKey eq 'bundle' and fulfillmentStatus eq 'fulfillment-failed'
```

## Testing Locally

### 1. Start Azure Functions Locally

```bash
cd api
npm install
func start
```

### 2. Set Up Stripe CLI for Webhook Testing

```bash
stripe listen --forward-to localhost:7071/api/stripe-webhook
stripe trigger checkout.session.completed
```

### 3. Test Fulfillment Endpoint

```bash
curl -X POST http://localhost:7071/api/fulfill-preorders \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "bundle",
    "dryRun": true,
    "batchSize": 5
  }'
```

## Production Checklist

Before accepting pre-orders in production:

- [ ] Pre-order product created in Stripe with correct metadata
- [ ] `STRIPE_PRICE_ID_BUNDLE` env var set to pre-order price ID
- [ ] Base PDFs uploaded to `base-pdfs` container in Azure Storage
- [ ] SMTP credentials configured and tested
- [ ] Webhook endpoint verified with Stripe
- [ ] Test pre-order flow end-to-end in test mode
- [ ] Dry run fulfillment tested with test data
- [ ] `NEXT_PUBLIC_ENVIRONMENT=prod` flag ready (to disable cart on launch day)

## Troubleshooting

### Problem: Pre-orders are being fulfilled immediately

**Solution**: Check Stripe product metadata. Ensure `fulfillmentType` is set to `pre-order`.

### Problem: Fulfillment API returns 0 pre-orders

**Solution**:

1. Check Azure Table Storage for orders with `fulfillmentStatus: 'pre-order'`
2. Verify `productType` matches (e.g., `bundle` not `bundles`)
3. Check if orders were already fulfilled (`fulfillmentStatus: 'fulfilled'`)

### Problem: PDF generation fails

**Solution**:

1. Check base PDFs exist in `base-pdfs` container
2. Verify file names match exactly:
   - `resonance-core-framework-book.pdf`
   - `resonance-core-framework-workbook.pdf`
3. Check Azure Function logs for specific errors

### Problem: Emails not sending

**Solution**:

1. Verify SMTP credentials in environment variables
2. Check SMTP service status (SMTP2GO dashboard)
3. Review Azure Function logs for SMTP errors
4. Test SMTP connection manually

### Problem: Duplicate fulfillments

**Solution**: The system has built-in idempotency. Orders marked as `fulfilled` are automatically skipped. If you see duplicates, check application logs for race conditions.

## Security Notes

- Pre-order fulfillment endpoint should be protected with Azure Function authentication
- Consider adding API key verification for production
- Email addresses are masked in logs to protect PII
- SAS URLs expire after 7 days for security

## Future Enhancements

- [ ] Admin dashboard to view pre-order status
- [ ] Scheduled automatic fulfillment on release date
- [ ] Retry logic for failed email deliveries
- [ ] Customer portal to re-download expired links
- [ ] Analytics/reporting on pre-order conversion rates

## Support

For issues or questions:

- Check Azure Function logs in Azure Portal
- Review Stripe webhook logs
- Contact: support@fluxline.pro
