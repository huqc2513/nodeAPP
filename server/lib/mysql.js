var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
});

let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows ) //发送
                    }
                    connection.release() //关闭连接
                })
            }
        })
    })

}

users=
    `create table if not exists users(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         pass VARCHAR(40) NOT NULL,
         PRIMARY KEY ( id )
);`

posts=
    `create table if not exists posts(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         title VARCHAR(40) NOT NULL,
         content  VARCHAR(40) NOT NULL,
         uid  VARCHAR(40) NOT NULL,
         moment  VARCHAR(40) NOT NULL,
         comments  VARCHAR(40) NOT NULL DEFAULT '0',
         pv  VARCHAR(40) NOT NULL DEFAULT '0',
         PRIMARY KEY ( id )
);`

comment=
    `create table if not exists comment(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         content VARCHAR(40) NOT NULL,
         postid VARCHAR(40) NOT NULL,
         PRIMARY KEY ( id )
);`

// goods = `
//    create table if not exists goods(
//         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//         name VARCHAR(100) NOT NULL,
//         price DOUBLE(6,2)  DEFAULT '0',
//         site  VARCHAR(30),
//         imgScr VARCHAR(60) NOT NULL
//     )
// `


let createTable = function( sql ) {
    return query( sql, [] )
}

// 建表
createTable(users)
createTable(posts)
createTable(comment)
// createTable(goods)

//
// img/product.png

// 注册用户
let insertData = function( value ) {
    let _sql = "insert into users(name,pass,phone,username) values(?,?,?,?);"
    return query( _sql, value )
}
// 发表文章
let insertPost = function( value ) {
    let _sql = "insert into posts(name,title,content,uid,moment) values(?,?,?,?,?);"
    return query( _sql, value )
}
// 更新文章评论数
let updatePostComment = function( value ) {
    let _sql = "update posts set  comments=? where id=?"
    return query( _sql, value )
}

// 更新浏览数
let updatePostPv = function( value ) {
    let _sql = "update posts set  pv=? where id=?"
    return query( _sql, value )
}

// 发表评论
let insertComment = function( value ) {
    let _sql = "insert into comment(name,content,postid) values(?,?,?);"
    return query( _sql, value )
}
// 通过名字查找用户
let findDataByName = function ( name) {
    let _sql = `
    SELECT * from users
      where name="${name}" 
      `
    return query( _sql)
}
// 登陆
let login = function (  name , pass) {
    let _sql = `
    SELECT * from users
      where phone="${name}" and  pass="${pass}"
      `
    return query( _sql)
}
//查询数据

let getProductList = function (page,pageSize,sort,priceSoct) {

    let _sql = `
         SELECT * from goods ORDER BY
     `;
    // ORDER BY salesVolume ${sort},price ${priceSoct}
    if(sort!=''){
        _sql+= ` salesVolume ${sort} `;
    }
    if(priceSoct!=''){
        _sql+= ` price ${priceSoct} `;
    }
    let _limit=" limit "+(parseInt(page)-1)*parseInt(pageSize)+","+pageSize;
    // console.log(_sql+_limit);
    return query( _sql+_limit)
}


// 通过文章的名字查找用户
let findDataByUser = function (  name ) {
    let _sql = `
    SELECT * from posts
      where name="${name}"
      `
    return query( _sql)
}
// 通过文章id查找
let findDataById = function (  id ) {
    let _sql = `
    SELECT * from posts
      where id="${id}"
      `
    return query( _sql)
}
// 通过评论id查找
let findCommentById = function ( id ) {
    let _sql = `
    SELECT * FROM comment where postid="${id}"
      `
    return query( _sql)
}

// 查询所有文章
let findAllPost = function () {
    let _sql = `
    SELECT * FROM posts
      `
    return query( _sql)
}
// 更新修改文章
let updatePost = function(values){
    let _sql=`update posts set  title=?,content=? where id=?`
    return query(_sql,values)
}
// 删除文章
let deletePost = function(id){
    let _sql=`delete from posts where id = ${id}`
    return query(_sql)
}
// 删除评论
let deleteComment = function(id){
    let _sql=`delete from comment where id = ${id}`
    return query(_sql)
}
// 删除所有评论
let deleteAllPostComment = function(id){
    let _sql=`delete from comment where postid = ${id}`
    return query(_sql)
}
// 查找
let findCommentLength = function(id){
    let _sql=`select content from comment where postid in (select id from posts where id=${id})`
    return query(_sql)
}



module.exports={
    query,
    login,
    getProductList,
    createTable,
    insertData,
    findDataByName,
    insertPost,
    findAllPost,
    findDataByUser,
    findDataById,
    insertComment,
    findCommentById,
    updatePost,
    deletePost,
    deleteComment,
    findCommentLength,
    updatePostComment,
    deleteAllPostComment,
    updatePostPv
}