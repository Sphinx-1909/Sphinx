//DATABASE && MODELS
const db = require('./db');
const User = require('./models/users');
const Message = require('./models/messages');
const Session = require('./models/sessions');
const Channel = require('./models/channels');
const ChannelUser = require('./models/channelUser');
const MessageUser = require('./models/messageUser');
const Post = require('./models/posts');

//Associations
// - No Associations yet

//Most of these do not require a belongTo.

//User
User.hasMany(Message);
Message.belongsTo(User);

//Sessions
Session.hasOne(User);
User.belongsTo(Session);

// Added this here in case we decide to use the post - message structure of messaging
//Post
Post.hasMany(Message);
Message.belongsTo(Post);

//Message
Message.belongsTo(Channel);
Channel.hasMany(Message);

//ChannelUser
User.hasMany(ChannelUser);
Channel.hasMany(ChannelUser);

// MessageUser table is being stored here for the feature to make sure if a message is seen once it cannot be seen again for that user

//MessageUser
Message.hasMany(MessageUser);
MessageUser.belongsTo(User);
MessageUser.belongsTo(Message);
Message.hasOne(MessageUser);

module.exports = {
  db,
  User,
  Message,
  Session,
  Channel,
  ChannelUser,
};
