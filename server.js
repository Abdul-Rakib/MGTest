// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const crypto = require('crypto');

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(cors());

// // Partner ID and Secret Key
// const partnerId = '0b1301175ee58047e36446facff8e57d';
// const secretKey = 'dw5KQpUMIk';

// // Function to generate Basic Auth
// const generateBasicAuth = (partnerId, secretKey) => {
//   return Buffer.from(`${partnerId}:${secretKey}`).toString('base64');
// };

// // Function to generate Auth Signature
// const generateAuthSignature = (payload, timestamp, path, secretKey) => {
//   const stringToSign = `${payload}${timestamp}${path}`;
//   return crypto.createHmac('sha256', secretKey).update(stringToSign).digest('hex');
// };

// // API route to test MooGold API
// app.post('/test', async (req, res) => {
//   try {
//     // Extract path and other parameters from the request body
//     const { path, ...otherParams } = req.body;

//     // Define the payload
//     const payload = JSON.stringify({
//       path: path,
//       ...otherParams
//     });

//     // Generate the current UNIX Timestamp
//     const timestamp = Math.floor(Date.now() / 1000);

//     // Generate Basic Auth
//     const basicAuth = generateBasicAuth(partnerId, secretKey);

//     // Generate Auth Signature
//     const authSignature = generateAuthSignature(payload, timestamp, path, secretKey);

//     // Construct the dynamic URL
//     const apiUrl = `https://moogold.com/wp-json/v1/api/${path}`;

//     // Make the API request
//     const data = await axios.post(apiUrl, payload, {
//       headers: {
//         'Authorization': `Basic ${basicAuth}`,
//         'auth': authSignature,
//         'timestamp': timestamp.toString(),
//         'Content-Type': 'application/json'
//       }
//     });

//     // Send the response back to the client
//     res.json(data.data);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ error: e.message });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/test', async (req, res) => {
  try {
    const response = await axios.post('https://a-api.yokcash.com/api/service',
      new URLSearchParams({
        api_key: 'API9NTAZM1714702501999',
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });


    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from YokCash API', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
