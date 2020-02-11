const express = require("express");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter)

server.get("/" , (req, res) => {
    res.send(`
    <h1>It's Working!!! </h1>
    `);
})

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})