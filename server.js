const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/saldo', async (req, res) => {
    const apiKey = 'API9NTAZM1714702501999';

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/saldo',
            new URLSearchParams({ api_key: apiKey }),
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

app.post('/service', async (req, res) => {
    const apiKey = 'API9NTAZM1714702501999';

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/service',
            new URLSearchParams({ api_key: apiKey }),
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

app.post('/order', async (req, res) => {

    const { api_key, service_id, target, kontak, idtrx } = req.body
    const params = new URLSearchParams({
        api_key,
        service_id,
        target,
        kontak,
        idtrx
    })

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/order',
            params,
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

app.post('/status', async (req, res) => {

    const { api_key, action, order_id } = req.body
    const params = new URLSearchParams({
        api_key,
        action,
        order_id,
    })

    try {
        const response = await axios.post('https://a-api.yokcash.com/api/status',
            params,
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
