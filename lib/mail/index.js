'use strict';
const nodemailer = require('nodemailer');
const setting = require('./setting.json');

// load tansport setting from setting.json

let transporter = nodemailer.createTransport(setting);

exports.send = function (address, subject, text, html) {
    let mailOptitons = {
        from: '"noreply@nuptsacc.com" <'+setting['auth']['user']+'>',
        to: address,
        subject: subject,
        text: text,
        html: html
    }
    transporter.sendMail(mailOptitons, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message "'+subject+'" has been sent to '+address+'.');
    });
}