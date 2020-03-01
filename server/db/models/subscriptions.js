const Sequelize = require('sequelize');
const db = require('./../db.js');
const { UUID, UUIDV4, STRING } = Sequelize;

const Subscriptions = db.define('subscriptions', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  endpoint: {
    type: STRING,
  },
  auth: {
    type: STRING,
  },
  p256dh: {
    type: STRING,
  },
});

module.exports = Subscriptions;
