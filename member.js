const getMembers = async app => {
  const response = await app.client.users.list({
    token: process.env.SLACK_BOT_TOKEN,
  });

  return response.ok ? response.members : [];
};

const getUserRealName = (userList = [], id) => {
  const user = userList.find(u => u.id === id);
  return user === undefined ? id : user.real_name;
};

module.exports = {
  getMembers,
  getUserRealName,
};
