var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

// // 处理数据库（之前已经写好，在mysql.js）
// var userModel= require('../lib/mysql.js');
// 加密
var md5 = require('md5');


// const  User = require('../model/users')(sequelize,Sequelize);


const  Goods = require('../../model/goods')(sequelize,Sequelize);

const shopCart = require('../../model/product-cart')(sequelize,Sequelize);




router.get('/product', async (ctx, next) => {

    // 判断是否登陆
    if (ctx.session.user) {
        let obj = {
            page: parseInt(ctx.query.page)-1,
            pageSize: ctx.query.pageSize,
            sort: ctx.query.sort,
            priceSort: ctx.query.priceSort,
            keywords:ctx.query.keywords,
        };


        let keywrods ='';
        if(obj.keywords!=''&&obj.keywords!=null&&obj.keywords!=undefined){
            keywrods = obj.keywords;
        }
        let result ;
        if(obj.priceSort!=''){
            result = await Goods.findAll({
                where:{
                    'name': {
                        $like: '%'+keywrods+'%',
                    }
                },
                offset:parseInt(obj.page) ,
                limit: parseInt(obj.pageSize),
                order: [
                    ['price', obj.priceSort],
                ]
            });
        }else if(obj.sort!=''){
            result = await Goods.findAll({
                where:{
                    'name': {
                        $like: '%'+keywrods+'%',
                    }
                },
                $like: '%'+keywrods+'%',
                offset:parseInt(obj.page),
                limit: parseInt(obj.pageSize),
                order: [
                    ['salesVolume', obj.sort],
                ]
            });
        }
        ctx.body = {
            code: 1,
            list: result
        };

    }else{
        ctx.body = {
            code:-1,
            status: '您没有登陆',
        }
    }
});

router.get('/getPersonalInfo', async (ctx, next) => {
    let Info = await User.findOne({});
});

router.get('/shoplist', async (ctx, next) => {

    let id = ctx.query.id;
    let sql1 = `SELECT *  from product_cart WHERE uid = ${id}`;
    let sql2= `SELECT * from goods where id IN(SELECT product_cart.goodid  from product_cart WHERE uid = ${id})`;

    let list1 = await  sequelize.query(sql1,{ type: sequelize.QueryTypes.SELECT});
    let list2 = await  sequelize.query(sql2,{ type: sequelize.QueryTypes.SELECT});

    for(let i=0;i<list1.length;i++){
        list2[i].cardId =  list1[i].id;//购物车id
        list2[i].count = list1[i].count;//数量
    }
    ctx.body = {
        code:1,
        list: list2
    }
});

router.post('/shopcart/del', async (ctx, next) => {
    let list = ctx.request.body.id;
    let sql1 = `delete  FROM  product_cart WHERE id in`;
    for(let i=0;i<list.length;i++){
        sql1+=`(${list[i]},)`
    }
    let str =  sql1.substring(0,sql1.lastIndexOf(','))+')';
    await  sequelize.query(str,{ type: sequelize.QueryTypes.DELETE}).then(data=>{
        ctx.body = {
            code:1,
            msg: '删除成功'
        }
    });
});


module.exports = router;
