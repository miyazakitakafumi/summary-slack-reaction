const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('ひとちゃん', async ({ message, say }) => {
  await say(`ゔぇゔぇゔぇゔぇ たみぼうず おはよう <@${message.user}>!`);
});

app.message('test', async ({ message, say }) => {
  const channelList = await app.client.conversations.list({
    token: process.env.SLACK_BOT_TOKEN,
  })

  const allMessages = await getAllMessages(app, channelList.channels)

  const reactions = allMessages.filter(m => m.reactions !== undefined).reduce((prev, current) => {
    return [...prev, ...current.reactions]
  }, [])

  console.log(reactions)
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


const getAllMessages = async (app, channels) => {
  let result = []

  await Promise.all(channels.map(async c => {
    const historyPerChannel = await app.client.conversations.history({
      token: process.env.SLACK_BOT_TOKEN,
      channel: c.id
    })

    result = [...result, ...historyPerChannel.messages]
  }))

  return result
}