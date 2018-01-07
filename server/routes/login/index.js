var router=require('koa-router')();

const Sequelize = require('sequelize');

const sequelize = require('../../config/config.js');

// // 处理数据库（之前已经写好，在mysql.js）
// var userModel= require('../lib/mysql.js');
// 加密
var md5 = require('md5');



const  User = require('../../model/users')(sequelize,Sequelize);

const  Goods = require('../../model/goods')(sequelize,Sequelize);

const shopCart = require('../../model/product-cart')(sequelize,Sequelize);





router.post('/register',async (ctx,next)=> {
    let user={
        name:ctx.request.body.name,
        pass:ctx.request.body.pass,
        repeatpass:ctx.request.body.repeatpass,
        phone:ctx.request.body.phone,
        userName:ctx.request.body.username,
    };
    if (user.pass!==user.repeatpass || user.pass=='') {
        ctx.body={
            data:3,
            msg:'两次输入的密码不一致'
        };
        return
    }
    let register =  await User.findAll({
        where:{
            name:user.name
        }
    });
    if(register!=null){
        ctx.body={
            code:2,
            msg:'用户已存在'
        }
    }else {
        let res = await User.create({
            name: user.name,
            pass: md5(user.pass),
            phone: user.phone,
            username: user.username,
        });

    }
});
router.post('/login',async (ctx,next)=> {
    let user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.pass,
    };

    let login=null;
    try {
        login = await User.findAll({
            where: {
                name: user.name,
                pass: md5(user.pass)
            }
        });
    }catch(err){

        ctx.body = {
            code: 0,
            msg: '错误',
            info:err,
        };
        return
    }


    if (login != null) {
        let item = login[0];//存入数据
        let obj = {
            name: item.name,
            phone: item.phone,
            username: item.username,
            header_portrait: item.header_portrait,
            created_at: item.created_at
        };
        obj.id = item.id;

        //  ctx.cookies.set('name', 'frank', { signed: true ,maxAge:7200000});

        ctx.session.user = {
            obj
        };

        ctx.body = {
            code: 1,
            msg: '登陆成功',
            info: obj,
        };


    }else{
        ctx.body={
            code:0,
            msg:'账号或者密码错误'
        };
    }
});













// 注销
router.get('/logout', ctx => {

    try{
        ctx.session = null;
    }catch (err){
        if(ctx.session!=null){

            ctx.body = {
                code: -1,
                msg: "请登录",
            }
        }
    }


    ctx.body = {
        code: -1,
        msg: "请登录",
    }
})


module.exports = router;

