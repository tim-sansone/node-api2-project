// implement your posts router here
const express = require('express');
const router = express.Router();

module.exports = router;

const Posts = require('./posts-model')


router.get('/', (req, res) => {
    Posts.find()
        .then(posts => res.json(posts))
        .catch(error => res.status(500).json({message: "The posts information could not be retrieved"}))
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            if(post == null){
                res.status(404).json({message: "The post with the specified ID does not exist"})
                return
            }
            res.json(post)
        })
        .catch(error => res.status(500).json({message: "The post information could not be retrieved" }))
})
