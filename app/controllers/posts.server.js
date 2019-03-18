const R = require('ramda');
const fs = require('fs');


let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const posts = dummyData['posts'];
/**
 * List of Posts
 */
exports.list = function(req, res) {
    const qs = posts.map(q => ({
        id: q.id,
        content: q.content,
        created_date: q.created_date,
        user_id: q.user_id
    }));
    res.send(qs);
};

/**
 * Insert new post
 */
exports.create = function (req, res) {
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