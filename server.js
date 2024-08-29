const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// API route to test MooGold API
app.post('/test', async (req, res) => {
  try {
    const data = await axios.post('https://moogold.com/wp-json/v1/api/product/product_detail', {
      "path": "product/product_detail",
      "product_id": 7847
    }, {
      headers: {
        'Authorization': 'Basic MGIxMzAxMTc1ZWU1ODA0N2UzNjQ0NmZhY2ZmOGU1N2Q6ZHc1S1FwVU1Jaw==',
        'Content-Type': 'application/json'
      }
    });

    res.json(data.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
