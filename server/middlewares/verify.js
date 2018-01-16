
module.exports = async (ctx,next)=> {
            //判断接口地址
            if(
                ctx.url=='/login'||ctx.url=='/admin/login'||
                ctx.url=='/admin/logout'||ctx.url=='/register'||
                ctx.url=='/product/classify'||ctx.url=='//classify/getClass'

            ){
                next();
            }else{
             //检查是否登陆
                if (ctx.session.admin||ctx.session.user) {
                    next();
                } else {
                        ctx.body={
                            code:-1,
                            msg:'未登陆或登陆过期'
                        }
                }
            }
};