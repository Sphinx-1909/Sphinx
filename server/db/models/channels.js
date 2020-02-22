const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, INTEGER, TEXT, BOOLEAN } = Sequelize;

const Channel = db.define('channels', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  channelTitle: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
      },
    },
  },
  channelTopic: {
    type: TEXT,
    validate: {
      notEmpty: {
        args: true,
      },
    },
  },
  isPrivate: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
module.exports = Channel;
