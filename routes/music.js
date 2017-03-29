/**
 * Created by admin on 17/3/29.
 */
var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
   res.render('music');
});

module.exports = router;