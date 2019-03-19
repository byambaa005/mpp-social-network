const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let users = dummyData['users'];

// equals username function
const eqByUsername = (username)=> R.propEq('username', username);
// equals username function
const eqByUserEmail = (email)=> R.propEq('email', email);
// find by username
const findByUsername = (username,data)=> R.find(eqByUsername(username),data);
// find by username
const findByUserEmail = (email,data)=> R.find(eqByUserEmail(email),data);
/**
 * Login user
 */
exports.auth = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username or password empty!"
        })
    }

    //finding user by username
    let curUser = findByUsername(req.body.username,users);

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


// adding post to posts function
const addToUsers = (user ,users) =>R.append(user ,users);

/**
 * Sign up new user
 */
exports.signup = function(req, res) {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).send({
            message: "User data incomplete!"
        })
    }

    if (findByUsername(req.body.username ,users)) {
        return res.status(400).send({
            message: 'Choose a different username!'
        });
    }

    if (findByUserEmail(req.body.email ,users)) {
        return res.status(400).send({
            message: 'User with a same email address exists!'
        });
    }

    let curDate = new Date();
    const newUser = {
        id: users.length + 1,
        username: req.body.username,
        passsord: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        created_date: curDate.toJSON()
    };

    users = addToUsers(newUser ,users);
    res.status(200).send({
        message: 'User is successfully signed up.'
    });

};