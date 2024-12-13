const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// General forwarding logic
app.post('/order/:endpoint', async (req, res) => {
  console.log('Forwarding payload:', JSON.stringify(req.body, null, 2));
  
  try {
    const { endpoint } = req.params; // Extract the endpoint from the URL
    const url = `https://moogold.com/wp-json/v1/api/order/${endpoint}`; // Construct the full URL

    // Extract only the necessary headers
    const { Authorization, auth, timestamp } = req.headers;

    const headersToForward = {
      'Content-Type': 'application/json', // Ensure JSON content type
      Authorization, // Include the Basic Auth
      auth,          // Include the generated auth signature
      timestamp,     // Include the timestamp
    };

    console.log('Forwarding headers:', headersToForward);

    // Forward the request to the actual server with the cleaned headers
    const response = await axios.post(url, req.body, {
      headers: headersToForward,
    });

    // Send back the response received from the actual server
    console.log('Server response:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error forwarding request:', error.message);
    res.status(error.response?.status || 500).json({
      error: true,
      message: error.message,
      details: error.response?.data || 'Internal Server Error',
    });
  }
});
