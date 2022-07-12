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

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(title == null || contents == null){
        res.status(400).json({message: "Please provide title and contents for the post"})
        return
    }
    Posts.insert(req.body)
        .then(id => Posts.findById(id.id))
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({message: "There was an error while saving the post to the database"}))
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body;
    if(title == null || contents == null){
        res.status(400).json({message: "Please provide title and contents for the post"})
        return
    }
    Posts.update(id, req.body)
        .then(updated => {
            if(updated !== 1){
                res.status(404).json({message: "The post with the specified ID does not exist"})
                return
            }
            return Posts.findById(id)
        })
        .then(post => res.json(post))
        .catch(error => res.status(500).json({message: "The post information could not be modified"}))
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const post = await Posts.findById(id)
    Posts.remove(id)
        .then(removed => {
            if(removed === 1){
                res.json(post)
                return
            }
            res.status(404).json({message: "The post with the specified ID does not exist"})
        })
        .catch(error => res.status(500).json({message: "The post could not be removed"}))
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(id)
        .then(comments => {
            if(comments.length > 0){
                res.json(comments)
                return
            }
            res.status(404).json({message: "The post with the specified ID does not exist"})
        })
        .catch(error => res.status(500).json({message: "The comments information could not be retrieved"}))
})
