const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');

// get all posts for the homepage 
router.get('/', (req, res) => {
    console.log('================================');
    Post.findAll ({ 
        attributes: [
            'id', 
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post_id = vote.post_id)'), 'vote_count']
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
        const posts = dbPostData.map(post => ({ plain: true}));

        res.render('homepge', { 
            posts,
            loggedIn: req.session.loggedIn  
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});