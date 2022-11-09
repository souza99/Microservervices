const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {

    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    //recebo o objeto com id que vem dos parametros
    const comments = commentsByPostId[req.params.id] || [];

    // add na lista
    comments.push({ id: commentId, content });

    //adiciona no objeto que armazena os valores
    commentsByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);

});

app.post('/events', (req, res) => {
    console.log('Received Event: ', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listen on port 4001');
});
