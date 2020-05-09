const dayjs = require('dayjs');

const createOption = (channelId, start = '', end = '') => {
  return {
    token: process.env.SLACK_BOT_TOKEN,
    channel: channelId,
    oldest: start === '' ? 0 : dayjs(start).unix(),
    latest: end === '' ? dayjs().unix() : dayjs(end).unix()
  }
}

module.exports = {
  createOption
}