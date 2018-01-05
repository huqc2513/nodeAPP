const Sequelize = require('sequelize');
const sequelize = require('../config/config.js');



let  productCart = sequelize.define('product-cart', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
        uid:{
            type: Sequelize.INTEGER,
        },
        count:{
            type: Sequelize.INTEGER,
        },
        goodid:{
            type: Sequelize.INTEGER,
        },
    freezeTableName: true // Model 对应的表名将与model名相同
});

module.exports=productCart;