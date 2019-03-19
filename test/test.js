let posts = require('../app/controllers/posts.server.js');
let users = require('../app/controllers/users.server.js');
let interactoins = require('../app/controllers/interactions.server.js');
let chai = require('chai');
let expect = chai.expect;
it('create post', function() {
    expect(posts._createPost("test",1)).to.include.deep.members([{
        "id": 1,
        "content": "Reserve army of labour is a concept in Karl Marx's critique of political economy.[1] It refers to the unemployed and underemployed in capitalist society. It is synonymous with \"industrial reserve army\" or \"relative surplus population\", except that the unemployed can be defined as those actually looking for work and that the relative surplus population also includes people unable to work. ",
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
it('create like', function() {
    expect(interactoins._createReaction(1,1,1)).to.include.deep.members([{
        "id": 1,
        "post_id": 1,
        "reaction_type": 1,
        "user_id": 2,
        "created_date": "2019-03-14T19:25:43.511Z"
    }]);
});
it('get posts', function() {
    expect(posts._listPost(1)).to.include.deep.members([{
        "id": 1,
        "content": "Reserve army of labour is a concept in Karl Marx's critique of political economy.[1] It refers to the unemployed and underemployed in capitalist society. It is synonymous with \"industrial reserve army\" or \"relative surplus population\", except that the unemployed can be defined as those actually looking for work and that the relative surplus population also includes people unable to work. ",
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
        "img": "Demo.jpg",
        "created_date": "2019-03-14T18:25:43.511Z"
    }]);
});


it('get likes a post id', function() {
    expect(interactoins.filterByPostId(1,[{id:2, post_id:1}])).to.have.deep.members([{id:2, post_id:1}]);
});
it('count likes a post id', function() {
    expect(interactoins.likeByPostId(1,[{id:2, post_id:1, reaction_type:1}])).is.greaterThan(0);
});
it('get likes a post id', function() {
    expect(interactoins.dislikeByPostId(1,[{id:2, post_id:1, reaction_type:2}])).is.greaterThan(0);
});
it('list user friends', function() {
    expect(users._listFollowing(1)).to.include.members([2,3]);
});
it('list user followers', function() {
    expect(users._listFollowers(1)).to.include.members([2,3]);
});
it('list user  non followers', function() {
    expect(users._nonFollowers(1)).not.to.include.members([1]);
});

it('list user  _listUsersById', function() {
    expect(users._listUsersById([1])).to.have.deep.members([ {
        "id": 1,
        "username": "Byambaa",
        "firstname": "Byambadorj",
        "lastname": "Dulamsuren",
        "password": "dGVzdA==",
        "gender": "male",
        "img": "Demo.jpg",
        "created_date": "2019-03-14T18:25:43.511Z"
    }]);
});
it('search user by searchtext', function() {
    expect(users._searchUser("anhaa")).to.include.deep.members([ {
        "id": 3,
        "username": "Anhaa",
        "firstname": "Anherdene",
        "lastname": "Bold",
        "password": "dGVzdA==",
        "gender": "male",
        "img": "Anhaa.jpg",
        "created_date": "2019-03-14T18:25:43.511Z"
    }]);
});
it('search post by searchtext', function() {
    expect(posts._searchPost("In computer science, functional programming")).to.include.deep.members([{
        "id": 11,
        "content": "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
        "created_date": "2019-03-14T18:25:43.511Z",
        "user_id": 2
    }]);
});

it('list friends post', function() {
    expect(posts._listFriendPost(1)).to.include.deep.members([{
        "content": "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
        "created_date": "2019-03-14T18:25:43.511Z",
        "id": 11,
        "user_id": 2
    },{
        "content": "Programming in a functional style can also be accomplished in languages that are not specifically designed for functional programming.",
        "created_date": "2019-03-16T18:55:43.511Z",
        "id": 21,
        "user_id": 3
    }]);
});