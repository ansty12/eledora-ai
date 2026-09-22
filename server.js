const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message manquant"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error("Erreur Gemini :", error);

    res.status(500).json({
      error: "Impossible de contacter Eledora AI pour le moment."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Eledora AI running on port ${PORT}`);
});
