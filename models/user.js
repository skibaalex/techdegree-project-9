'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {

  class User extends Model {};

  User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a first name'
                },
                notEmpty: {
                    msg: 'Please provide a first name'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a last name'
                },
                notEmpty: {
                    msg: 'Please provide a last name'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email address'
                },
                notNull: {
                    msg: 'An email is required'
                }
            },
            unique: {
                msg: "Their is already an account with that email."
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is requiered'
                },
                notEmpty: {
                    msg: 'password is an empty string'
                }
            },
            set(password){
                const hashed = bcrypt.hashSync(password, 10)
                this.setDataValue('password', hashed)
            }
        }
    },
    {sequelize});

    User.associate = (models) => {
        User.hasMany(models.Course, {
          as: "user",
          foreignKey:"userId"
        });
      };


  return User;
};