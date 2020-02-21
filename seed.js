const { db } = require("./server/db");
const chalk = require("chalk");
const pkg = require("./package.json");

const seed = () => {
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
