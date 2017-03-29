var path = require('path');
var express = require('express');
var router = express.Router();
var ImgModel = require('../modles/img');
// var checkLogin = require('../middlewares/check').checkLogin;

//图库
router.get('/',function(req,res,next){
	ImgModel.getImgs().then(function(imgs){
		res.render('gallery',{imgs:imgs});
	});
});

//新增图片页
router.get('/add',function(req,res,next){
	res.render('addImg');
});
//新增图片
router.post('/add',function(req,res,next){
	req.flash('loading','');
	var title = req.fields.title;
	var picture = req.files.picture.path.split(path.sep).pop();
	var description = req.fields.description;
	try{
		if(! title.length ){
			throw new Error('标题不可为空');
		}
	}catch(e){
		req.flash('error',e.message);
		return res.redirect('back');
	}
	var img = {
		title:title,
		url:picture,
		description:description
	};
	ImgModel.create(img).then(function(){
		req.flash('success','新增成功');
		return res.redirect('back');
	}).catch(function(e){
        req.flash('error',e.message);
		next(e);
	});
});

//修改
router.get('/:imgId/edit',function(req,res,next){
	var imgId = req.params.imgId;
	ImgModel.getImgById(imgId).then(function(img){
		res.render('editImg',{img:img[0]});
	});
});
router.post('/:imgId/edit',function(req,res,next){
	var imgId = req.params.imgId;
	var title = req.fields.title;
	var description = req.fields.description;
	ImgModel.updateImg(imgId,title,description).then(function(){
		req.flash('success','修改成功');
		return res.redirect('back');
	}).catch(function(e){
		req.flash('error','修改失败');
		next(e);
	});
});

//删除图片
router.get('/:imgId/remove',function(req,res,next){
	var imgId = req.params.imgId;
	ImgModel
		.delImgById(imgId)
		.then(function(){
			return res.redirect('back')
	}).catch(next);
});
//搜索图片
router.get('/search',function(req,res,next){
 	res.render('search');
});
router.post('/search',function(req,res,next){
	var title = req.fields.title;
	ImgModel.getImgByTitle(title).then(function(imgs){
		res.render('gallery',{imgs:imgs});
	});
});
module.exports = router;