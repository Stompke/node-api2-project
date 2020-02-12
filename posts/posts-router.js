const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
    // res.send('good job!');
    Posts.find()
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.post("/", (req, res) => {
    
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
        .then(newPost => {
            console.log(req.body)
            res.status(210).json(newPost)
        })
        .catch(err => {
            console.log(req.body)
                res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})


router.post("/:id/comments", (req, res) => {
    const post_id = req.params.id;
    const { text } = req.body;
    if(!req.body.text) {
        console.log(commentBody)
        console.log('no text property!!!')
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {

        Posts.findById(post_id)  
            .then(postId => {
                if( postId.length === 0 ) {
                    res.status(404).json({ message: "The post with the specified ID does not exist."})
                } else {
                    Posts.insertComment({text, post_id})
                    .then(comment => {
                        res.status(201).json(comment)
                    })
                    .catch(err => {
            
                        console.log(err)
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
    }
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Posts.findById(id)
    .then(post => {
        if (post.length) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

// /api/posts/:id/comments	
// Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
    const id = req.params.id
    console.log(id)
    Posts.findPostComments(id)
    .then(comments => {
        if(!comments.length){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json({comments})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

// `DELETE` request to `/api/posts/:id`:

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Posts.remove(id)
    .then(deleted => {
        if(deleted === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(200).json(deleted)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be deleted." })
    })
})

// PUT	/api/posts/:id

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const commentData = req.body;
    console.log(id)
    console.log(commentData)
    Posts.update(id, commentData)
    .then(updated => {
        if( !updated ) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else if ( !commentData.title || !commentData.contents ) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(200).json(commentData)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})


module.exports = router;