const https = require('https');
const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const req = https.get('https://amc-soluciones-peru.vercel.app/api/products/amc-9100', (res) => {
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('test-fetch-output.json', data);
    console.log('Done, saved to test-fetch-output.json');
    const json = JSON.parse(data);
    console.log('Data:', json.data.summary);
    if (json.debug_error) console.log('DEBUG_ERROR:', json.debug_error);
  });
});
req.on('error', (e) => {
  console.error(e);
});
