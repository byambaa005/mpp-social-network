const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let comments = dummyData['post_comments'];
let reactions = dummyData['post_reaction'];
// func user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// func post
const eqByPostId = (id)=>  R.propEq('post_id', id);

// func reaction
const eqByReactionType = (id)=>  R.propEq('reaction_type', id);

// func like
const eqByReactionTypeLike = ()=>  eqByReactionType(1);

// func dislike
const eqByReactionTypeDislike = ()=>  eqByReactionType(2);

// func user_id
const filterByUserId =(id,data) => R.filter(eqByUserId(id),data);

const filterByPostId =(id,data) => R.filter(eqByPostId(id),data);

const filterByPostId =(id,data) => R.filter(eqByPostId(id),data);

const likeByPostId =(id,data) => R.filter(eqByReactionTypeLike,filterByPostId(parseInt(id) ,data )).length;

const dislikeByPostId =(id,data) => R.filter(eqByReactionTypeDislike(),filterByPostId(parseInt(id) ,data )).length;
// adding comment to comments function
const addToComment = (comment,comments) =>R.append(comment,comments);

exports.filterByPostId = filterByPostId;
exports.likeByPostId = likeByPostId;
exports.dislikeByPostId = dislikeByPostId;
/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {
    res.send(filterByPostId(parseInt(req.params.postId) ,comments ));
};
/**
 * List of Post comments by post Id
 */
exports.likeCount = function(req, res) {
    res.send(likeByPostId(parseInt(req.params.postId) ,comments ));
};
/**
 * List of Post comments by post Id
 */
exports.dislikeCount = function(req, res) {
    res.send(dislikeByPostId(parseInt(req.params.postId) ,comments ));
};

exports._createReaction = function (userId,postId, type) {
    let curDate = new Date();
    const newReaction ={
        id: reactions.length + 1,
        reaction_type:type,
        created_date: curDate.toJSON(),
        user_id: parseInt(userId),
        post_id: postId
    };
    reactions = addToComment(newReaction,reactions);
    return reactions;
};

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


/**
 * Add comment
 */
exports.createReaction = function(req, res) {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: 'Comment cannot be empty!'
        });
    }
    // exports._createComment (req.body.content ,req.body.userId, req.body.postId);
    res.status(200).send();
};
