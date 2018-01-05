/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
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
    title: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    moment: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: '0'
    },
    pv: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'posts'
  });
};
