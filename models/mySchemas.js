//获取mongoose 的Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//用户注册时的Schema,参数分别为nerdName:昵称（可重复）,password：密码，phoneNumber：电话，email：邮箱（作为登陆凭证，不可重复）,status(是否已激活)
let Users = new Schema({
    nerdName: String,
    password: String,
    phoneNumber : String,
    email : { type: String, index: { unique: true}},
    status : Boolean
})


exports.Users = Users;
