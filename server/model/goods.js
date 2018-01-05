/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: "DOUBLE(6,2)",
      allowNull: true,
      defaultValue: '0.00'
    },
    site: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    imgScr: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    salesVolume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    tableName: 'goods'
  });
};
