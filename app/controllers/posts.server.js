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