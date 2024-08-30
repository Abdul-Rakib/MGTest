const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

// Middleware to parse JSON bodies
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
    // Define the payload
    const payload = JSON.stringify({
      "path": "product/product_detail",
      "product_id": 848968
    });

    // Generate the current UNIX Timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Generate Basic Auth
    const basicAuth = generateBasicAuth(partnerId, secretKey);

    // Generate Auth Signature
    const authSignature = generateAuthSignature(payload, timestamp, "product/product_detail", secretKey);

    // Make the API request
    const data = await axios.post('https://moogold.com/wp-json/v1/api/product/product_detail', {
      "path": "product/product_detail",
      "product_id": 848968
    }, {
      headers: {
        'Authorization': `Basic MGIxMzAxMTc1ZWU1ODA0N2UzNjQ0NmZhY2ZmOGU1N2Q6ZHc1S1FwVU1Jaw==`,
        'auth': authSignature,
        'timestamp': timestamp.toString(),
        'Content-Type': 'application/json'
      }
    });

    // Send the response back to the client
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
