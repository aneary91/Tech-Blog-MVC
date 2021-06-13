const router = require('express').Router();
const { comment } = require('../../models/comment');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.join(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });  
});

router.post('/', (req, res) => {
    Comment.create({ 
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
