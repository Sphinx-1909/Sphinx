const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, BOOLEAN } = Sequelize;

const ChannelUser = db.define('channelUser', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
  },
  channelId: {
    type: UUID,
  },
  isModerator: {
    type: BOOLEAN,
  },
  idAdmin: {
    type: BOOLEAN,
  },
});
module.exports = ChannelUser;
