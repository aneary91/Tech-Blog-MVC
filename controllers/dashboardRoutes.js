const router = require('express').Router();
const sequelize = require('../configuration/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// this is to get all the post from the dashboard
router.get('/', withaAuth, (req, res) => {
    console.log(req.session);
    console.log('================================');
    Post.findAll({ 
        where: {
            user_id: req.session.user_id
        },
        attributes: [

            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('SELECT COUNT(*)FROM vote WHERE post.id = vote.post_id'), 'vote_count'],
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});