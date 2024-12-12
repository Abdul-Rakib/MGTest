const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
app.use(express.json());
app.use(cors());

// Partner ID and Secret Key
const partnerId = '0b1301175ee58047e36446facff8e57d';
const secretKey = 'dw5KQpUMIk';

// Function to generate Basic Auth
const generateBasicAuth = (partnerId, secretKey) => {
  return Buffer.from(`${partnerId}:${secretKey}`).toString('base64');
};

// Function to generate Auth Signature
const generateAuthSignature = (payload, timestamp, path, secretKey) => {
  const stringToSign = `${payload}${timestamp}${path}`;
  return crypto.createHmac('sha256', secretKey).update(stringToSign).digest('hex');
};

// API route to test MooGold API
app.post('/test', async (req, res) => {
  try {
    // Extract path and other parameters from the request body
    const { path, ...otherParams } = req.body;

    // Define the payload
    const payload = JSON.stringify({
      path: path,
      ...otherParams
    });

    const timestamp = Math.floor(Date.now() / 1000);
    const basicAuth = generateBasicAuth(partnerId, secretKey);

    // Generate Auth Signature
    const authSignature = generateAuthSignature(payload, timestamp, path, secretKey);

    // Construct the dynamic URL
    const apiUrl = `https://moogold.com/wp-json/v1/api/${path}`;

    // Make the API request
    const data = await axios.post(apiUrl, payload, {
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'auth': authSignature,
        'timestamp': timestamp.toString(),
        'Content-Type': 'application/json'
      }
    });

    res.json(data.data);

  } catch (e) {

    console.log(e.message);
    res.status(500).json({ error: e.message });
  }

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});