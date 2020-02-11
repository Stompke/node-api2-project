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
    const id = req.params.id;
    const commentBody = req.body;
    if(!body.text) {
        console.log(commentBody)
        res.res(400).json({ errorMessage: "Please provide text for the comment."})
    } else {
       Posts.insertComment()
    }
})


router.get("/:id"), (req, res) => {
    console.log('works????')
    Posts.findById(req.params.id)
    .then(post => {
        console.log(post)
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved."})
    })
}


module.exports = router;