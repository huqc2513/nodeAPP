nodeApp
====
简介
----
这是一个简单的商城app，后端使用了nodejs、koa2,koa-mysql,multer,cors等功能模块。<br>

由于前后端分离，所以后端的主要任务是向前端传输json。<br>

前端的是基于vue.js element-ui,mint-ui  来实现<br>


##目前实现的功能有：<br>

##
登陆/登出<br>
商品分类<br>
添加商品<br>

删除商品<br>
搜索商品<br>
下单，添加,删除订单<br>
添加购物车并结算<br>



项目运行<br>

> 安装依赖<br>
> npm install<br>
>
>npm run dev<br>

>服务器端  server<br>
> cd server<br> 
npm install <br>
>商城后台端  hgt-admin <br>
><br>
>npm install <br> 
npm run dev<br> 
>

app前端在线预览  http://112.74.173.191/dist/index.html

管理后台在线预览  http://112.74.173.191/admin/dist/index.html

##登陆账号密码 123  123<br>
>导入nodesql数据，需要先创建nodesql数据库，修改server目录下的config文件中的mysql配置 <br>

注意，项目如要在本地运行先要启动server ,需要在server中的index.js修改cors配置,将指定IP改为locaclhost:8081<br>
 

