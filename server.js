const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/chat", (req, res) => {
  const message = req.body.message;

  res.json({
    reply: `Eledora AI a reçu votre demande : ${message}`
  });
});

app.listen(PORT, () => {
  console.log(`Eledora AI running on port ${PORT}`);
});
