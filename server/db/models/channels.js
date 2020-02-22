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
    location: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL),
      allowNull: false,
    },
    radius: {
      type: Sequelize.DECIMAL,
    },
  },
});
module.exports = Channel;
