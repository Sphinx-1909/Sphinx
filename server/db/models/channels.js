const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, DECIMAL, TEXT, BOOLEAN } = Sequelize;

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

    isPrivate: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    key: {
      type: STRING,
    },
    latitude: {
      type: DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DECIMAL,
      allowNull: false,
    },
    radius: {
      type: DECIMAL,
    },
  },
});
module.exports = Channel;
