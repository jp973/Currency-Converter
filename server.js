require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/convert", async (req, res) => {
    const { from, to, amount } = req.query;
    
    if (!from || !to || !amount) {
        return res.status(400).json({ error: "Missing required parameters." });
    }

    try {
        const apiKey = process.env.API_KEY;
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
        const response = await axios.get(url);

        const rate = response.data.conversion_rates[to];
        if (!rate) return res.status(400).json({ error: "Invalid currency code." });

        const convertedAmount = (amount * rate).toFixed(2);
        res.json({ from, to, rate, convertedAmount });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch exchange rates." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

