const express = require('express');
const axios = require('axios');
const os = require('os');

const app = express();
const PORT = 3000;

// Function to get the public IP address
function getPublicIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interface in networkInterfaces) {
        for (const address of networkInterfaces[interface]) {
            // Check if the address is IPv4 and not a loopback address
            if (address.family === 'IPv4' && !address.internal) {
                return address.address; // Return the first public IPv4 address found
            }
        }
    }
    return 'No public IP found';
}

// Log the public IP address
console.log(`Server's public IP address: ${getPublicIp()}`);

app.use(express.urlencoded({ extended: true }));

app.post('/proxy-test', async (req, res) => {
    const apiKey = 'API9NTAZM1714702501999';
    const pin = '123456'; // Use your PIN here

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/service', 
            new URLSearchParams({ api_key: apiKey, pin: pin }), 
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
