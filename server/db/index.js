//DATABASE && MODELS
const db = require('./db');
const User = require('./models/users');
const Message = require('./models/messages');
const Session = require('./models/sessions');
const Channel = require('./models/channels');
const ChannelUser = require('./models/channelUser');

//Associations

//User
User.hasMany(Message);
Message.belongsTo(User);

//Sessions
Session.hasOne(User);
User.belongsTo(Session);

//Message
Message.belongsTo(Channel);
Channel.hasMany(Message);

//ChannelUser

User.belongsToMany(Channel, { through: ChannelUser });
Channel.belongsToMany(User, { through: ChannelUser });

// the following enables us to remove read messages from a user's view

User.belongsToMany(Message, { through: 'readBy' })
Message.belongsToMany(User, { through: 'readBy' })

module.exports = {
  db,
  User,
  Message,
  Session,
  Channel,
  ChannelUser,
};
