/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    create_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    goodid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'order'
  });
};
