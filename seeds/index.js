const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');










// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await Dish.bulkCreate(dishData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

seedAll();