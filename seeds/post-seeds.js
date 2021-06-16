const { POST } = require('../models');

const postdData = [
    { 
        title: '',
        post_url: '',
        user_id: '',
    },
    { 
        title: '',
        post_url: '',
        user_id: '',
    }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;