const { Model, Datatypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const { beforeCreate, beforeUpdate } = require('./comments');

// created our User model
class User extends Model {
    //set up method to run on instance data (per usual) to check password
    checkPasswords(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
//created fields/columns for our User modelName
User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false;
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
        // set up beforeCreae lifecycle 'hook' functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return newUserData;
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        },
        sequelize,
        timestamps: false,
        freezetableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;