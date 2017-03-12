'use strict';
const models = require('../models');

function processConfirm(token) {
    //decode base64 to get uid
    let uid = (new Buffer(token, 'base64').toString());
    let users = models.users;
    //return result
    return users.activate(uid);
}

exports.process = processConfirm;