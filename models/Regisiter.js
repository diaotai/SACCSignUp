// 本文件用于处理用户注册

// 获取mySchemas模块
let Schemas = require ('./mySchemas.js');

//连接数据库
let mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
let db = mongoose.connect('mongodb://localhost/regisiter');
db.connection.on('error',(err)=>{
    console.log("数据库连接失败："+err)
});
db.connection.on("open",()=>{
    console.log("--数据库链接成功--")
});
let Users = Schemas.Users;
mongoose.model('User',Users);
let User = mongoose.model('User');

// 本函数用于向数据库添加新用户的注册信息
function addUser(nerdName, password, email, phoneNumber) {
     // 对email进行判断，如果数据库中已经有该邮箱，则本函数停止
    
    let user = new User();
    let result = {};
    user.nerdName = nerdName;
    user.password = password;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.status = false;
   return user.save().
        then(()=>{
            console.log('The person is saved');
            setTimeout(ensureActived, 86400, email);
           return {'result':'success','uid':user._id.toString()};
        }).catch((err)=>{
            console.log('重复');
            return  {'result':'existed'};
        })
    //设置定时器，若24小时内用户未激活，则调用ensureActived函数
    return {'result':'success','uid':user._id.toString()};
}

// 本函数用于保证若用户未激活，则删除这条信息
function ensureActived(email) {
    User.find({'email':email,'status':false}, (err,users)=>{
        for(let i=0;i<users.length;i++) {
            users[i].remove();
        }
    })
}

// 本函数用于激活时更新状态
function activate(uid) {
    let id = mongoose.Types.ObjectId(uid)
    User.update(
        {_id:id},
        {status:true},
        (err)=> {
            if(err) throw err;
        }
    )
}

exports.addUser = addUser;
exports.activate = activate;
