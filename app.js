require('dotenv').config();
const { App } = require('@slack/bolt');
const user = require('./func/member');
const history = require('./func/history');
const channel = require('./func/channel');
const reaction = require('./func/reaction');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const main = async () => {
  const members = await user.getMembers(app);
  const channels = await channel.getChannel(app);
  const messages = await history.getAllMessages(app, channels);
  const reactions = reaction.extractReactions(messages, members);
  const result = reaction.summaryReaction(reactions);

  console.log(result);
};

main();
