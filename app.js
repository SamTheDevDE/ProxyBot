import 'dotenv/config';
import https from 'https';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'private.key')),    // Private Key
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificate.crt')),     // Certificate
};

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/interactions', async function (req, res) {
  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    if (name === 'say') {
      const message = data.options[0]?.value || 'No message provided.';
      const filtered_message = message.replace(/\\n/g, '\n');
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: filtered_message,
        },
      });
    }

    if (name === 'reply') {
      return res.send({
        type: InteractionResponseType.MODAL,
        data: {
          custom_id: 'user_input_modal',
          title: 'User Input Form',
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: 'user_input',
                  style: 1,
                  label: 'Enter your reply',
                  placeholder: 'Type something...',
                  required: true,
                },
              ],
            },
          ],
        },
      });
    }
  }

  if (type === InteractionType.MODAL_SUBMIT) {
    const { custom_id, components } = data;

    if (custom_id === 'user_input_modal') {
      const userInput = components[0]?.components[0]?.value || 'No input provided.';
      const filteredInput = userInput.replace(/\\n/g, '\n');

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: filteredInput,
        },
      });
    }
  }

  return res.status(400).send('Unknown interaction type.');
});

if (process.env.isHTTPS === "true") {
  https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server running on: https://localhost:${PORT}`);
  });
} else if (process.env.isHTTPS === "false") {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP Server running on: http://localhost:${PORT}`);
  });
}