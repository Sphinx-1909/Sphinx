const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, INTEGER, TEXT } = Sequelize;

const Message = db.define('messages', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  messageTitle: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
      },
    },
  },
  messageContent: {
    // link to youTube video or spotify audio or actual typed message
    type: TEXT,
    validate: {
      notEmpty: {
        args: true,
      },
    },
  },
  positiveVotes: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  negativeVotes: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
module.exports = Message;
