const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
    res.send('good job!');
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
    Posts.insertComment()
})


module.exports = router;