const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const BOT_TOKEN = "8560420576:AAEeAVOyZb0SmaYl9bUf7bQ3_fHbeZXB7dg";
const ADMIN_CHAT_ID = "998224615";

app.get("/love-game", (req, res) => {
  res.send("Love Game backend is alive ✅");
});

app.post("/love-game", async (req, res) => {
  const { name, telegram_id } = req.body;
  console.log("Received from Mini App:", name, telegram_id);

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: `${name} (ID: ${telegram_id}) completed the Love Game! ❤️`
      })
    });

    const data = await response.json();
    console.log("Telegram API response:", data);

    res.send({ success: true });
  } catch (err) {
    console.error("Error sending Telegram message:", err);
    res.status(500).send({ error: "Telegram API error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
