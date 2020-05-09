const getChannel = async app => {
  const response = await app.client.conversations.list({
    token: process.env.SLACK_BOT_TOKEN,
  });

  return response.ok ? response.channels : [];
};

module.exports = {
  getChannel,
};
