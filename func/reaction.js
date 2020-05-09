const member = require('./member');

// FIXME membersに依存しているので分離したほうが良さげ
const extractReactions = (messages, members) => {
  return messages
    .filter(m => m.reactions !== undefined)
    .reduce((prev, current) => {
      return [...prev, ...current.reactions];
    }, [])
    .map(r => {
      return {
        ...r,
        users: r.users.map(u => member.getUserRealName(members, u)),
      };
    });
};

const summaryReaction = data => {
  let result = {};
  const keyReactions = process.env.KEY_REACTIONS.split('|');
  const specifiedReactions = data.filter(d => keyReactions.includes(d.name));

  specifiedReactions.forEach(r => {
    r.users.forEach(u => {
      if (result[u] === undefined) return (result[u] = { [r.name]: 1 });

      if (result[u][r.name] === undefined) {
        result[u][r.name] = 1;
      } else {
        result[u][r.name]++;
      }
    });
  });

  return result;
};

module.exports = {
  extractReactions,
  summaryReaction,
};
