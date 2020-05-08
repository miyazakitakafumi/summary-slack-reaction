const getChannels = async (options) => {
  return await app.client.conversations.list(options)
}

const hoge = () => 'hoge'

module.exports = {
  hoge,
  getChannels
}