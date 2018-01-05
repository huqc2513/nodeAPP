var router=require('koa-router')();

const Sequelize = require('sequelize');
const sequelize = require('../config/config.js');

// 处理数据库（之前已经写好，在mysql.js）
var userModel= require('../lib/mysql.js');
// 加密
var md5 = require('md5');



const  User = require('../model/users')(sequelize,Sequelize);

const  Goods = require('../model/goods')(sequelize,Sequelize);

const shopCart = require('../model/product-cart')(sequelize,Sequelize);





            router.post('/register',async (ctx,next)=> {
                    let user={
                        name:ctx.request.body.name,
                        pass:ctx.request.body.pass,
                        repeatpass:ctx.request.body.repeatpass,
                        phone:ctx.request.body.phone,
                        userName:ctx.request.body.username,
                    };
                    if (user.pass!==user.repeatpass || user.pass=='') {
                            ctx.body={
                                data:3,
                                msg:'两次输入的密码不一致'
                            };
                            return
                    }
                       let register =  await User.findAll({
                                    where:{
                                        name:user.name
                                    }
                                });
                       if(register!=null){
                               ctx.body={
                                   code:2,
                                   msg:'用户已存在'
                               }
                       }else {
                          let res = await User.create({
                               name: user.name,
                               pass: md5(user.pass),
                               phone: user.phone,
                               username: user.username,
                           });

                       }
                });
            router.post('/login',async (ctx,next)=> {
                         let user = {
                             name: ctx.request.body.name,
                             pass: ctx.request.body.pass,
                         };

                            let login=null;
                      try {
                          login = await User.findAll({
                              where: {
                                  name: user.name,
                                  pass: md5(user.pass)
                              }
                          });
                      }catch(err){

                          ctx.body = {
                              code: 0,
                              msg: '错误',
                              info:err,
                          };
                          return
                      }


                     if (login != null) {
                         let item = login[0];//存入数据
                         let obj = {
                             name: item.name,
                             phone: item.phone,
                             username: item.username,
                             header_portrait: item.header_portrait,
                             created_at: item.created_at
                         };
                        obj.id = item.id;

                       //  ctx.cookies.set('name', 'frank', { signed: true ,maxAge:7200000});

                         ctx.session.user = {
                             obj
                         };

                         ctx.body = {
                             code: 1,
                             msg: '登陆成功',
                             info: obj,
                         };


                 }else{
                         ctx.body={
                             code:0,
                             msg:'账号或者密码错误'
                         };
                 }
 });


            router.get('/orderList', async (ctx, next) => {
            let id =  ctx.query.id;
            let sql = `SELECT  * from myoder WHERE userid=${id}`;  //查询用户的所有订单
            let order = await  sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT});


            let idlist = [];   //循环每个订单id

            let result = [];    //订单结果
            for(let i=0;i<order.length;i++){
                let obj = {
                    id:order[i].id,
                    total_price:order[i].total_price,
                    status:order[i].status,
                    create_time:order[i].create_time,
                    list:{},
                };
                idlist.push(obj);
            }
            //根据订单id    查询订单详情表
            for(let i=0;i<idlist.length;i++) {
                let sql2 = `select *  FROM  order_details WHERE order_id =${idlist[i].id}`;
                 //查询用户的每条订单
                let order_details = await  sequelize.query(sql2, {type: sequelize.QueryTypes.SELECT});
                let orderlist= [];  //每一个订单
                for(let i=0;i<order_details.length;i++){
                    let id =  order_details[i].product_id;
                    let sql3 = `select * from goods where id=${id}`;
                    //查询每一个商品信息
                    await sequelize.query(sql3, {type: sequelize.QueryTypes.SELECT}).then(data=>{
                        data = data[0];
                        let obj = {
                            imgSrc: data.imgScr,
                            name: data.name,
                            price: data.price,
                            id: order_details[i].id,
                            count: order_details[i].count,
                            units: order_details[i].units,
                            grading: data.grading
                        };
                        orderlist.push(obj);
                    });
                }
                idlist[i].list=orderlist;
                result.push(idlist);
            }
            // // 判断是否登陆
            if (ctx.session.user) {
                ctx.body = {
                    code:1,
                    order_list:result
                }
            }else{
                ctx.body = {
                    code:-1,
                    status: '您没有登陆',
                }
            }
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


            // 注销
            router.get('/logout', ctx => {

                try{
                    ctx.session = null;
                }catch (err){
                    if(ctx.session!=null){

                        ctx.body = {
                            code: -1,
                            msg: "请登录",
                        }
                    }
                }


                ctx.body = {
                    code: -1,
                    msg: "请登录",
                }
            })


module.exports = router;

