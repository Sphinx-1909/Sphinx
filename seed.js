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
  let min = 40.495992,
    max = 40.915568;
  let randomLat = (Math.random() * (max - min) + min).toFixed(6);
  return randomLat;
};

const generateRandomLong = () => {
  let min = -74.257159,
    max = -73.699215;
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
        latitude: 40.7527,
        longitude: 73.9772,
      },
      {
        firstName: 'Jane',
        lastName: 'Block',
        email: 'jane.block@gmail.com',
        username: 'jane123',
        userType: 'regUser',
        password: 'passJane',
        latitude: 40.7527,
        longitude: 73.9772,
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
        channelTitle: 'Weird Shit',
        channelDescription:
          'THE channel for the craziest, weirdest shit out there',
        isPrivate: false,
        key: 'asdfadfa',
        latitude: 41.7527,
        longitude: -73.9772,
      },
      {
        channelTitle: 'NYC Movie Scene Locations',
        channelDescription:
          'Visit the locations from your favorite movies and learn the history behind shot',
        isPrivate: false,
        key: 'xyasdfadfa',
        latitude: 40.758898,
        longitude: -73.98513,
      },
      {
        channelTitle: 'From Gangsters To Gentrification',
        channelDescription:
          "New York Mob Murder Scenes Then And Now. Grisly scenes from when John Gotti and Al Capone orchestrated hits on the streets of a violent New York that simply doesn't exist anymore",
        isPrivate: false,
        key: 'qqsdfaa',
        latitude: 42.758897,
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
    // for (let i = 0; i < GENERATE_CHANNELS; i++) {
    //   channelList.push({
    //     channelTitle: faker.lorem.words(),
    //     channelDescription: faker.lorem.sentence(),
    //     isPrivate: faker.random.boolean(),
    //     key: faker.internet.password(),
    //     latitude: faker.address.latitude(),
    //     longitude: faker.address.longitude(),
    //   });
    // }

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
