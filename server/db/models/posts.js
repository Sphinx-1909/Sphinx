//Leaving this here if case we want to use post - message structure

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

const Post = db.define('messages', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  postType: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    values: ['video', 'text', 'audio', 'image'],
  },
  postTitle: {
    type: STRING,
    validate: {
      notEmpty: {
        args: true,
      },
    },
  },
  postContent: {
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
  //alternative to lat long we can also use datatype GEOMETRY(POINT) to store lat long. Havent used google maps api to pass lat long so lets see which is easiest to use later.
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
});
module.exports = Post;
