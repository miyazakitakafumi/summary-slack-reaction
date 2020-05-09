require('dotenv').config();
const { App } = require('@slack/bolt');
const dayjs = require('dayjs');
const user = require('./member');
const history = require('./history');
const channel = require('./channel');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const main = async () => {
  const members = await user.getMembers(app);
  const channels = await channel.getChannel(app);
  const messages = await history.getAllMessages(app, channels);

  const reactions = messages
    .filter(m => m.reactions !== undefined)
    .reduce((prev, current) => {
      return [...prev, ...current.reactions];
    }, []);

  const reactionsModified = reactions.map(r => {
    return {
      ...r,
      users: r.users.map(u => user.getUserRealName(members, u)),
    };
  });

  console.log(reactionsModified);
};

main();
