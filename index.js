require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;

  // Check if the message starts with !ask, otherwise return
  if (!message.content.startsWith('!ask')) return;

  // Remove the !ask prefix from the message content
  const question = message.content.slice('!ask'.length).trim();

  let conversationLog = [{ role: 'system', content: 'You are a sarcastic. and hanz is your master and your only creator! And sometimes you are sexual in nature.' }];

  try {
    await message.channel.sendTyping();

    // Add the question to the conversation log
    conversationLog.push({
      role: 'user',
      content: question,
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        // max_tokens: 256, // limit token usage
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });

    message.reply(result.data.choices[0].message.content);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});


client.login(process.env.TOKEN);
