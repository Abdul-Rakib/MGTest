// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.post('/saldo', async (req, res) => {
//     const apiKey = 'API9NTAZM1714702501999';

//     try {
//         const response = await axios.post('https://a-api.yokcash.com/api/saldo',
//             new URLSearchParams({ api_key: apiKey }),
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });

// app.post('/service', async (req, res) => {
//     const apiKey = 'API9NTAZM1714702501999';

//     try {
//         const response = await axios.post('https://a-api.yokcash.com/api/service',
//             new URLSearchParams({ api_key: apiKey }),
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });

// app.post('/order', async (req, res) => {

    // const { api_key, service_id, target, kontak, idtrx } = req.body
    // const params = new URLSearchParams({
    // //     api_key,
    // //     service_id,
    // //     target,
    // //     kontak,
    // //     idtrx
    // })

//     try {
//         const response = await axios.post('https://a-api.yokcash.com/api/order',
//             // params,
//             new URLSearchParams(req.body),
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });

// app.post('/status', async (req, res) => {

    // // const { api_key, action, order_id } = req.body
    // // const params = new URLSearchParams({
    // //     api_key,
    // //     action,
    // //     order_id,
    // // })

//     try {
//         const response = await axios.post('https://a-api.yokcash.com/api/status',
//             // params,
//             new URLSearchParams(req.body),
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// app.post('/order', async (req, res) => {
//     const { api_key, service_id, target, kontak, idtrx } = req.body;
//     const params = new URLSearchParams({
//         api_key,
//         service_id,
//         target,
//         kontak,
//         idtrx
//     });

//     try {
//         // Place the order
//         const orderResponse = await axios.post('https://a-api.yokcash.com/api/order',
//             params,
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );

//         // Check if the order was placed successfully
//         if (orderResponse.data.status) {
//             // Get the order ID from the response
//             const orderId = orderResponse.data.data.id;

//             let finalStatusResponse = null;
//             let attempts = 0;
//             const maxAttempts = 10;
//             const interval = 1000; // 1 second delay between attempts

//             while (attempts < maxAttempts) {
//                 // Prepare status check parameters
//                 const statusParams = new URLSearchParams({
//                     api_key,
//                     action: "status",
//                     order_id: orderId
//                 });

//                 // Check the order status
//                 finalStatusResponse = await axios.post('https://a-api.yokcash.com/api/status',
//                     statusParams,
//                     {
//                         headers: {
//                             'Content-Type': 'application/x-www-form-urlencoded',
//                         }
//                     }
//                 );

//                 // Check the status in the response
//                 if (finalStatusResponse.data.status && finalStatusResponse.data.data.status === "success") {
//                     break; // Exit loop if status is "success"
//                 }

//                 attempts++;
//                 await delay(interval); // Wait for the specified interval before the next attempt
//             }

//             // Send the combined response back to the client
//             res.json({
//                 order: orderResponse.data,
//                 status: finalStatusResponse.data // Send the last status response
//             });
//         } else {
//             // If the order was not successful, return the order response
//             res.json(orderResponse.data);
//         }
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });

// app.post('/status', async (req, res) => {
//     const { api_key, action, order_id } = req.body;
//     const params = new URLSearchParams({
//         api_key,
//         action,
//         order_id,
//     });

//     try {
//         const response = await axios.post('https://a-api.yokcash.com/api/status',
//             params,
//             {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         const status = error.response ? error.response.status : 500;
//         console.error('Error details:', error.response ? error.response.data : error.message);
//         res.status(status).json({
//             error: 'Failed to fetch data from YokCash API',
//             details: error.response ? error.response.data : error.message,
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });