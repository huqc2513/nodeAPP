var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

const fs = require('fs');
const  pathlib =require('path');
const util =require('util');


router.post('/product/query',async (ctx,next)=> {
    console.log(ctx.request.body);
    let type = ctx.request.body.type;
    let $pageshow= parseInt(ctx.request.body.pageCount);
    let keyword =ctx.request.body.keyword;
    let nub = parseInt(ctx.request.body.nub);

    // let $pageshow =  ctx.request.body.pageCount;

    if($pageshow==''||nub==''){
        console.log('空');
        ctx.body ={
            code:200,
            msg:'pageCount和nub为必填参数'
        }
        return
    }
    if(!nub){
        nub=1;
    }
    nub = (nub-1) * $pageshow;
    let sql = `select * from goods `;
    if(type){
        sql+=` category='${type}' AND `;
    }
    if(keyword){
        sql+= `where name like '%${keyword}%'`;
    }
    sql+= ` order by id desc limit ${nub},${$pageshow}`;

    let sql1 =`select count(id) from goods`;

    let result={
        code:200,
        list:[],
        totalElement:0,
    };

    let images = [];

    try{
        result.list=  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        let obj =  await  sequelize.query(sql1, {type: sequelize.QueryTypes.SELECT});


        for(let i=0;i<result.list.length;i++){
            // result.list[i].images=[];
                let  sql2 = `select * from images a where a.goods = ${result.list[i].id}`;
            result.list[i].images= await sequelize.query(sql2, {type: sequelize.QueryTypes.SELECT});
        }
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
let path ='../../public/app/images/';

function resolve(dir) {
    return pathlib.join(__dirname, '../../', dir)
}

router.post('/del_image',async (ctx,next)=>{

    console.log(ctx.request.body);
    let id = ctx.request.body.id;
    let name = ctx.request.body.fileName;



    if(id==''||name==''){
        ctx.body={
            code:500,
            msg:'参数缺少'
        }
        return
    }
    let result ;
    try {
        let sql = `DELETE from images  where image_id='${id}'`;
        let result =  await sequelize.query(sql, {type: sequelize.QueryTypes.DELETE});
        let path =  resolve('public/app/images');

        let es  = fs.unlinkSync(path+'/'+name);
        if(es==undefined){
            ctx.body={
                code:200,
                msg:'删除成功'
            };
        }else{
            ctx.body={
                code:500,
                msg:'删除失败'
            };
        }


    }catch (err){
        console.log(err);
    }


   // DELETE FROM table_name [WHERE Clause]


});

router.post('/goods/del', async (ctx, next) => {


    let list = ctx.request.body.id;
     let str =list.join(',');
    if(list.length==0){
        ctx.body = {
            code:500,
            msg: '未传参'
        }
        return
    }
    let sql1 = `delete  FROM  goods WHERE id in (${str})`;

    let result='';
    try {
        result=   await  sequelize.query(sql1,{ type: sequelize.QueryTypes.DELETE})
    }catch (err){
        console.log(err);
    }
    console.log(result);
   if(result==''||result==undefined){
       ctx.body = {
           code:500,
           msg: '没有此商品'
       }

   }else{
       ctx.body = {
           code:1,
           msg: '删除成功'
       }
   }

});


module.exports = router;