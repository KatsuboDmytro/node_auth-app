const { Token } = require('../models/Token.js');

async function save(userId, refreshToken) {
  const token = await Token.findOne({
    where: { userId },
  });

  if (token) {
    token.refreshToken = refreshToken;

    await token.save();

    return true;
  }

  await Token.create({ userId, refreshToken });

  return false;
}

function getByToken(refreshToken) {
  return Token.findOne({
    where: { refreshToken },
  });
}

function remove(userId) {
  return Token.destroy({
    where: { userId },
  });
}

const tokenService = {
  getByToken,
  save,
  remove,
};

module.exports = { tokenService };
