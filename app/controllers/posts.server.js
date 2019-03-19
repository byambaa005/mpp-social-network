const R = require('ramda');
const fs = require('fs');


let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let posts = dummyData['posts'];

// adding post to posts function
const addToPost = (post,posts) =>R.append(post,posts);

// equlas to user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// filtering by user id function
const filterUserId =(id,data) => R.filter(eqByUserId(id),data);

/**
 * List of Posts
 */
exports.list = function(req, res) {
    const qs = filterUserId(parseInt(req.params.userId) ,posts);
    res.send(qs);
};

/**
 * Insert new post
 */
exports.create = function (req, res) {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: 'Post cannot be empty!'
        });
    }
    let curDate = new Date();
    const newPost ={
        id: posts.length + 1,
        content: req.body.content,
        created_date: curDate.toJSON(),
        user_id: req.body.userId
    };

    console.log(newPost);
    posts = addToPost(newPost,posts);
    res.status(200).send();
};