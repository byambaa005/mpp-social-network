//import dependencies
// const express = require('express');
const bodyParser = require('body-parser');
const R = require('ramda');
const fs = require('fs');


// define the Express app
// const app = express();


// the database

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const posts = dummyData['posts'];
const users = dummyData['users'];

module.exports = function (app) {

// use bodyParser to parse application/json content-type
    app.use(bodyParser.json());

// retrieve all questions
    app.get('/api/posts', (req, res) => {
        const qs = posts.map(q => ({
            id: q.id,
            content: q.content,
            created_date: q.created_date,
            user_id: q.user_id
        }));
        res.send(qs);
    });

// get a specific question
    app.get('/api/post/:id', (req, res) => {
        const post = posts.filter(q => (q.id === parseInt(req.params.id)));
        if (post.length > 1) return res.status(500).send();
        if (post.length === 0) return res.status(404).send();
        res.send(post[0]);
    });

// insert a new question
    app.post('/api/posts', (req, res) => {
        let curDate = new Date();
        const {content} = req.body;
        const newPost = {
            id: posts.length + 1,
            content,
            created_date: curDate.toJSON(),
            user_id: 1
        };
        posts.push(newPost);
        res.status(200).send();
    });

// insert a new answer to a question
    app.post('/api/answer/:id', (req, res) => {
        const {answer} = req.body;

        const post = posts.filter(q => (q.id === parseInt(req.params.id)));
        if (post.length > 1) return res.status(500).send();
        if (post.length === 0) return res.status(404).send();

        res.status(200).send();
    });

};

