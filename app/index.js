//import dependencies
// const express = require('express');
const bodyParser = require('body-parser');
const R = require('ramda');

// define the Express app
// const app = express();

// the database
const questions = [];

module.exports = function (app) {

// use bodyParser to parse application/json content-type
    app.use(bodyParser.json());

// retrieve all questions
    app.get('/api/questions', (req, res) => {
        const qs = questions.map(q => ({
            id: q.id,
            title: q.title,
            description: q.description,
            answers: q.answers.length,
        }));
        res.send(qs);
    });

// get a specific question
    app.get('/api/:id', (req, res) => {
        const question = questions.filter(q => (q.id === parseInt(req.params.id)));
        if (question.length > 1) return res.status(500).send();
        if (question.length === 0) return res.status(404).send();
        res.send(question[0]);
    });

// insert a new question
    app.post('/api/questions', (req, res) => {
        const {title, description} = req.body;
        const newQuestion = {
            id: questions.length + 1,
            title,
            description,
            answers: []
        };
        questions.push(newQuestion);
        res.status(200).send();
    });

// insert a new answer to a question
    app.post('/api/answer/:id', (req, res) => {
        const {answer} = req.body;

        const question = questions.filter(q => (q.id === parseInt(req.params.id)));
        if (question.length > 1) return res.status(500).send();
        if (question.length === 0) return res.status(404).send();

        question[0].answers.push({
            answer
        });

        res.status(200).send();
    });

    app.delete('/api/questions/:id', (req, res) => {

    });

};

