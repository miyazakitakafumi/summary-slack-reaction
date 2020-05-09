const dayjs = require('dayjs');

const getAllMessages = async (app, channels) => {
  let result = [];

  await Promise.all(
    channels.map(async c => {
      const historyPerChannel = await app.client.conversations.history(
        createOption(c.id)
      );

      if(historyPerChannel.ok) result = [...result, ...historyPerChannel.messages];
    })
  );

  return result;
};

const createOption = (channelId, start = '', end = '') => {
  return {
    token: process.env.SLACK_BOT_TOKEN,
    channel: channelId,
    oldest: start === '' ? 0 : dayjs(start).unix(),
    latest: end === '' ? dayjs().unix() : dayjs(end).unix(),
  };
};

module.exports = {
  getAllMessages,
  createOption,
};
