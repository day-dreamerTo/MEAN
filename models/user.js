/**
 * Created by admin on 17/3/31.
 */
var User = require('../lib/mongo').User;
module.exports = {
    create:function create(user){
        return User
            .create(user)
            .addCreatedAt()
            .exec();
    },
    getUserByName:function(name){
        return User
            .findOne({name:name})
            .exec();
    },
    getUserById:function(userId){
        return User
            .findOne({_id:userId})
            .exec();
    },
    updateUserInfo:function(userId,name,bio){
        return User
            .update({_id:userId},{$set:{name:name,bio:bio}})
            .exec();
    },
    delUserById:function(userId){
        return User
            .remove({_id:userId})
            .exec();
    }
};