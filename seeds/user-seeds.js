const sequelize = require('../config/connections');
const { USer, Post } = require('../models');

const userdata = [
    { 
        username: 'aneary91', 
        email: 'aneary91@gmail.com',
        password: 'password1234'
    },
]

const seedUsers = User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;