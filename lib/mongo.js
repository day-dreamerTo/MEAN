/**
 * Created by admin on 17/3/27.
 */
var config = require('config-lite');
var  Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt',{
    afterFind:function(results){
        results.forEach(function(item){
            item.create_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne:function(result){
        result.create_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        return result;
    }
});
//图片模型
exports.Img = mongolass.model('Img',{
    title:{type:'string'},
    description:{type:'string'},
    url:{type:'string'}
});
//用户模型
exports.User = mongolass.model('User',{
   name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
});
exports.Img.index({url:1},{unique:true}).exec();
exports.User.index({name:1},{unique:true}).exec();