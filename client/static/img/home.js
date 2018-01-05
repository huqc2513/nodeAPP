var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

// 处理数据库（之前已经写好，在mysql.js）
// var userModel= require('../lib/mysql.js');

// 加密
var md5 = require('md5');


// const shopCart = require('../model/product-cart')(sequelize,Sequelize);
// console.log(3);
router.get('/home/getbanner', async (ctx, next) => {
    let str = `SELECT * FROM advertising ORDER BY sort desc `;

    let result = await  sequelize.query(str, {type: sequelize.QueryTypes.SELECT});

    if (ctx.session.user) {
        ctx.body = {
            code: 1,
            list:result
        }
    }else{
        ctx.body = {
            code: -1,
            msg: "未登陆",
        }
    }

});

router.get('/home/getNewGoods', async (ctx, next) => {
    let id = parseInt(ctx.query.id);
    let str = `select goods.* from goods WHERE is_new_product = 'yes' ORDER BY sort desc`;

    let result=null;
    try {
        result = await  sequelize.query(str, {type: sequelize.QueryTypes.SELECT});

    }catch (err){

        if(result==null){
            ctx.body = {
                code: 3,
                msg: "服务器繁忙",
            };
            return
        }
    }
        for(let i=0;i<result.length;i++){
        let str = `SELECT * from collect WHERE goods_id = ${result[i].id} AND user_id= ${id}`;
        let res = await  sequelize.query(str, {type: sequelize.QueryTypes.SELECT});

        if(res[0]!=undefined){

            result[i].is_enshrine = true;
        }else{
            result[i].is_enshrine = false;
        }
    }

        ctx.body = {
            code: 1,
            list:result
        }

});


router.get('/home/getHot', async (ctx, next) => {
    let id = ctx.query.id;

    let str = `select goods.* from goods WHERE is_huot = 'yes' ORDER BY sort desc`;
    let res=null;
   try{
        res = await  sequelize.query(str, {type: sequelize.QueryTypes.SELECT});
   }catch(err){
        if(res==null){

            ctx.body = {
                code: 2,
                msg:res
            };
            return
        }
   }

    ctx.body = {
        code: 1,
        list:res
    };


});


function is_login(ctx) {
    if (!ctx.session.user) {
        ctx.body = {
            code: -1,
            msg: "请登录",
        };
        return  true;
    }
}
function query_code(ctx) {
    ctx.body = {
        code: -2,
        type: "查询参数有误",
    };
    return  true;
}

router.post('/orderList/add', async (ctx, next) =>{
    let user_id= ctx.request.body.user_id;
    let product_id =  ctx.request.body.id;
    let type =  ctx.request.body.type;
    let count =  ctx.request.body.count;
    let address =  ctx.request.body.address;

    let total_price =ctx.request.body.price;


    let sql2= `insert into myoder(create_time,total_price,userid,status,address) values(now(),${total_price},${user_id},'A','${address}')`;

    let result=null;
   // let id = null;
    let  re= null;
    try{
         re = await  sequelize.query(sql2, {type: sequelize.QueryTypes.INSERT});

        let id = re[0];

         let sql = `insert into order_details(product_id,order_id,count,product_type) values (${product_id},${id},${count},${type})`;

          result = await  sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});

       if(result){
            let sql = 'select a.*,b.product_id,b.count from myoder a left join';                        sql+=' order_details b on a.id=b.order_id';
            result = await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
       }

    }
    catch (err){
        console.log(err);
    }
    if(result!=null){
        if(is_login(ctx)){
         return
        }else{
            ctx.body = {
                code: 1,
                msg:result ,
            };
        }
    }else{
        query_code(ctx);
    }
});


module.exports = router;

