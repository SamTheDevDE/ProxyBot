import 'dotenv/config';
import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    //console.log(data)
    if (name === 'say') {
      const message = data.options[0]?.value || 'No message provided.';
      
      // Send a message into the channel where the command was triggered
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: message,
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

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: userInput,
        },
      });
    }
  }

  return res.status(400).send('Unknown interaction type.');
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
