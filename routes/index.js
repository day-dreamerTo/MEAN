/**
 * Created by admin on 17/3/27.
 */
module.exports = function(app){
    app.get('/',function(req,res){
    	res.redirect('/gallery');
    });
    app.use('/gallery',require('./gallery'));
    app.use('/music',require('./music'));
    app.use('/signup',require('./signup'));
    app.use('/signin',require('./signin'));
    app.use('/signout',require('./signout'));
    app.use('/user',require('./user'));
    app.use(function(req,res){
        if(!res.headersSent){
            res.status(404).render('404');
        }
    })
};