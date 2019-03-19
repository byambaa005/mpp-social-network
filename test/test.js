let posts = require('../app/controllers/posts.server.js');
let users = require('../app/controllers/users.server.js');
let interactoins = require('../app/controllers/interactions.server.js');
let chai = require('chai');
let expect = chai.expect;
it('create post', function() {
    expect(posts._createPost("test",1)).to.include.deep.members([{
        "id": 1,
        "content": "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
        "created_date": "2019-03-14T18:25:43.511Z",
        "user_id": 1
    }]);
});


it('create comment', function() {
    expect(interactoins._createComment("test",1,1)).to.include.deep.members([{
        "id": 1,
        "post_id": 1,
        "user_id": 1,
        "comment": "That is very insightful!",
        "created_date": "2019-03-14T19:25:43.511Z"
    }]);
});

it('get posts', function() {
    expect(posts._listPost(1)).to.include.deep.members([{
        "id": 1,
        "content": "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
        "created_date": "2019-03-14T18:25:43.511Z",
        "user_id": 1
    }]);
});

it('create user', function() {
    expect(users._signup({ username:"test123123",password:"password",firstname:"test",lastname:"test" },1)).to.include.deep.members([{
        "id": 1,
        "username": "Byambaa",
        "firstname": "Byambadorj",
        "lastname": "Dulamsuren",
        "password": "dGVzdA==",
        "gender": "male",
        "created_date": "2019-03-14T18:25:43.511Z"
    }]);
});


it('get likes a post id', function() {
    expect(interactoins.filterByPostId(1,[{id:2, post_id:1}])).to.have.deep.members([{id:2, post_id:1}]);
});

it('list user relations', function() {
    expect(users._listFriends(1,[
        {
            "id": 1,
            "user_id": 1,
            "related_user_id": 2,
            "relation_type": 1
        },
        {
            "id": 1,
            "user_id": 1,
            "related_user_id": 3,
            "relation_type": 2
        },{
            "id": 2,
            "user_id": 2,
            "related_user_id": 4,
            "relation_type": 2
        },
        {
            "id": 3,
            "user_id": 3,
            "related_user_id": 5,
            "relation_type": 1
        }])).to.have.deep.members([{
        "id": 1,
        "user_id": 1,
        "related_user_id": 2,
        "relation_type": 1
    },
        {
            "id": 1,
            "user_id": 1,
            "related_user_id": 3,
            "relation_type": 2
        }]);
});
