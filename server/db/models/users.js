const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, STRING, DOUBLE } = Sequelize;

const User = db.define('users', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  // you can remove this if you think username is excessive but its somewhat like a privacy layer to prevent people form knowing your email / name if we are going to display info on the user
  userName: {
    type: STRING,
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  latitude: {
    type: DOUBLE(null, 7),
  },
  longitude: {
    type: DOUBLE(null, 7),
  },
});

module.exports = User;
