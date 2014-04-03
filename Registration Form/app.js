
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var dataBase = require('./routes/DataBaseWork');
var http = require('http');
var path = require('path');
//var emailExistence =require('email-existence');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//app.post('/file-upload',routes.fileUpload);
app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/login',routes.login);
//app.get('/LoginPage', routes.LoginPage);
app.post('/SignUp',dataBase.SignUp);
app.post('/See_Exist_User_When_Login',dataBase.See_Exist_User_When_Login);
app.post('/Create_new_Repositry',function(req,res){

   // res.render('Repositry');
    if(req.url == '/Create_new_Repositry')
    {
        var store_item =  {email:req.body.email,name:req.body.first_name};

        res.render('Repositry',{store_item: store_item});}
});
//app.get('/AddEvent',function(req,res){res.render('AddEvent')});
app.post('/issue1',dataBase.Issue_Info);
app.post('/comment1',dataBase.Comment_Info);
app.post('/ShowAllRepositry',dataBase.ShowAllRepositry);
app.post('/UsersAllData',dataBase.UsersAllData);
app.post('/AlreadyHaveComments',dataBase.AlreadyHaveComments);
app.post('/onlysavethecoomment',dataBase.onlysavethecoomment)
app.post('/sendemailifuserfor',dataBase.sendemailifuserfor);

app.get('/forget_your_password',function(req,res){
    res.render('forget_your_password');
});
app.post('/FirstfindPassword',dataBase.FirstfindPassword);
//app.post('/AllDeveloper',dataBase.AllDeveloper);
/*app.get('/event',function(req,res){
    res.render('AddEvent');
});*/
/*app.post('/check',function(req,res)
{
    console.log(req.body.email);
    emailExistence.check(req.body.email, function(err,res){
        console.log('res: '+res);
    });
});*/





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
