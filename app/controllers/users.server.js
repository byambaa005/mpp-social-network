const R = require('ramda');
const fs = require('fs');

let rawData = fs.readFileSync('./dist/data.json');
let dummyData = JSON.parse(rawData);
let users = dummyData['users'];
let userRelations = dummyData['user_relations'];


// equals username function
const eqByUsername = (username)=> R.propEq('username', username);
// equals username function
const eqByUserEmail = (email)=> R.propEq('email', email);
// equals to user_id
const eqByUserId = (id)=>  R.propEq('user_id', id);

// equals to user_id
const eqByRelationUserId = (id)=>  R.propEq('related_user_id', id);

// equals to id
const eqById = (id)=>  R.propEq('id', id);
// equals friends function
const eqByFriends = ()=> R.propEq('relation_type', 1);

// equals friends function
const eqByFollow = ()=> R.propEq('relation_type', 2);


// filtering by user id function
const filterFriendUserId =(data) => R.filter(eqByFriends,data);

// filtering by user id function
const filterFollowerUserId =(data) => R.filter(eqByFollow,data);

// filtering by user id function
const filterUserId =(id,data) => R.filter(eqByUserId(id),data);

// filtering by user id function
const filterRalationUserId =(id,data) => R.filter(eqByRelationUserId(id),data);

// find by username
const findByUsername = (username,data)=> R.find(eqByUsername(username),data);

// find by userId
const findByUserId = (id,data)=> R.find(eqById(id),data);

// find by username
const findByUserEmail = (email,data)=> R.find(eqByUserEmail(email),data);
// adding post to posts function
const addToUsers = (user ,users) =>R.append(user ,users);
// password encryption function
const encPass = (password) =>Buffer.from(password).toString('ascii');

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
        let password = encPass(req.body.password);
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

/**
 * Sign up new user
 */
exports.signup = function(req, res) {
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
    exports._signup(req.body);
    res.status(200).send({
        message: 'User is successfully signed up.'
    });
};

/**
 * Sign up new user
 */
exports._signup = function(userRaw) {
    let curDate = new Date();
    const newUser = {
        id: users.length + 1,
        username: userRaw.username,
        passsord: userRaw.password,
        firstname: userRaw.firstname,
        lastname: userRaw.lastname,
        created_date: curDate.toJSON()
    };
    users = addToUsers(newUser ,users);
    return users;

};


/**
 * Sign up new user
 */
exports.listFriends = function(req, res) {
    let relationfs =exports._listFriends(parseInt(req.param.userId));
    let userFros = [];
    for (let i = 0; i < relationfs.length-1; i++) {
        userFros.push(findByUserId(relationfs[i],users));
    }
    res.send(userFros)

};

/**
 * Sign up new user
 */
exports.listFollowers = function(req, res) {
    let relationfs =exports._listFollowers(parseInt(req.param.userId));
    let userFros = [];
    for (let i = 0; i < relationfs.length-1; i++) {
        userFros.push(findByUserId(relationfs[i],users));
    }
    res.send(userFros)

};
/**
 * Sign up new user
 */
exports._listFriends = function(userId) {
    let relations =R.union(R.map((o) => o.related_user_id,filterFriendUserId(filterUserId(userId,userRelations))),R.map((o) => o.user_id,filterFriendUserId(filterRalationUserId(userId,userRelations))));
    return relations;

};
/**
 * Sign up new user
 */
exports._listFollowers = function(userId) {
    let relations =R.map((o) => o.related_user_id,filterFollowerUserId(filterUserId(userId,userRelations)));
    return relations;

};