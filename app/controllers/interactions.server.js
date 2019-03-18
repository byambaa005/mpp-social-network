const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const comments = dummyData['post_comments'];

const isFilter = n=>n
// func user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// func user_id
const eqByPostId = (id)=>  R.propEq('post_id', id);

// func user_id
const filterByPostId =(id,data) => R.filter(eqByUserId(id),data)

const filterByPostId =(id,data) => R.filter(eqByPostId(id),data)

/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {

    // const cs = comments.map(c => ({
    //     id: c.id,
    //     comment: c.comment,
    //     created_date: c.created_date,
    //     user_id: c.user_id,
    //     post_id: c.post_id
    // }));
    const cs = filterByPostId(req.post_id,comments );
    res.send(cs);
};