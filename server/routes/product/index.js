var router=require('koa-router')();

const Sequelize = require('sequelize');

const sequelize = require('../../config/config.js');

const db = require('../../lib/mysql');


const fs = require('fs');
const  pathlib =require('path');
const util =require('util');



const validator = require('validator');


function resolve(dir) {
    return pathlib.join(__dirname, '../../', dir)
}
function remove_image(list) {
    if(!list){
        return false
    }
    let path =  resolve('public/app/images');
    let nub=0;
    for(let i=0;i<list.length;i++){
        let es  = fs.unlinkSync(path+'/'+list[i]);
        if(es==undefined){
            nub++;
        }
    }

    if(nub==list.length){
        return true
    }else {
        false
    }


}


let path ='../../public/app/images/';

function familyTree(arr, pid) {
    var temp = [];
    var forFn = function(arr, pid){
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.id == pid) {
                temp.push(item);

                forFn(arr,item.parent_id);
            }
        }
    };
    forFn(arr, pid);
    return temp;
}

//产品查询
router.post('/product/query',async (ctx,next)=> {
    let type=null;
    //console.log(ctx.request.body.type.length);
    if(ctx.request.body.type){
        console.log(ctx.request.body.type);

         type = parseInt(ctx.request.body.type);

    }
    let $pageshow= parseInt(ctx.request.body.pageCount);
    let keyword =ctx.request.body.keyword;
    let nub = parseInt(ctx.request.body.nub);


    if($pageshow==''||nub==''){
       // console.log('空');
        ctx.body ={
            code:200,
            msg:'pageCount和nub为必填参数'
        };
        return
    }
    if(!nub){
        nub=1;
    }
    nub = (nub-1) * $pageshow;
    let sql = `select a.*, b.c_name ,b.type  from goods a,classify b `;

    sql +=` where b.classify_id = a.category `;
    if(type||type!=null){
        sql+=`AND category='${type}'  `;
    }
    if(keyword){
        sql+= `AND  name like '%${keyword}%'`;
    }

    sql+= ` order by a.id desc limit ${nub},${$pageshow}`;

    let sql1 =`select count(id) as nubmer from goods`;

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

                let  sql2 = `select * from images a where a.goods = ${result.list[i].id}`;
            result.list[i].images= await sequelize.query(sql2, {type: sequelize.QueryTypes.SELECT});
        }


         result.totalElement =  obj[0].nubmer;

    }catch (err){
       console.log(err);
    }
    ctx.body = result;

});

function sonsTree(arr,id){
    let temp = [],lev=0;
    var forFn = function(arr, id,lev){
        for (var i = 0;i < arr.length; i++) {
            let item = arr[i];

            if (item.parent_id==id) {
                item.lev=lev;
                temp.push(item);
                forFn(arr,item.classify_id,lev+1);
            }
        }
    };
    forFn(arr, id,lev);
    return temp;
}

var  test =async function (parent_id) {
    let result={
        list:'',
        arr:[]
    };
    let sql= `select a.* from classify a where parent_id=?`;
    result.list =  await  db.query(sql,parent_id);// db.query为查询这条语句
    if(result.list.length>0){
        for(let i=0;i<result.list.length;i++){
                test(result.list[i].classify_id)
        }
    }
    return result
};

// 分类列表
router.post('/product/classify',async (ctx,next)=> {

    let $pageshow= parseInt(ctx.request.body.page);
    let keyword =ctx.request.body.keyword;
    let nub = parseInt(ctx.request.body.nub);

    if($pageshow==''||nub==''){
        ctx.body ={
            code:200,
            msg:'pageCount和nub为必填参数'
        };
        return
    }
    if(!nub){
        nub=1;
    }
    nub = (nub-1) * $pageshow;
    let sql = `select *  FROM classify where parent_id=0`;
    let sq3 = `select *  FROM classify `;
    if(keyword){
        sql+= `AND  type like '%${keyword}%'`;
    }

    sql+= `  order by classify_id desc limit ${nub},${$pageshow}`;

    let sql1 =`select count(id) as nubmer from goods`;

    let result={
        code:200,
        list:[],
        totalElement:0,
    };

    let images = [];

    try{
        result.list=  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        let obj =  await  sequelize.query(sql1, {type: sequelize.QueryTypes.SELECT});

        let count=  await  sequelize.query(sq3, {type: sequelize.QueryTypes.SELECT});

        result.list.forEach(i=>{
            i.childrenCount=0;
            i.childrenCount=sonsTree(count,i.classify_id).length;

        });
        result.totalElement =  obj[0].nubmer;
    }catch (err){
        console.log(err);
    }
    ctx.body = result;


});

//分类编辑
router.post('/product/classify/edit',async (ctx,next)=> {

       // console.log(ctx.request.body.keyword);
        let   id =      ctx.request.body.id ;
        let   type=     ctx.request.body.type;
        let   introduce = ctx.request.body.introduce;

        if(id==undefined||id==''){
            ctx.body={
                code:500,
                msg:'id为必传'
            }

        }

        if(type==undefined||type==''){
            ctx.body={
                code:500,
                msg:'type参数为空'
            }
        }

        if(introduce==undefined||introduce==''){
            ctx.body={
                code:500,
                msg:'introduce参数为空'
            }
        }


        let query_sum =  `update  classify set type= '${type}',introduce= '${introduce}' where classify_id= ${id} `;

    let json={
        code:200,
        msg:''
    };

    try{

        // json.list =  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        json.msg = await sequelize.query(query_sum, {type: sequelize.QueryTypes.SELECT});

        if(json.msg){
            ctx.body=json
        }

    }catch (err){
        console.log(err);
        ctx.status=500;
    }

});

router.post('/product/classify/add',async(ctx,next)=>{
    let   parent_id =     ctx.request.body.parent_id ;
    let   type=  ctx.request.body.type_name;
    let   introduce = ctx.request.body.introduce;
    if(parent_id==undefined||parent_id==''){
        ctx.body={
            code:500,
            msg:'参数不能为空'
        };
        return
    }
    let sql = ` insert into classify (c_name,parent_id,introduce) values('${type}','${parent_id}',${introduce})`;


});

function analysisTree(data) {
    var map = {};//存储id结点
    data.forEach(function (item) {
        map[item.classify_id] = item;
    });

    var val = [];
    let r=0;
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parent_id];
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            item.value=item.classify_id;
            item.label=item.c_name;
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            item.value=item.classify_id ;
            item.label=item.c_name;
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });

    return val
}

//获取子树
function GetParentArry(id, arry) {
    var newArry = new Array();
    for (var i in arry) {
        if (arry[i].parent_id == id)
            newArry.push(arry[i]);
    }
    return newArry;
}

// 获取分类树结构json
router.get('/classify/getClass',async (ctx,next)=> {
    let sql = `select a.c_name,classify_id,parent_id from classify a`;
    let json;
    try{
        let result =  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        json = analysisTree(result);
    }catch (err){
        console.log(err);
    }
    ctx.body={
        code:200,
        classify:json
    }

});

//获取
router.get('/classify/getClass',async (ctx,next)=> {
    let sql = `select a.c_name,classify_id,parent_id from classify a`;
    let json;
    try{
        let result =  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        json = analysisTree(result);
    }catch (err){
        console.log(err);
    }
    ctx.body={
        code:200,
        classify:json
    }
});

router.get('/classify/meta',async (ctx,next)=> {
    let sql = `select *  from classify`;
    try{
        let result =  await  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        ctx.body={
            code:200,
            list:result
        }
    }catch (err){
        console.log(err);
    }
});


//  查询分类数据
router.get('/classify/query',async (ctx,next)=> {

    let classify_id= ctx.query.id;
    if(classify_id==undefined||classify_id==''){
        ctx.body={
            code:500,
            msg:"id不能为空"
        }
    }else if(validator.isNumeric(classify_id)){
       let sql = `SELECT * FORM goods where category = ${classify_id}`;
    }else{
        ctx.body={
            code:500,
            msg:"id必须为数字"
        }
    }

});

//产品更新
router.post('/product/update',async(ctx,next)=>{

    let category=  ctx.request.body.category;
    let id = ctx.request.body.id;
    let price= parseInt(ctx.request.body.price);
    let name =ctx.request.body.name;
    let site = ctx.request.body.site;

    let sql = `update goods set name='${name}',price=${price},site='${site}' ,category='${category}' where id= ${id}`;
    try{
        let res    =  await  sequelize.query(sql, {type: sequelize.QueryTypes.UPDATE});
        console.log(res);
        if(res[1]==1){
            ctx.body={
                code:200,
                msg:'修改成功'
            }
        }else{
            ctx.body={
                code:500,
                msg:'数据未跟新'
            }
        }
    }catch (err){
            console.log(err);
            ctx.status=404;
    }

});


//删除图片
router.post('/del_image',async (ctx,next)=>{

   // console.log(ctx.request.body);
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

//删除产品
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





    try {
        let result='33';
        //删除商品
        let sql1 = `delete  FROM  goods WHERE id in (${str})`;
        result=   await  sequelize.query(sql1,{ type: sequelize.QueryTypes.DELETE});

            //删除图片
            let sql2 = `select images_path FROM  images WHERE goods in (${str})`;
            let qs =   await  sequelize.query(sql2,{ type: sequelize.QueryTypes.SELECT});
            let imagesList=[];//要删除的图片地址数组
            qs.forEach(i=>{
                let item =i.images_path;
                imagesList.push(item.substring(item.lastIndexOf('/')+1));
            });
            let sql3 = `delete  FROM  images WHERE goods in (${str})`;
            result=   await  sequelize.query(sql3,{ type: sequelize.QueryTypes.DELETE});
            let rs =remove_image(imagesList);
            if(rs){
                ctx.body = {
                    code:1,
                    msg: '删除成功'
                }

            }
        // if(result){
        //

        //
        //     }else{
        //         ctx.body = {
        //             code:500,
        //             msg: '删除失败'
        //         }
        //     }
        //
        //
        //

    }catch (err){
        console.log(err);
    }





});

//获取产品详情
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