const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

app.get("/api/stock/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const { period1, period2, interval } = req.query;
  const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + ticker + "?period1=" + period1 + "&period2=" + period2 + "&interval=" + interval + "&events=history";
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));
