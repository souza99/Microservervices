const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {

    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    //recebo o objeto com id que vem dos parametros
    const comments = commentsByPostId[req.params.id] || [];

    // add na lista
    comments.push({ id: commentId, content });

    //adiciona no objeto que armazena os valores
    commentsByPostId[req.params.id] = comments;

    console.log("Comentarios dos post: ", commentsByPostId);

    res.status(201).send(comments);

});

app.listen(4001, () => {
    console.log('Listen on port 4001');
});
