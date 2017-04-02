/**
 * Created by admin on 17/4/1.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var UserModel = require('../models/user');

router.get('/:userId/edit', function (req, res, next) {
    var userId = req.params.userId;
    UserModel
        .getUserById(userId)
        .then(function (user) {
            res.render('editUser', {user: user});
        });
});
router.post('/:userId/edit', function (req, res, next) {
    var userId = req.params.userId;
    var name = req.fields.name;
    var bio = req.fields.bio;
    UserModel.updateUserInfo(userId, name, bio).then(function (result) {
        //如果直接
        // req.session.user = user;
        //这种方式会把之前的user覆盖掉,包括user._id都会被覆盖掉
        req.session.user.name = name;
        req.session.user.bio = bio;
        console.log(req.session.user);
        req.flash('success', '修改成功');
        return res.redirect('/gallery');
    }).catch(function (e) {
        req.flash('error', '修改失败');
        return res.redirect('back');
        next(e);
    });

});
module.exports = router;