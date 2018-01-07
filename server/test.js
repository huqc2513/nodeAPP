var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
var fs = require('fs');
var app = new Koa();
app.use(bodyParser());

const multer = require('koa-multer');//加载koa-multer模块
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
        // console.log(file);
        cb(null,Date.now() +Math.floor(Math.random()*5)+ "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), async (ctx, next) => {
    let str =ctx.req.file.destination;
    let name = ctx.req.file.filename;
    let path =ctx.origin+ '/'+str+name;
    // console.log(path);
    ctx.body = {
        filename:path//返回文件名
    }
});

router.get('/', async (ctx, next) => {

    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');

});


app.use(router.routes());
app.listen(3000,function () {
    console.log('33');
});