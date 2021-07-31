'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Course extends Model {};

  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a title'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          msg: 'Description has to be between 20-400 characters',
          args: [20,400]
        },
        notNull: {
          msg: 'Please provide a description'
        },
      },
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING,
  }, {sequelize});

  Course.associate = (models) =>  {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        field: 'userId'
      }
    })
  }
  
  return Course;
};