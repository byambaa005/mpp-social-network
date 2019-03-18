const R = require('ramda');
const fs = require('fs');


let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const posts = dummyData['posts'];

// func user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

//

const filterUserId =(id,data) => R.filter(eqByUserId(id),data);

/**
 * List of Posts
 */
exports.list = function(req, res) {
    console.log(req.params);
    const qs = filterUserId(req.params.userId,posts);
    // const qs = posts.map(q => ({
    //     id: q.id,
    //     content: q.content,
    //     created_date: q.created_date,
    //     user_id: q.user_id
    // }));
    res.send(qs);
};

/**
 * Insert new post
 */
exports.create = function (req, res) {

    if (!req.body) {
        return res.status(400).send({
            message: 'Post cannot be empty!'
        });
    }
    let curDate = new Date();
    const {content} = req.body;
    const newPost = {
        id: posts.length + 1,
        content,
        created_date: curDate.toJSON(),
        user_id: 1
    };
    posts.push(newPost);
    res.status(200).send();
};