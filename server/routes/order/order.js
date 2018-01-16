var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');


//订单列表
router.post('/order/list',async (ctx,next)=> {

    let type = ctx.request.body.site;
    let $pageshow= parseInt(ctx.request.body.pageCount);
    let keyword =ctx.request.body.keyword;
    let status = ctx.request.body.status;
    let nub = parseInt(ctx.request.body.nub);


    if($pageshow==''||nub==''){

        ctx.body ={
            code:500,
            msg:'pageCount和nub为必填参数'
        }
        return
    }
    if(!nub){
        nub=1;
    }
    nub = (nub-1) * $pageshow;
    let sql = `select a.* ,b.phone ,b.name  from myoder a ,users b `;

    sql+=`where a.userid=b.id`;
    if(keyword){
        sql+= `or phone like '%${keyword}%'`;
    }
    sql+= ` order by a.id desc limit ${nub},${$pageshow} `;

    let sql1 =`select count(id) from myoder`;

    let result={
        code:200,
        list:[],
        totalElement:0
    };

    try{
        result.list=  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        let obj =  await  sequelize.query(sql1, {type: sequelize.QueryTypes.SELECT});
        result.totalElement =  obj[0]['count(id)']
    }catch (err){
        console.log(err);
    }
    ctx.body = result;

});

router.get('/orderList', async (ctx, next) => {
    let id =  ctx.query.id;


    let json ={
        orderlist:[],
        code:200,
    };
    let sql = `SELECT  * from myoder WHERE userid=${id}`;  //查询用户的所有订单

    try {
        let order = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});

        if(order.length!=0){
            let arr=[];
            order.forEach(i=>{

                arr.push(i.id);
                let obj = {
                    id: i.id,
                    total_price: i.total_price,
                    status: i.status,
                    create_time: i.create_time,
                    list: []
                };

                json.orderlist.push(obj);
            });

            for(let j=0;j<arr.length;j++){  //每一个订单中的商品 一个id对应一个商品

                let sql = `select * from order_details where order_id = ${arr[j]}`;
                let product = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});


                for(let i=0;i<product.length;i++){
                    // product[i].product_id
                    let sql2 = `select  a.name,a.price,a.site,a.imgScr,a.grading from goods a where id = ${product[i].product_id}`;

                    let order_info = await  sequelize.query(sql2,{ type: sequelize.QueryTypes.SELECT});

                    let pss =   Object.assign(product[i], order_info[0]);

                    json.orderlist[j].list.push(pss);
                }





                // console.log('-------');
                //   console.log(pss);


            }

        }
    }catch (err){
        console.log(err);
    }

    ctx.body = json;

    // // // 判断是否登陆
    // if (ctx.session.user) {
    //
    // }
    // else{
    //     ctx.body = {
    //         code:-1,
    //         status: '您没有登陆',
    //     }
    // }
});

router.post('/orderList/del', async (ctx, next) => {
    let id =  ctx.request.body.id;


    let sql2 = `delete  FROM  myoder WHERE id in(`;
    for(let i=0;i<id.length;i++){
        sql2+= `${id[i]},`
    };
    let str =  sql2.substring(0,sql2.lastIndexOf(','))+')';
    console.log(str);
    //查询用户的每条订单
    await  sequelize.query(str, {type: sequelize.QueryTypes.DELETE}).then(data=>{

        if (ctx.session.user) {
            ctx.body = {
                code: 1,
                msg: "删除成功",
            }
        }else {
            ctx.body = {
                code: -1,
                msg: "请登录",
            }
        }
    })
});

router.post('/order/purchase', async (ctx, next) => {

    let user_id =  ctx.request.body.info.user_id;
    let goods =  ctx.request.body.info.goods;
    let total_price =  ctx.request.body.info.total_price;
    // console.log(total_price);
    let sql = `insert into myoder(create_time,userid,total_price,address,status) values (now(),${user_id},${total_price},'北京','A')`;
    let re = await  sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
    let maxId;
    if(re){
        let sql1 = `select max(id) from myoder`;
        maxId = await  sequelize.query(sql1, {type: sequelize.QueryTypes.SELECT});
    }
    let  order_id =  maxId[0]['max(id)'];
    let res;
    for(let i=0;i<goods.length;i++){
        let sql1 = `insert into order_details (product_id,order_id,count) values(${goods[i].good_id},${order_id},${goods[i].count}) `;

        res = await  sequelize.query(sql1, {type: sequelize.QueryTypes.INSERT});
    }
    if(res){
        if (ctx.session.user) {
            ctx.body = {
                code: 1,
                msg:'添加成功',
            }
        }else {
            ctx.body = {
                code: -1,
                msg: "请登录",
            }
        }
    }
});

router.get('/search', async (ctx, next) => {

    let keyword =  ctx.request.query.keyword;
    let price =  ctx.request.query.price; // DESC  // asc
    let nub = parseInt(ctx.request.query.nub);

    if(!nub){
        nub=1;
    }
    let $pageshow = 4;
    nub = (nub-1) * $pageshow;
    if(keyword){
        let sql= '%'+keyword+'%';
        keyword =sql;
    }
    let sql = `select * from goods where name like '${keyword}'`;
    if(price){
        sql+=` order by price ${price}`
    }
    sql+=` LIMIT ${nub},4`;

    let re=null;

    try {

        re = await  sequelize.query(sql, {type: sequelize.QueryTypes
            .SELECT});
    }catch (err){
        re=err;

    }
    ctx.body = {
        code: 1,
        list: re,
    }


});


module.exports = router;