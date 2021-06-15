const router = require('express').Router();
const sequelize = require('../configuration/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// this is to get all the post from the dashboard
router.get('/', (req, res) => {
    console.log('================================');
    Post.findAll({ 
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at',
            [sequelize.literal('SELECT COUNT(*)FROM vote WHERE post.id = vote.post_id'), 'vote_count']
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
    .then(dbPostData =>  res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id', 
            'post_url', 
            'title', 
            'created_at'
            [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post-id = vote.post_id)'), 'vote_count']
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
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        } else {
            res.stuats(404).end();
        }
    })
    .catch(err => {
        res.staus(500).json(err);
    });
});

module.exports = router;
