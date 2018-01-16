var router=require('koa-router')();

const fs = require('fs');
const  pathlib =require('path');
const util =require('util');

const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

const multer = require('koa-multer');//加载koa-multer模块




//加载配置
var upload = multer({ storage: storage });
//路由

//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})



//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null,resolve('public/app/images'));
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        // console.log(file);
        cb(null,Date.now() +Math.floor(Math.random()*5)+ "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer(
    {
        storage: storage,
        limits:5,
    }
    );

function resolve(dir) {
    return pathlib.join(__dirname, '../../', dir)
}



function insertImg(ctx,id){
    console.log(ctx.request.file);
    if(ctx.request.file){

        let len = ctx.request.file;
        let obj={
            name:'',
            type:'',
            originalname:'',
            path:'',
            size:''
        };
       let bl;
        // for(let i=0;i<len.length;i++){
         //console.log(len[i]);

            let name = len.filename;
            obj.name = len.filename;
            obj.type= len.mimetype;
            obj.originalname= len.originalname;
            obj.path =ctx.req.origin+ '/images/'+name;
         //   obj.size = len[i].file.size;
             bl =` '${obj.name}','${obj.path }','${id}',NOW(),'90876','${obj.type}'`;
        // }

        let sql= `insert into images (images_name,images_path,goods,created_time,images_size,file_type) values (${bl} )`;

        return sql
    }else{
      return ''
    }
    // let type = ctx.req.file.mimetype;
    // let originalname= ctx.req.file.originalname;
    // let d = new Date();
    // // let time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
    // let name = ctx.req.file.filename;
    //
    // let path =ctx.origin+ '/images/'+name;
    // let size = ctx.req.file.size;


}

function uploadImage(ctx){
   console.log(ctx.req.file);
    if(ctx.req.file){
        let len = ctx.req.file;
        let obj={
            name:'',
            type:'',
            originalname:'',
            path:'',
            size:''
        };
        let bl;

        let name = len.filename;
        obj.name = len.filename;
        obj.type= len.mimetype;
        obj.originalname= len.originalname;
        obj.path =ctx.request.origin+ '/images/'+name;
        //   obj.size = len[i].file.size;
        bl =` '${obj.name}','${obj.path }',NOW(),'90876','${obj.type}'`;
        // }

        let sql= `insert into images (images_name,images_path,created_time,images_size,file_type) values (${bl} )`;

        return sql
    }else{
        return ''
    }
    // let type = ctx.req.file.mimetype;
    // let originalname= ctx.req.file.originalname;
    // let d = new Date();
    // // let time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
    // let name = ctx.req.file.filename;
    //
    // let path =ctx.origin+ '/images/'+name;
    // let size = ctx.req.file.size;


}

//上传
router.post('/upload', upload.single('file'), async (ctx, next) => {

    //console.log(ctx.req.body)

    let goods_id=ctx.req.body.goods_id;


    let is_cover =ctx.req.body.is_cover;//是否为封面
    let title=ctx.req.body.title;

    // console.log(ctx.req.file);
    let str =ctx.req.file.destination;
    let type = ctx.req.file.mimetype;
    let originalname= ctx.req.file.originalname;
    let d = new Date();
    // let time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
    let name = ctx.req.file.filename;
    let path =ctx.origin+ '/images/'+name;
    let size = ctx.req.file.size;
    //console.log(ctx.req.file);
    if(!goods_id){
        ctx.body = {
            code:500,
            msg:'商品id不能为空'
        };
        return
    }
    if(!is_cover){
        ctx.body = {
            code:500,
            msg:'is_cover为必传参数'
        };
        return
    }
    let bl =` '${originalname}','${path}','${goods_id}','${is_cover}',now(),${size},'${type}'`;
    let sql= `insert into images (images_name,images_path,goods,is_cover,created_time,images_size,file_type) values (${bl} )`;

    let result = '';

    try {
        result =  await  sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
    }catch (err){
        console.log(err)
    }
    if(result){
        ctx.body = {
            code:200,
            msg:'上传成功',
            info:result
        }
    }else{
        ctx.body = {
            code:500,
            msg:'上传失败'
        }
    }

});
//更新
router.post('/uploadImage',upload.single('file'),async (ctx,next)=>{

    let sql = uploadImage(ctx);

    let json={
        code:200,
        result:'',
        msg:'上传成功'
    }
    try {
        if(sql) {
            json.result = await  sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
        }
        json.result= json.result[0];
        ctx.body=json;
         return
    }catch (err){
        ctx.status=500
    }
    ctx.body={
        code:500,
        msg:'失败'
    }


});

//添加产品 ，更新图片
router.post('/product/add',async (ctx,next)=>{

    let obj={
        name:'',
        price:'',
        site:'',
        grading:'',
        category:[],
        sort:'',
        imagesList:[],
    };
   console.log(ctx.request.body);

    if(ctx.request.body){

        obj.name =  ctx.request.body.name;
        obj.price =  ctx.request.body.price;
        obj.site =  ctx.request.body.site;
        obj.grading =  ctx.request.body.grading;
        obj.category =  ctx.request.body.category;
        obj.sort =  ctx.request.body.sort;
        obj.imagesList=ctx.request.body.imagesList;

        if(ctx.request.body.imagesList.length==0){
            ctx.body ={
                code:500,
                msg:'图片最少需要上传一张！'
            };
            return
        }
        for(let item in obj){
            if(obj[item] ==undefined||obj[item]==''){
                obj[item]=null;
            }else{
                obj[item]=`'${obj[item]}'`
            }
        }
       if(obj.category.substring(1,obj.category.length-1).indexOf(',')==-1){
           obj.category= obj.category.substring(1,obj.category.length-1)
       }else{
           obj.category= obj.category.charAt( obj.category.length-2);
       }
        if(!obj.name||!obj.price){
            ctx.body ={
                code:500,
                msg:'name，price，src为必填'
            };
        }

        let str = `${obj.name},${obj.price},${obj.site},NOW(),${obj.grading},${obj.category},${obj.sort}`;

        let sql1 =`insert into goods (name,price,site,created_at,grading,category,sort)
        values( ${str} )
    `;


        let res = {
            code:200,
            msg:''
        };
        let id =0;
        try{
            res.msg =  await  sequelize.query(sql1, {type: sequelize.QueryTypes.INSERT});

            if(res.msg){
                id  =res.msg[0];
            }

            let updatasql='';
            let len =ctx.request.body.imagesList;
            let str = ctx.request.body.imagesList.join(',');
            for(let i=0;i<len.length;i++){
                updatasql+=` WHEN ${len[i]} THEN ${id} `
            }
            let sql2 = `
                    UPDATE images 
                        SET goods = CASE image_id 
                            ${updatasql}
                        END
                    WHERE image_id IN (${str})
            `;

            if(sql2){
                res.msg =  await  sequelize.query(sql2, {type: sequelize.QueryTypes.UPDATE});
               if( res.msg[1]>0){
                   ctx.body = {
                       code:200,
                       msg:'新增成功'
                   }
               }
            }



        }catch (err){
            ctx.status=500;
            ctx.body = {
                msg:'404'
            };
            console.log(err);
        }


    }else{
        ctx.body={
            msg:'未传参数',
            code:500
        }
    }








});


module.exports = router;
