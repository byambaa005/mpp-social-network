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

// adding comment to comments function
const addToComment = (comment,comments) =>R.append(comment,comments);

/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {
    const cs = filterByPostId(parseInt(req.params.postId) ,comments );
    console.log(cs);
    res.send(cs);
};

exports.getComments = () => {
    return comments;
}

exports.filterByPostId = filterByPostId;


exports._createComment = function (commentContent,userId, postId) {
    let curDate = new Date();
    const newComment ={
        id: comments.length + 1,
        content:commentContent,
        created_date: curDate.toJSON(),
        user_id: parseInt(userId),
        post_id: postId
    };
    comments = addToComment(newComment,comments);
    return comments;
};

/**
 * Add comment
 */
exports.createComment = function(req, res) {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: 'Comment cannot be empty!'
        });
    }
    exports._createComment (req.body.content ,req.body.userId, req.body.postId);
    res.status(200).send();
};

