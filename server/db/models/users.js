const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, DECIMAL } = Sequelize;

const User = db.define('users', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    userType: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      values: ['admin', 'regUser'],
    },
    password: {
      type: STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    latitude: {
      type: DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DECIMAL,
      allowNull: false,
    },
  },
});

module.exports = User;
