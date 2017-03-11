'use strict';
const models = require('../models');
const mail = require('../lib/mail');

//let users = models.users;
let host = 'https://localhost';

function processRegister(username, password, email, phone) {
    //process invalid info
    if (!username || !password || !email || !phone) {
        return 'Infomation Missing.';
    }
    if (username.length > 20) {
        return 'Username too Long.';
    }
    if (password.length < 8) {
        return 'Password too short';
    }
    if (!email.match(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/)) {
        return 'Email invalid.';
    }
    if (!phone.match(/0?(13|14|15|18)[0-9]{9}/)) {
        return 'Phone number invalid.'
    }
    
    let users = models.users;
    let addResult = users.addUser(username, password, email, phone, status);
    if (addResult['result'] !== 'success') {
        return addResult['result'];
    } else {
        let uid = addResult['uid'];
        //encode uid to base64
        let confirmUrl = host + "/confirm/" + (new Buffer(uid).toString('base64'));
        //send confirm email
        mail.send(email,
            '请确认您的账户',
            `
欢迎来到南邮计软院科协。
请确认您的账户（请在30分钟内确认）：
${confirmUrl}
        `,
            `
<center>
    <table cellpadding="0" cellspacing="0" class="email-container" align="center" width="550" style="font-family: Lato, Lucida Sans, Lucida Grande, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: normal; line-height: 22px; color: #444444; text-align: left; border: 1px solid rgb(177, 213, 245); border-top-left-radius: 4px; border-top-right-radius: 4px; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; width: 550px;">
        <tbody>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" class="padding" width="100%" style="padding-left: 40px; padding-right: 40px; padding-top: 30px; padding-bottom: 35px;">
                        <tbody>
                            <tr class="header">
                                <td align="center">
                                    <h1 style="font-size: 24px; line-height: 1.3em; margin-bottom: 5px;">欢迎来到南邮计软院科协</h1>
                                </td>
                            </tr>
                            <tr class="content">
                                <td align="center">
                                    <p style="font-size: 15px; font-weight: normal; line-height: 22px;">点击下面的按钮确认电子邮地址。（请在30分钟内确认）</p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <table cellpadding="12" border="0" style="font-family: Lato, Lucida Sans, Lucida Grande, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 25px; color: #444444; text-align: left;">
                                        <tbody>
                                            <tr>
                                                <td class="button" style="color: rgb(255, 255, 255); font-size: 16px; line-height: 24px; text-align: center; display: block;">
                                                    <a href="${confirmUrl}" style="color: rgb(255, 255, 255); text-align: center; display: block; padding: 12px 20px; height: 100%; border-top-left-radius: 4px; border-top-right-radius: 4px; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; text-decoration: none; background-color: rgb(43, 136, 217); min-width: 150px;"><strong>确认帐户</strong></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <table border="0" cellpadding="0" cellspacing="0" align="center" class="footer" style="max-width: 550px; font-family: Lato, Lucida Sans, Lucida Grande, SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 22px; color: #444444; text-align: left; padding: 20px 0; font-weight: normal;">
        <tbody>
            <tr>
                <td align="center" style="text-align: center; font-size: 12px; line-height: 18px; color: rgb(163, 163, 163); padding: 5px 0px;">
                    <p>计算机的世界只有0和1，我们很单纯，但我们不简单。加入我们，一切从Hello World开始。</p>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; font-weight: normal; font-size: 12px; line-height: 18px; color: rgb(163, 163, 163); padding: 5px 0px;">
                    <p>&#xA9; 2017 <a name="footer_copyright" href="#" style="color: rgb(43, 136, 217); text-decoration: underline;">NUPT SACC</a></p>
                </td>
            </tr>
        </tbody>
    </table>
</center>
        `
        );
        return 'success';
    }
}

exports.process = processRegister;