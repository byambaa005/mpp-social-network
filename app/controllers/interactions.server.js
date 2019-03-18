const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const comments = dummyData['post_comments'];

const isFilter = n=>n

/**
 * List of Post comments by post Id
 */
exports.comments = function(req, res) {
    // let filterComments = R.find(R.propEq('post_id', req.params.post_id))(comments);
    // const cs = R.filter(filterComments, comments);

    // const data = [
    //     {id: 1, value: 'abs', x: 'ee'},
    //     {id: 2, value: 'ws', x: '21'},
    //     {id: 3, value: 'asd', x: 'as'},
    //     {id: 4, value: 'x', x: 'ee'}
    // ];
    //
    // const customFilter = val => R.filter(R.compose(R.any(R.includes(val)),R.values));

    // console.log(customFilter('a')(data))

    const cs = comments.map(c => ({
        id: c.id,
        comment: c.comment,
        created_date: c.created_date,
        user_id: c.user_id,
        post_id: c.post_id
    }));
    res.send(cs);
};