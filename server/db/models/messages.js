const Sequelize = require('sequelize');
const db = require('./../db.js');

const {
  UUID,
  UUIDV4,
  STRING,
  INTEGER,
  TEXT,
  DATE,
  BOOLEAN,
  DECIMAL,
} = Sequelize;

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
    defaultValue: 0,
  },
  negativeVotes: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  childMessageId: {
    type: UUID,
  },
  expirationTime: {
    type: DATE,
  },
  groupUnlock: {
    type: INTEGER,
  },
});
module.exports = Message;
