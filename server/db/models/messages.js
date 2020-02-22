const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, INTEGER, TEXT, DATE, BOOLEAN } = Sequelize;

const Message = db.define('messages', {
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
  fileType: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    values: ['video', 'text', 'audio', 'image'],
  },
  messageTitle: {
    type: STRING,
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
  location: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL),
    allowNull: false,
  },
  radius: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  encrypted: {
    type: BOOLEAN,
  },
  key: {
    type: STRING,
  },
  parentMessageId: {
    type: UUID,
  },
  expirationTime: {
    type: DATE,
  },
});
module.exports = Message;
