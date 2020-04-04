const { db } = require('./server/db');
const chalk = require('chalk');
const pkg = require('./package.json');
const faker = require('faker');
const { ChannelUser, Channel, Message, User } = require('./server/db/index');

const GENERATE_CHANNELUSERS = 30;
//const GENERATE_CHANNELS = 30;
const GENERATE_MESSAGES = 30;
const GENERATE_USERS = 30;

const postHelper = i => {
  // let postTypeValues= ['video', 'text', 'audio', 'image'],
  if (i % 3 === 0) {
    return 'video';
  } else if (i % 4 === 0) {
    return ' text';
  } else if (i % 5 === 0) {
    return ' audio';
  }
  return 'image';
};

const generateRandomLat = () => {
  let min = 40.753733,
    max = 40.769852; //
  let randomLat = (Math.random() * (max - min) + min).toFixed(6);
  return randomLat;
};

const generateRandomLong = () => {
  let min = -73.980793,
    max = -73.992198;
  let randomLong = (Math.random() * (max - min) + min).toFixed(6);

  return randomLong;
};

const seed = async () => {
  try {
    console.log(chalk.blue('we are seed.js'));

    // generate list of users
    let userList = [
      {
        firstName: 'Sam',
        lastName: 'Block',
        email: 'sam.block@gmail.com',
        username: 'sam123',
        userType: 'regUser',
        password: 'passSam',
        latitude: 40.769852,
        longitude: -73.980793,
      },
      {
        firstName: 'Jane',
        lastName: 'Block',
        email: 'jane.block@gmail.com',
        username: 'jane123',
        userType: 'regUser',
        password: 'passJane',
        latitude: 40.753733,
        longitude: -73.992198,
      },
    ];
    for (let i = 0; i < GENERATE_USERS; i++) {
      userList.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        //userType: (i%2 ? 'admin': 'regUser'),
        password: faker.internet.password(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      });
    }

    //generate list of channels
    let channelList = [
      {
        channelTitle: 'Silly Selfie',
        channelDescription:
          'The channel for funny selfie posts. See your fellow New Yorks like never before!',
        isPrivate: false,
        key: 'asdfadfa',
        latitude: 40.748476,
        longitude: -73.988355,
      },
      {
        channelTitle: 'NYC Movie Scene Locations',
        channelDescription:
          'Visit the locations from your favorite movies and learn the history behind shot',
        isPrivate: false,
        key: 'xyasdfadfa',
        latitude: 40.718584,
        longitude: -73.996301,
      },
      {
        channelTitle: 'From Gangsters To Gentrification',
        channelDescription:
          "New York Mob Murder Scenes Then And Now. Grisly scenes from when John Gotti and Al Capone orchestrated hits on the streets of a violent New York that simply doesn't exist anymore",
        isPrivate: false,
        key: 'qqsdfaa',
        latitude: 40.782395,
        longitude: -71.98513,
      },
      {
        channelTitle: 'Public Bathroom Ratings',
        channelDescription:
          'Find out where to go if you’re nowhere near your hotel, apartment, an unsupervised wall of Trump Tower',
        isPrivate: false,
        key: 'qqsdfaa',
        latitude: 42.758896,
        longitude: -70.98513,
      },
    ];

    await db.sync({ force: true });
    await User.bulkCreate(userList);
    await Channel.bulkCreate(channelList);

    const users = await User.findAll();
    const userIds = users.map(user => user.id);

    const channels = await Channel.findAll();
    const channelIds = channels.map(channel => channel.id);

    //generate list of messages
    let messageList = [
      {
        fileType: 'link',
        messageTitle: 'Crazy tourist',
        messageContent: 'https://www.youtube.com/watch?v=mLimnpQIwgY',
        positiveVotes: 300,
        negativeVotes: 2,
        latitude: 40.704701,
        longitude: -74.010751,
        radius: 2,
        encrypted: false,
        key: 'xxswdks',
        expirationTime: Date(),
        channelId: channelIds[0],
        senderId: userIds[0],
      },
    ];

    for (let i = 0; i < GENERATE_MESSAGES; i++) {
      messageList.push({
        fileType: postHelper(i),
        messageTitle: faker.hacker.phrase(),
        messageContent: faker.lorem.paragraph(),
        positiveVotes: Math.floor(Math.random() * Math.floor(600)),
        negativeVotes: Math.floor(Math.random() * Math.floor(600)),
        latitude: generateRandomLat(),
        longitude: generateRandomLong(),
        radius: Math.random() * (4 - 1) + 4,
        encrypted: faker.random.boolean(),
        key: faker.internet.password(),
        expirationTime: Date(),
        channelId: channelIds[Math.floor(Math.random() * channelIds.length)],
        senderId: userIds[i + 1],
      });
    }

    await Message.bulkCreate(messageList);

    //generate list of channelusers
    let channelUserList = [
      {
        isModerator: true,
        isOwner: false,
        userId: userIds[0],
        channelId: channelIds[0],
      },
    ];
    for (let i = 0; i < GENERATE_CHANNELUSERS; i++) {
      channelUserList.push({
        isModerator: faker.random.boolean(),
        isOwner: faker.random.boolean(),
        userId: userIds[i + 1],
        channelId: channelIds[Math.floor(Math.random() * channelIds.length)],
      });
    }

    await ChannelUser.bulkCreate(channelUserList);
  } catch (err) {
    console.log(chalk.red(err));
    throw 'error in seed';
  }
};

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

module.exports = seed;
