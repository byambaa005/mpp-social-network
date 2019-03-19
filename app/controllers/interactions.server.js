const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let comments = dummyData['post_comments'];

// func user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// func post
const eqByPostId = (id)=>  R.propEq('post_id', id);

// func user_id
const filterByUserId =(id,data) => R.filter(eqByUserId(id),data);

const filterByPostId =(id,data) => R.filter(eqByPostId(id),data);

/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {
    const cs = filterByPostId(parseInt(req.params.postId),comments );
    res.send(cs);
};

exports.filterByPostId = filterByPostId;


exports._createComment = function (postContent,userId) {
    let curDate = new Date();
    const newPost ={
        id: posts.length + 1,
        content:postContent,
        created_date: curDate.toJSON(),
        user_id: parseInt(userId)
    };
    posts = addToPost(newPost,posts);
    return posts;
};

/**
 * Add comment
 */
exports.createComment = function(req, res) {

    if (!req.body) {
        return res.status(400).send({
            message: 'Comment cannot be empty!'
        });
    }
    exports._createComment (req.body,3);
    res.status(200).send();
};

