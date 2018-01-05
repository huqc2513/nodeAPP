var Sequelize = require('sequelize');
var config  = require('../config/default');
var sequelize = new Sequelize(
    config.database.DATABASE, // 数据库名
    config.database.USERNAME,   // 用户名
    config.database.PASSWORD,   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': '127.0.0.1', // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
        'define': {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            'underscored': true
        }
    }
);
module.exports=sequelize;