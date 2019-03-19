let posts = require('../app/controllers/posts.server.js');
let users = require('../app/controllers/users.server.js');
let interactoins = require('../app/controllers/interactions.server.js');
let chai = require('chai');
let expect = chai.expect;
it('create post', function() {
    expect(posts._createPost("test",1)).to.own.include({content: "test"});
});

it('get posts', function() {
    expect(posts._listPost(1)).has.members([{
        "id": 1,
        "content": "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
        "created_date": "2019-03-14T18:25:43.511Z",
        "user_id": 1
    }]);
});
