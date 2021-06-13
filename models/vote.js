const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Vote extends Model {}

Vote.init(
    {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Datatypes.INTEGER,
            referneces: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: Datatypes.INTEGER,
            referneces: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize, 
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;