const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 150
    })
  });

  const data = await response.json();
  const botResponse = data.choices[0].text.trim();
  res.json({ response: botResponse });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
