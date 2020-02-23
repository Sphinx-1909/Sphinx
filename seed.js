const { db } = require("./server/db");
const chalk = require("chalk");
const pkg = require("./package.json");
const faker = require('faker');
const { ChannelUser, Channel, Message, MessageUser, Post, User} = require("./server/db/index")

const GENERATE_CHANNELUSERS = 23
const GENERATE_CHANNELS = 10
const GENERATE_MESSAGES = 20
const GENERATE_POSTS= 15
const GENERATE_USERS = 21










const seed = async () => {
  try{
    console.log(chalk.blue('!we are seed.js'))
    await db.sync({ force: true })


    // generate list of users
    let userList = [
      {
        firstName: 'Sam',
        lastName: "Block",
        email: "sam.block@gmail.com",
        username: "sam123",
        userType: "regUser",
        password: "passSam",
        latitude: 
      }
    ]
    // generate list of posts
    //generate list of messages
    //generate list of channels
    //generate list of channelusers
  }
  return db.sync({ force: true });
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(chalk.greenBright(`Successful seeding in ${pkg.name}.`));
      db.close();
    })
    .catch(err => {
      console.error(chalk.redBright(`Error with seeding ${pkg.name}!`));
      console.error(err);
      db.close();
    });
}
