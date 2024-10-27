const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Proxy route to handle requests to the YokCash API
app.post('/proxy-test', async (req, res) => {
    const apiKey = 'API9NTAZM1714702501999';
    const pin = '123456'; // Use your PIN here

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/service', 
            new URLSearchParams({ api_key: apiKey, pin: pin }), // Include PIN here
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        console.error('Error details:', error.response ? error.response.data : error.message); // Log error details
        res.status(status).json({
            error: 'Failed to fetch data from YokCash API',
            details: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
