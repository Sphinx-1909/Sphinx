const Sequelize = require('sequelize');
const db = require('./../db.js');

const { UUID, UUIDV4, BOOLEAN } = Sequelize;

const MessageUser = db.define('messageUser', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  hasBeenRead: {
    type: BOOLEAN,
  },
});
module.exports = MessageUser;
