const summaryReaction = data => {
  let result = {};
  const keyReactions = process.env.KEY_REACTIONS.split('|');
  const specifiedReactions = data.filter(d => keyReactions.includes(d.name));

  specifiedReactions.forEach(r => {
    r.users.forEach(u => {
      if (result[u] === undefined) {
        result[u] = {
          [r.name]: 1,
        };
      } else {
        if(result[u][r.name] === undefined) {
          result[u][r.name] = 1
        } else {
          result[u][r.name] = result[u][r.name] + 1;
        }
      }
    });
  });

  return result;
};

module.exports = {
  summaryReaction,
};
