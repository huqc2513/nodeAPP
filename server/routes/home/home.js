var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

// 处理数据库（之前已经写好，在mysql.js）
// var userModel= require('../lib/mysql.js');

// 加密
var md5 = require('md5');


// const shopCart = require('../model/product-cart')(sequelize,Sequelize);
// console.log(3);

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
    // validator.islnt(id);
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

         let sql = `insert into order_details(product_id,order_id,count,type) values (${product_id},${id},${count},${type})`;

          result = await  sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});

       if(result){
            let sql = 'select a.*,b.product_id,b.count from myoder a left join';                        sql+=' order_details b on a.id=b.order_id ';
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
                list:result ,
            };
        }
    }else{
        query_code(ctx);
    }
});

// shopcat
router.get('/shopcat/list', async (ctx, next) =>{
    let id = ctx.query.id;
    if(id==''){
        ctx.body = {
            code: 500,
            msg:'id不能为空'
        };
    }
    let sql =`SELECT a.*,b.* from product_cart a,goods b where a.goodid=b.id and a.uid=${id}`;
    let reuslt=null;
    try{
        reuslt =await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
    }catch (err){
            console.log(err);
    }
    console.log(reuslt);
    if(is_login(ctx)){
        return
    }
    if(reuslt){
        ctx.body = {
            code: 1,
            list:reuslt
        };
    }else{
        query_code(ctx);
    }
});

router.post('/shopcat/add', async (ctx, next) =>{

    let count = ctx.request.body.count;
    let user_id = ctx.request.body.user_id;
    let goods_id =ctx.request.body.goodid;

    let reuslt=null;


        let sql = `insert into product_cart(uid,count,goodid,created_at) values(${user_id},${count},${goods_id},now())`;

        try{
                reuslt =await sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
        }catch (err){
                console.log(err);
        }


    if(is_login(ctx)){
        return
    }
    if(reuslt){
        ctx.body = {
            code: 1,
            list:reuslt
        };
    }else{
        query_code(ctx);
    }

});

router.post('/shopcat/del', async (ctx, next) =>{

    let id = ctx.request.body.id;
    let reuslt=null;
    let sql = `DELETE FROM product_cart where product_cart_id=${id}`;
    try{
        reuslt =await sequelize.query(sql, {type: sequelize.QueryTypes.DELETE});
    }catch (err){
        console.log(err);
    }

    // console.log(reuslt);
    if(is_login(ctx)){
        return
    }
    if(reuslt){
        ctx.body = {
            code: 1,
            list:'删除成功'
        };
    }else{
        query_code(ctx);
    }

});

router.post('/create_order', async (ctx, next) =>{

    let totalPrice = ctx.request.body.totalPrice;
    let goods =ctx.request.body.goods;
    let user_id =ctx.request.body.user_id;

    let json={
        result:'',
        code:500,
    };
    if(!user_id||totalPrice==''){
        ctx.body = {
            code: 500,
            list:'总价格或用户id不能为空'
        };
    }
    if(goods){
        let sql = `insert into myoder (create_time,address,userid,status,total_price)values (now(),'北京',${user_id},'A',${totalPrice})`;
        json.result =await sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
    }else {
        ctx.body = {
            code: 500,
            list:'订单商品不能为空'
        };
    }
    if(json.result){
        // console.log('新政id'+json.result[0]);
        let sql = `insert into order_details(product_id,order_id,count) values`;
        let shopcartId=[];//要删除的购物车id
      //  console.log(goods);
        goods.forEach(i=>{

            shopcartId.push(i.goodid);

            sql+=` (${i.goodid},${json.result[0]},${i.count}),`
        });
        sql = sql.slice(0,-1);
        let rs = await sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});

       if(rs){
           json.code=200;
           let str = shopcartId.join(',');

           let sql = `DELETE FROM product_cart where goodid in (${str}) `;
           let res = await sequelize.query(sql, {type: sequelize.QueryTypes.DELETE});
            console.log(res);
           // if(res){
               json.result='添加成功';
               json.code=200;
               ctx.body = json;
           // }
       }

    }




});

//产品详情
router.get('/goods/details', async (ctx, next) => {
    // console.log(ctx.request.query);
    let id = ctx.request.query.id;


    let sql1 = `SELECT a.username,b.* from users a right JOIN comment b on b.user_id=a.id WHERE  b.goods_ID=${id}`;

    let sql2= `select a.images_path,a.sort,is_cover,a.goods from images a where  a.goods=${id} ORDER BY sort asc`;

    let sql3= `select  * from goods where id= ${id}`;

    let obj = {
        code:200,
        bannerList:'',
        evaluate:'',
        detailsInfo:''
    };
    try{
        obj.detailsInfo = await  sequelize.query(sql3,{ type: sequelize.QueryTypes.SELECT});
        obj.bannerList = await  sequelize.query(sql1,{ type: sequelize.QueryTypes.SELECT});
        obj.evaluate = await  sequelize.query(sql2,{ type: sequelize.QueryTypes.SELECT});//轮播图


        for(let i=0;i<obj.evaluate.length;i++){
                if(obj.evaluate[i].is_cover=='yes'){
                    let str =obj.evaluate[i]
                    obj.evaluate.splice(i,1);
                    obj.evaluate.unshift(str);
                }
        }
        // console.log(obj.evaluate.forEach(i=>{
        //     console.log(i);

        // }));
    }catch (err){
       // console.log(err);
    }

    console.log(obj.evaluate);

        ctx.body = obj;
});

//分类
router.get('/classify', async (ctx, next) => {

    let sql3= `select * from classify`;
    let obj = {
        code:200,
        list:''
    };
    try{
        obj.list = await  sequelize.query(sql3,{ type: sequelize.QueryTypes.SELECT});
    }catch (err){
        console.log(err);
    }

    ctx.body = obj;
});

module.exports = router;

