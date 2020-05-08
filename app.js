const { App } = require('@slack/bolt');
require('dotenv').config();
// const helper = require('./func.js')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('ひとちゃん', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`ゔぇゔぇゔぇゔぇ たみぼうず おはよう <@${message.user}>!`);
});

app.message('test', async ({ message, say }) => {
  // const result = await app.client.conversations.history(options)
  // console.log(result)
  const channelList = await app.client.conversations.list({
    token: process.env.SLACK_BOT_TOKEN,
  })

  const cl = channelList.channels.map(c => {
    return {
      id: c.id,
      name: c.name
    }
  })

  console.log('cl', cl)

  const summary = []
  cl.forEach(async c => {
    const history = await app.client.conversations.history({
      token: process.env.SLACK_BOT_TOKEN,
      channel: c.id
    })
    summary.push(history.messages)
  })

  console.log('@@@', summary)
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();