require('dotenv').config();
const { App } = require('@slack/bolt');
const dayjs = require('dayjs');
const user = require('./user');
const history = require('./history');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const main = async () => {
  const userList = await user.getUserList(app);

  const channelList = await app.client.conversations.list({
    token: process.env.SLACK_BOT_TOKEN,
  });

  const allMessages = await history.getAllMessages(app, channelList.channels);

  // console.log(allMessages);

  const reactions = allMessages
    .filter(m => m.reactions !== undefined)
    .reduce((prev, current) => {
      return [...prev, ...current.reactions];
    }, []);

  const reactionsModified = reactions.map(r => {
    return {
      ...r,
      users: r.users.map(u => user.getUserRealName(userList, u)),
    };
  });

  console.log(reactionsModified);
};

main();