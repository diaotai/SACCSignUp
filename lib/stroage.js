let mongoose = require('mongoose');
let db = mongoose.connect('mongodb://localhost/tasks')
db.connection.on('error',(err)=>{
    console.log("数据库连接失败："+err)
});
db.connection.on("open",()=>{
    console.log("--数据库链接成功--")
})
let Schema = mongoose.Schema;
let Persons = new Schema({
    userName: String,
    password: String,
    phoneNumber : String
})
mongoose.model('Person',Persons);

export default function save(userName,password,phoneNumber) {
    let Person = mongoose.model('Person');
    let person = new Person();
    person.userName = userName;
    person.password = password;
    person.phoneNumber = phoneNumber;
    person.save((err)=>{
        if (err) throw err;
        console.log('The person is saved');
    });
}

