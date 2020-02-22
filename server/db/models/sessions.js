const Sequelize = require('sequelize');
const db = require('./../db.js');
const { UUID, UUIDV4 } = Sequelize;

const Session = db.define('sessions', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});

module.exports = Session;
