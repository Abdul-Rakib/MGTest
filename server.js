const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Function to get the public IP address using an external service
async function getPublicIp() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip; // Return the public IP address
    } catch (error) {
        console.error('Could not retrieve public IP:', error.message);
        return 'Could not retrieve public IP';
    }
}
// Log the public IP address
getPublicIp().then(ip => {
    console.log(`Server's public IP address: ${ip}`);
});

app.use(express.urlencoded({ extended: true }));

app.post('/proxy-test', async (req, res) => {
    const apiKey = 'API9NTAZM1714702501999';
    // const pin = '123456'; // Use your PIN here

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/service', 
            // new URLSearchParams({ api_key: apiKey, pin: pin }), 
            new URLSearchParams({ api_key: apiKey}), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(status).json({
            error: 'Failed to fetch data from YokCash API',
            details: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
