const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT, BOOLEAN, DOUBLE } = Sequelize;

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
  channelDescription: {
    type: TEXT,
  },
  isPrivate: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  key: {
    type: STRING,
  },
  latitude: {
    type: DOUBLE(null, 7),
  },
  longitude: {
    type: DOUBLE(null, 7),
  },
  radius: {
    type: DOUBLE(null, 2),
  },
});
module.exports = Channel;
