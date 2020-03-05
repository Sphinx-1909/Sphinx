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
  DOUBLE,
} = Sequelize;

const Message = db.define('messages', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
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
    type: DOUBLE(null, 7),
    allowNull: false,
  },
  longitude: {
    type: DOUBLE(null, 7),
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
  expirationTime: {
    type: DATE,
  },
  // groupUnlock: {
  //   type: INTEGER,
  // },
});
module.exports = Message;
