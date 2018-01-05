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
var upload = multer({ storage: storage });

function resolve(dir) {
    return pathlib.join(__dirname, '../../', dir)
}

router.post('/upload', upload.single('file'), async (ctx, next) => {

    let goods_id=ctx.req.body.goods_id;
    let is_cover =ctx.req.body.is_cover;//是否为封面
    let title=ctx.req.body.title;

    // console.log(ctx.req.file.originalname);
    let str =ctx.req.file.destination;
    let type = ctx.req.file.mimetype;
    let originalname= ctx.req.file.originalname;
    let d = new Date();
    let time = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
    let name = ctx.req.file.filename;
    let path =ctx.origin+ '/images/'+name;
    let size = ctx.req.file.size;
    console.log(ctx.req.file);
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
    let bl =` '${originalname}','${path}','${goods_id}','${is_cover}','${time}',${size},'${type}'`;
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


router.post('/product/add',upload.single('file'),async (ctx,next)=>{

    let obj={
        name:'',
        price:'',
        site:'',
        src:'',
        grading:'',
        category:'',
        salesVolume:'',
        sort:'',
    };

    obj.name =  ctx.request.body.name;
    obj.price =  ctx.request.body.price;
    obj.site =  ctx.request.body.site;
    obj.src =  ctx.request.body.src;
    obj.salesVolume =  ctx.request.body.salesVolume;
    obj.grading =  ctx.request.body.grading;
    obj.category =  ctx.request.body.category;
    obj.sort =  ctx.request.body.sort;


    for(let item in obj){
        if(obj[item] ==undefined||obj[item]==''){
            obj[item]=null;
        }else{
            obj[item]=`'${obj[item]}'`
        }
    }
    console.log(ctx.request.file);

    if(!obj.name||!obj.price||!obj.src){
        ctx.body ={
            code:500,
            msg:'name，price，src为必填'
        };
    }
    let str = `${obj.name},${obj.price},${obj.site},${obj.src},${obj.salesVolume},NOW(),${obj.grading},${obj.category},${obj.sort}`;

    let sql1 =`insert into goods (name,price,site,imgScr,salesVolume,created_at,grading,category,sort)
        values( ${str} )
    `;
    let res = {
       code:200,
        msg:''
    };
    try{
        res.msg =  await  sequelize.query(sql1, {type: sequelize.QueryTypes.INSERT});

        console.log(msg);

    }catch (err){
        console.log(err);
    }
    if(res.msg[0]==1){
        res.msg='添加成功';
    }
    ctx.body = res;
});


module.exports = router;
