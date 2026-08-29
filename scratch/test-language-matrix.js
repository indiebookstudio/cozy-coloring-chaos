import handler from '../api/send-free-sample.js';

const testLangs = ['fr', 'de', 'es', 'it', 'en'];

async function testAll() {
  for (const lang of testLangs) {
    console.log(`\n================ Testing Language: ${lang} ================`);
    const req = new Request('http://localhost/api/send-free-sample', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://indiebookstudio.github.io'
      },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        lang: lang,
        bookId: "impossible-worlds"
      })
    });

    // In handler, let's see what Brevo would receive
    // By setting BREVO_API_KEY to 'test-key'
    process.env.BREVO_API_KEY = 'test-key';

    // Mock fetch to intercept Brevo payload
    const originalFetch = globalThis.fetch;
    let interceptedPayload = null;
    globalThis.fetch = async (url, opts) => {
      if (url.includes('api.brevo.com')) {
        interceptedPayload = JSON.parse(opts.body);
        return new Response(JSON.stringify({ messageId: "test-123" }), { status: 201 });
      }
      return originalFetch(url, opts);
    };

    const res = await handler(req);
    globalThis.fetch = originalFetch;

    console.log('Status:', res.status);
    if (interceptedPayload) {
      console.log('Subject:', interceptedPayload.subject);
      // Extract Amazon URL from htmlContent
      const match = interceptedPayload.htmlContent.match(/href="(https:\/\/[^"]+amazon[^"]+)"/);
      console.log('Amazon URL in Email:', match ? match[1] : 'NOT FOUND');
      // Extract Buy Button text
      const btnMatch = interceptedPayload.htmlContent.match(/🛒[^<]+/);
      console.log('Buy Button Text:', btnMatch ? btnMatch[0] : 'NOT FOUND');
    }
  }
}

testAll();
