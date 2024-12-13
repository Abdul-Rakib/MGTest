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
    const { authorization, auth, timestamp } = req.headers;

    console.log('Received headers:', req.headers);

    // Forward the request to the actual server with the cleaned headers
    const response = await axios.post(url, req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization :authorization,
        auth,
        timestamp,
      }
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});