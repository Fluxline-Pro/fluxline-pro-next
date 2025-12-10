/**
 * Test script for the contact API endpoint
 *
 * Usage:
 *   1. Start the Azure Functions runtime: npm start
 *   2. In another terminal, run: npm test
 *
 * Or use the combined test: node test-contact.js --with-server
 */

const http = require('http');

const API_URL = 'http://localhost:7071/api/contact';

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message from the test script.',
};

// Test data with mock reCAPTCHA token
const testDataWithRecaptcha = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message with reCAPTCHA token.',
  recaptchaToken: 'test-token-12345', // Mock token for testing
};

/**
 * Make HTTP POST request to the contact API
 */
function sendContactForm(data) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL);
    const postData = JSON.stringify(data);

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Test different scenarios
 */
async function runTests() {
  console.log('🧪 Testing Contact API\n');
  console.log(`Endpoint: ${API_URL}\n`);

  // Test 1: Valid submission
  console.log('Test 1: Valid submission');
  try {
    const response = await sendContactForm(testData);
    console.log(`✅ Status: ${response.status}`);
    console.log(`📨 Response: ${response.body}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }

  // Test 2: Missing field
  console.log('Test 2: Missing field (should fail)');
  try {
    const response = await sendContactForm({
      name: 'Test User',
      email: 'test@example.com',
      // message missing
    });
    console.log(`✅ Status: ${response.status}`);
    console.log(`📨 Response: ${response.body}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }

  // Test 3: Invalid email
  console.log('Test 3: Invalid email (should fail)');
  try {
    const response = await sendContactForm({
      name: 'Test User',
      email: 'invalid-email',
      message: 'Test message',
    });
    console.log(`✅ Status: ${response.status}`);
    console.log(`📨 Response: ${response.body}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }

  // Test 4: Message too long
  console.log('Test 4: Message too long (should fail)');
  try {
    const response = await sendContactForm({
      name: 'Test User',
      email: 'test@example.com',
      message: 'a'.repeat(1001), // Over 1000 chars
    });
    console.log(`✅ Status: ${response.status}`);
    console.log(`📨 Response: ${response.body}\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }

  // Test 5: With reCAPTCHA token (will be verified if RECAPTCHA_SECRET_KEY is set)
  console.log('Test 5: With reCAPTCHA token');
  try {
    const response = await sendContactForm(testDataWithRecaptcha);
    console.log(`✅ Status: ${response.status}`);
    console.log(`📨 Response: ${response.body}`);
    console.log(
      '💡 Note: If RECAPTCHA_SECRET_KEY is not configured, token verification is skipped.\n'
    );
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }

  console.log('✅ All tests completed!');
  console.log('\n💡 Check your email inbox for test messages.');
  console.log(
    '💡 To test reCAPTCHA verification, configure RECAPTCHA_SECRET_KEY in local.settings.json'
  );
}

// Run tests
runTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
