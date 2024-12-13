const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
app.use(express.json());
app.use(cors());

const partnerId = '0b1301175ee58047e36446facff8e57d';
const secretKey = 'dw5KQpUMIk';

const generateBasicAuth = (partnerId, secretKey) => {
  return Buffer.from(`${partnerId}:${secretKey}`).toString('base64');
};

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


app.post('/order/create_order', async (req, res) => {
  try {
    const { path, ...otherParams } = req.body;

    const payload = JSON.stringify({
      path: path,
      ...otherParams,
    });

    const timestamp = Math.floor(Date.now() / 1000);
    const basicAuth = generateBasicAuth(partnerId, secretKey);
    const authSignature = generateAuthSignature(payload, timestamp, path, secretKey);

    // Step 1: Create Order
    const createOrderResponse = await axios.post(
      `https://moogold.com/wp-json/v1/api/order/create_order`,
      payload,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          auth: authSignature,
          timestamp: timestamp.toString(),
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract partner order ID from the create order response
    const partnerOrderId = createOrderResponse.data.partnerOrderId;

    if (!partnerOrderId) {
      throw new Error('Partner order ID is missing in the create order response.');
    }

    // Step 2: Poll Check Order Endpoint
    let checkOrderResponse = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

      const checkOrderPayload = JSON.stringify({
        path: 'order/order_detail_partner_id',
        partner_order_id: partnerOrderId,
      });

      const checkOrderTimestamp = Math.floor(Date.now() / 1000);
      const checkOrderSignature = generateAuthSignature(
        checkOrderPayload,
        checkOrderTimestamp,
        'order/order_detail_partner_id',
        secretKey
      );

      const response = await axios.post(
        `https://moogold.com/wp-json/v1/api/order/order_detail_partner_id`,
        checkOrderPayload,
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            auth: checkOrderSignature,
            timestamp: checkOrderTimestamp.toString(),
            'Content-Type': 'application/json',
          },
        }
      );

      checkOrderResponse = response.data;

      // Break the loop if order status is "completed"
      if (checkOrderResponse.order_status === 'completed') {
        break;
      }
    }

    // Send both responses back to the client
    res.json({
      createOrderResponse: createOrderResponse.data,
      checkOrderResponse,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      details: error.response?.data || 'Internal Server Error',
    });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});