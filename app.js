require('dotenv').config();
const { App } = require('@slack/bolt');
const user = require('./member');
const history = require('./history');
const channel = require('./channel');
const reaction = require('./reaction');

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
