var router=require('koa-router')();

const Sequelize = require('sequelize');

const sequelize = require('../../config/config.js');




// // 处理数据库（之前已经写好，在mysql.js）
// var userModel= require('../lib/mysql.js');
// 加密
var md5 = require('md5');

var validator = require('validator');

// console.log();

const  User = require('../../model/users')(sequelize,Sequelize);

const  Goods = require('../../model/goods')(sequelize,Sequelize);

const shopCart = require('../../model/product-cart')(sequelize,Sequelize);

router.post('/admin/login',async (ctx,next)=> {
    let user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.pass,
    };
    let pass =md5(user.pass);

    let sql = `select * from users where name=${user.name}`;
    let json={
        code:200,
        msg:'登陆成功',
        info:{

        }
    };
    try{
        let product = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});


        if(!product){
            ctx.body={
                code:500,
                msg:'账号不存在'
            };
            return
        }else  if(product[0].pass==pass){


            let item = product[0];//存入数据
            let obj = {
                name: item.name,
                phone: item.phone,
                username: item.username,
                header_portrait: item.header_portrait,
                created_at: item.created_at
            };
            obj.id = item.id;

            //  ctx.cookies.set('name', 'frank', { signed: true ,maxAge:7200000});

            ctx.session.admin = {
                obj
            };

            ctx.body={
                code:200,
                msg:'登陆成功',
                info:obj
            };
            return
            console.log( ctx.session.admin );
        }else{
           // console.log( ctx.session.admin );
            ctx.body={
                code:500,
                msg:'密码错误'
            }
        }
    }catch (err){
        ctx.body={
            code:500,
            msg:'服务器繁忙'
        }
    }

});

router.get('/admin/logout',async(ctx,next)=>{
    ctx.session.admi='';
    ctx.body={
        code:200,
        msg:'退出登陆成功'
    }
});

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
    }

    if(validator.isEmpty(ctx.request.body.pass)){
        ctx.body={
            code:500,
            msg:'账号不能为空'
        }
        return
    }
    if(validator.isEmpty(ctx.request.body.name)){
        ctx.body={
            code:500,
            msg:'密码不能为空'
        }
        return
    }

    let pass=md5(user.pass);
    let login=null;
    try {
        let sql =`select name,pass from users where name= ${user.name} `;

        let result = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

     if(result[0].pass==pass){

         let item = result[0];//存入数据
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


         ctx.body={
             code:200,
             msg:'登陆成功'
         }
     }else{
         ctx.body={
             code:500,
             msg:'账号不存在'
         }
     }

    }catch(err){

        ctx.body = {
            code: 0,
            msg: '服务器繁忙',
            // info:err,
        };

    }

    //
    // if (login != null) {
    //
    //
    // }else{
    //     ctx.body={
    //         code:0,
    //         msg:'账号或者密码错误'
    //     };
    // }
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

router.post('/getUserList',async (ctx,next)=>{
    let sql = `select * from users `;
    let sql2= ' select count(id) from users';
    // console.log(ctx.request.body)
        let nub=parseInt(ctx.request.body.nub);

        let pagecurr= parseInt(ctx.request.body.page);
        let keyword = ctx.request.body.keyword;
        if(!nub){
            nub=1;
        }
        if(keyword){
            sql +=`where name like '%${keyword}%' or username like '%${keyword}%' `;
        }
        nub= (nub-1)*pagecurr;
        sql +=`limit ${nub},${pagecurr}`;

    let product;
    let totoal;
    try{
         product = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

        totoal  = await  sequelize.query(sql2,{ type: sequelize.QueryTypes.SELECT});

        totoal  =totoal[0]['count(id)'];
        console.log(totoal)
    }catch (err){
        console.log(err);
        ctx.status=500;
        ctx.body = {
            code: 500,
            msg:'错误'
        };
        return
    }
    ctx.body = {
        code: 200,
        list: product,
        totalElement:totoal
    };

});


module.exports = router;

