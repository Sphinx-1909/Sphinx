const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, BOOLEAN } = Sequelize;

const ChannelUser = db.define('channelUser', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  isModerator: {
    type: BOOLEAN,
  },
  isOwner: {
    type: BOOLEAN,
  },
});
module.exports = ChannelUser;
