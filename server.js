const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// General forwarding logic
app.post('/order/:endpoint', async (req, res) => {
  try {
    const { endpoint } = req.params; // Extract the endpoint from the URL
    const url = `https://moogold.com/wp-json/v1/api/order/${endpoint}`; // Construct the full URL

    // Forward the request to the actual server
    const response = await axios.post(url, req.body, {
      headers: {
        ...req.headers, // Forward all headers from the client
        host: undefined, // Remove 'host' header to avoid conflicts
      },
    });

    // Send back the response received from the actual server
    console.log(response.data);
    
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors
    console.log(error);
    
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
