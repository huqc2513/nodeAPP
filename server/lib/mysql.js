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

};

// goods = `
//    create table if not exists goods(
//         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//         name VARCHAR(100) NOT NULL,
//         price DOUBLE(6,2)  DEFAULT '0',
//         site  VARCHAR(30),
//         imgScr VARCHAR(60) NOT NULL
//     )
// `


// 建表
// createTable(goods)

//递归查询
let queryClassify =function test(parent_id){
    let sql = `select a.* from classify a where parent_id=?`;

    return query(sql,parent_id)
}


module.exports={
    query,
    queryClassify
}