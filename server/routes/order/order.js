var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');



router.post('/order/list',async (ctx,next)=> {
console.log(3);
    let type = ctx.request.body.site;
    let $pageshow= parseInt(ctx.request.body.pageCount);
    let keyword =ctx.request.body.keyword;
    let status = ctx.request.body.status;
    let nub = parseInt(ctx.request.body.nub);

    // let $pageshow =  ctx.request.body.pageCount;

    if($pageshow==''||nub==''){
        console.log('空');
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
    let sql = `select * from myoder `;

    if(keyword){
        sql+= `where phone like '%${keyword}%'`;
    }
    sql+= ` order by id desc limit ${nub},${$pageshow}`;

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

router.get('/product/details',async (ctx,next)=>{

    let goods_id =  ctx.query.goods_id;
    let sql = `select banner_src,banner_sort from banner where goods_id=${goods_id}`;
    let sql2 =`select name from goods where id=${goods_id}`;
    let obj = {
        goods_id:goods_id,
        name:'',
        list:'',
    };
    try{
        obj.list=  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        // console.log('------------------------');
        //  let  name=  await  sequelize.query(sql2, {type: sequelize.QueryTypes.SELECT});
        //console.log(name);
        //  obj.name=name[0]['name'];
    }catch (err){
        console.log(err);
    }
    ctx.body = obj;
});



module.exports = router;