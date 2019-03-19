//import dependencies
// const express = require('express');
const bodyParser = require('body-parser');
const R = require('ramda');
const fs = require('fs');

/**
 * Module dependencies.
 */
let users = require('./controllers/users.server.js'),
    posts = require('./controllers/posts.server.js'),
    interactions = require('./controllers/interactions.server.js');

module.exports = function (app) {

    app.route('/api/posts/:userId')
        .get(posts.list);

    app.route('/api/interactions/:postId')
        .get(interactions.comments);

    app.route('/api/likePost')
        .post(interactions.createReaction);

    app.route('/api/dislikePost')
        .post(interactions.createReaction);

    app.route('/api/likeCount/:postId')
        .get(interactions.likeCount);

    app.route('/api/dislikeCount/:postId')
        .get(interactions.dislikeCount);

    app.route('/api/posts')
        .post(posts.create);

    app.route('/api/authenticate')
        .post(users.auth);

    app.route('/api/signup')
        .post(users.signup);

    app.route('/api/friendsList/:userId')
        .get(users.listFriends);

    app.route('/api/nonFollowers/:userId')
        .get(users.nonFollowers);
};

