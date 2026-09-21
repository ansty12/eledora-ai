const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Eledora AI",
    status: "online",
    message: "Welcome to Eledora AI"
  });
});

app.listen(PORT, () => {
  console.log(`Eledora AI running on port ${PORT}`);
});
