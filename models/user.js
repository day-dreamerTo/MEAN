/**
 * Created by admin on 17/3/31.
 */
var User = require('../lib/mongo').User;
module.exports = {
    create:function create(user){
        return User.create(user).exec();
    },
    getUserByName:function(name){
        return User
            .findOne({name:name})
            .addCreatedAt()
            .exec();
    }
};