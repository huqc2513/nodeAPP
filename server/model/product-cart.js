/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_cart', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    count: {
      type: DataTypes.INTEGER(8),
      allowNull: true
    },
    goodid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'goods',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'product-cart'
  });
};
