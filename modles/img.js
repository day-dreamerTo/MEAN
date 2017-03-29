/**
 * Created by admin on 17/3/28.
 */
var Img = require('../lib/mongo').Img;
module.exports = {
    create:function(img){
        return Img.create(img).exec();
    },
    getImgs:function(){
        return Img
            .find()
            .addCreatedAt()
            .exec();
    },
    getImgById:function(imgId){
        return Img
            .find({_id:imgId})
            .exec();
    },
    getImgByTitle:function(title){
        var query = {};
        query['title'] = new RegExp(title);
        return Img
            .find(query)
            .exec();
    },
    updateImg:function(imgId,title,description){
        return Img.update({_id:imgId},{$set:{title:title,description:description}}).exec();
    },
    delImgById:function(imgId){
        return Img.remove({_id:imgId})
            .exec();
    }
}