/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
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
    content: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    postid: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'comment'
  });
};
