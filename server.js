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
        reply: "Veuillez écrire un message."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: message
    });

    console.log("Réponse Gemini :", response.text);

    res.json({
      reply: response.text || "Gemini n'a retourné aucun texte."
    });

  } catch (error) {
    console.error("Erreur Gemini :", error);

    res.status(500).json({
      reply: "Erreur de connexion avec Gemini.",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Eledora AI running on port ${PORT}`);
});
