//var q    = require("q");
/*var mongoose = require('mongoose');
var Schema      = mongoose.Schema;
var connection = mongoose.connect("mongodb://localhost/SE", function(err){
    if(err){
        console.log("Err");
    } else {
        console.log("Connected To DB");
    }
});

var Schema1 = new Schema({
    IssueName:String,
    Comment:String

})
var file = mongoose.model("file",Schema1);


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
   // res.render('Issue', { title: 'Express' });
};
exports.fileUpload = function(req,res){
    var path = require('path');
    var fs = require('fs');
    console.log(req.body.data);
   var path1 = req.body.data[0].files.thumbnail.path;
  //  var issue

    console.log(path1);
  //  var file_data =  fs.readFileSync(path1,'utf8');
   // console.log(req.body.issue_name);
   // var saving_file_data = new file({IssueName:file_data});
   *//* saving_file_data.save(function(err){
        if(err)
        {
            alert("Error in Saving");

        }
        else
        { res.send('send');}  //server respond to our client

    });*//*
    res.send("works");

};*/
exports.login = function(req, res){
console.log("herer");
    res.render('login.ejs');
};
exports.index= function(req,res){
    res.render('index');
}
exports.LoginPage = function(req, res){


};