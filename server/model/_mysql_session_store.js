/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('_mysql_session_store', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: '_mysql_session_store'
  });
};
