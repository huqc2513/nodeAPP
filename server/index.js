var Koa=require('koa');
var path=require('path');
var bodyParser = require('koa-bodyparser');
var ejs=require('ejs');
var fs = require('fs');
var session = require('koa-session-minimal');
var MysqlStore = require('koa-mysql-session');
// var config = require('./config/default.js');
var router=require('koa-router')();
var views = require('koa-views')
const config = require('./config/default');
const  serve = require("koa-static");

const cors = require('koa2-cors');


// let compression = require('compression');


const multer = require('koa-multer');//加载koa-multer模块

var app=new Koa()







app.use(cors({
    origin:function(ctx){

        // if (ctx.url === '/login') {
        // return ' http:localhost:8081'; // 允许来自所有域名请求
        return 'http://localhost:8080'
        // }

        //  return '*';

    },
    //Access-Control-Allow-Credentials:true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET','OPTIONS', 'put','POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],

}))








app.use(serve(__dirname+ "/public/app"));




// // session存储配置
const sessionMysqlConfig= {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}

var now = Date.now();





// // 配置session中间件
app.use(session({
        key: 'USER_SID',
        // secret : 'secret',
        // store: new MysqlStore(sessionMysqlConfig),
        cookie: {                   // 与 cookie 相关的配置
            maxAge: 1000 * 60*10,      // cookie 有效时长
            httpOnly: true,         // 是否只用于 http 请求中获取
            overwrite: false        // 是否允许重写
        }
    })
);

// 使用表单解析中间件
app.use(bodyParser());



// // 使用新建的路由文件
app.use(require('./routes/signup.js').routes());
app.use(require('./routes/home/home.js').routes());
//app.use(require('./routes/address/address.js').routes());


//商品模块
app.use(require('./routes/product/index.js').routes());



//商品模块
app.use(require('./routes/order/order.js').routes());


app.use(require('./routes/upload/index.js').routes());










// // 监听在3000端口
app.listen(3006);
console.log(`listening on port 3006`);
