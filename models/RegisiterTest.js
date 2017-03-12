// 本文件为对注册部分对测试文件，由于没安装测试工具，采取手动测试

let Regisiter = require('./Regisiter.js');
let addUser = Regisiter.addUser;
let activate = Regisiter.activate;
let res1= addUser('王化益','111111','2111@qq.com','987654');
let res2= addUser('王玉函','111111','gf44@qq.com','987654');
console.log(res1.then(data=>{
    console.log(data.result);
}))
let id;
res2.then(data=>{
    console.log(data.result+data.uid);
    console.log(typeof(data.uid));
    activate(data.uid);
})
console.log(id);
