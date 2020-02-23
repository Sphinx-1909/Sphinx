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
  // not needed because admin info stored on channell
  //userType: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  //   values: ['admin', 'regUser'],
  // },
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
});

module.exports = User;
