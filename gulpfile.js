/**
 * Created by admin on 17/3/30.
 */
var gulp = require('gulp');
var id3 = require('id3js');
id3({ file: './public/music/一声佛号一声心 - 佛教音乐.mp3', type: id3.OPEN_LOCAL }, function(err, tags) {
    // tags now contains your ID3 tags
    console.log(tags);
});
gulp.task('test', function () {
   /* //读入config.json文件
    var myConfig = require('./config.json');
    //取出对应的配置信息
    var envConfig = myConfig[options.env];
    var conConfig = 'appconfig = ' + JSON.stringify(envConfig);
    //生成config.js文件
    return string_src("config.js", conConfig)
        .pipe(gulp.dest('dist/js/'))*/

});
