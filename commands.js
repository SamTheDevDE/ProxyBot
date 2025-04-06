import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const SAY_COMMAND = {
  name: 'say',
  type: 1,
  description: 'Say something in the channel',
  integration_types: [1],
  contexts: [0],
  options: [
    {
      type: 3,
      name: 'message',
      description: 'Message to send proxy through',
      required: true,
    },
  ],
};

const REPLY_COMMAND = {
  name: 'reply',
  type: 3,
  integration_types: [1],
  contexts: [0],
}

const ALL_COMMANDS = [
  SAY_COMMAND,
  REPLY_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
