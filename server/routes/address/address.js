// var router=require('koa-router')();
//
// const Sequelize = require('sequelize');
// const sequelize = require('../../config/config.js');
//
// // 处理数据库（之前已经写好，在mysql.js）
//
// router.get('/address', async (ctx, next) => {
//     let id = parseInt(ctx.query.id);
//     // select * from  test1 a left join test2 b on a.id=b.id
//     let str = `SELECT * FROM order_site where user_id =${id}`;
//     let result = await  sequelize.query(str, {type: sequelize.QueryTypes.SELECT});
//     let sql1 = `SELECT users.name FROM users where id =${id}`;
//     let name = await  sequelize.query(sql1, {type: sequelize.QueryTypes.SELECT});
//
//     for(let i=0;i<result.length;i++){
//         result[i].user_name = name[0].name;
//     }
//     if (ctx.session.user) {
//         ctx.body = {
//             code: 1,
//             list:result
//         }
//     }else{
//         ctx.body = {
//             code: -1,
//             msg: "未登陆",
//         }
//     }
// });
//
// // 加密
// var md5 = require('md5');
//
// const multer = require('koa-multer');//加载koa-multer模块
// //文件上传
// //配置
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../public/images/')
//     },
//     //修改文件名称
//     filename: function (req, file, cb) {
//             console.log(file);
//         var fileFormat = (file.originalname).split(".");
//         cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })
// var upload = multer({ storage: storage });
// //路由
// router.post('/upload', upload.single('file'), async (ctx, next) => {
//     console.log(ctx.req.file);
//     ctx.body = {
//         filename: ctx.req.file.filename//返回文件名
//     }
// })
//
//
// module.exports = router;
//
