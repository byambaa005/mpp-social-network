const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);

const users = dummyData['users'];

/**
 * List of Posts
 */
exports.auth = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username or password empty!"
        })
    }

    //finding user by username
    let curUser = R.find(R.propEq('username', req.body.username))(users);

    if (curUser) {
        let password = Buffer.from(req.body.password).toString('ascii');
        if (password === req.body.password) {
            return res.status(200).send({
                id: curUser.id,
                message: 'User is logged in.'
            })
        } else {
            return res.status(400).send({
                message: 'Username or password incorrect!'
            });
        }
    } else {
        return res.status(400).send({
            message: 'User not found!'
        });
    }
};