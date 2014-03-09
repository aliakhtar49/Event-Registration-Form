var mongoose = require('mongoose');
var connection = mongoose.connect("mongodb://localhost/SEProjectDataBase", function(err){
    if(err){
        console.log("Err");
    } else {
        console.log("Connected To DB");
    }
});
var Schema   =  mongoose.Schema;
var Schema1 = new Schema({

    first_name_in_database:String,
    last_name_in_database:String,
    password_in_database:String ,
    email_in_database:String
})
var Schema2 = new Schema({
    Issue_Names :
    {content:String,text:String},
    email_in_Issue:String,
    name_of_person:String
})
var Schema3 = new Schema({
    Name_of_person_of_Comment:String,
    Content:String,

    Email_Comment:String,
    IssueName:String,

    Comment :
    {text:String}
})
var Schema_of_SignUp = mongoose.model("Schema_of_SignUp",Schema1);
var Schema_of_Issues = mongoose.model("Schema_of_Issues",Schema2);
var Comment = mongoose.model("Comment",Schema3);

var p = {
    x: "get",
    get r() { return this.x; },
    set r(newvalue) {

        this.x = newvalue;

    }
};
exports.SignUp = function(req,res)
{
    //var q = new p;   // Create a new object that inherits getters and setters
      // Create q's own data properties


    var data_of_user_when_signup = new Schema_of_SignUp({first_name_in_database:req.body.first_name,last_name_in_database:req.body.last_name,password_in_database:req.body.password_of_user,email_in_database:req.body.email_of_user});
    var data_of_user_of_Issue = new Schema_of_Issues({name_of_person:req.body.first_name,email_in_Issue:req.body.email_of_user});
    var data_of_user_of_Post = new Comment({Name_of_person_of_Comment:req.body.first_name,Email_Comment:req.body.email_of_user});


    data_of_user_when_signup.save(function(err){
        if(err)
        {
            res.send("Error in Saving");
        }
        else
        {
            data_of_user_of_Issue.save(function(err){
                if(err)
                {
                    res.send("Error in Saving");
                }
                else
                {
                    data_of_user_of_Post.save(function(err){
                        if(err)
                        {
                            res.send("Error in Saving");
                        }
                        else
                        {
                            if(req.url == '/SignUp')
                            {res.render('login');}
                        }

                    });
                   /* if(req.url == '/SignUp')
                    {res.render('login');}*/
                }

            });

        }

    });
};

exports.See_Exist_User_When_Login = function(req,res)
{

    p.x = req.body.email_in_login;
    console.log(p.r);

    Schema_of_SignUp.findOne({ email_in_database: req.body.email_in_login }, function (err, doc){
        //console.log(doc);
        if(doc== null)
        {

            res.send("Data Not Found Here");

        }
        else
        {
         if(req.body.password_in_login == doc.password_in_database)
         {
             if(req.url == '/See_Exist_User_When_Login')
             {

                 res.render('AddEvent',{doc: doc});}
         }
            else
         {
             if(req.url == '/See_Exist_User_When_Login')
             {
                 res.render('index');
             }
         }
        }
    });
}
exports.Issue_Info=function(req,res)

{
    var fs = require('fs');
    var path1 = req.files.thumbnail.path;
    console.log(path1);
    var a =  fs.readFileSync(path1,'utf8');
  //  console.log(a);
    console.log(p.x);   //email global
   // res.send("Works");
//console.log(req.body.issue_name);
    var data_of_user_of_Post = new Comment({IssueName:req.body.issue_name});
    data_of_user_of_Post.save(function(err){
        if(err)
        {
            res.send("Error in Saving");
        }
        else
        {
            Schema_of_Issues.update({"email_in_Issue" : p.x}, {$push : {"Issue_Names":{"text":req.body.issue_name,"content":a}}},function(err)
            {
                if(err)
                {
                    res.send("Error in Saving");
                }
                else
                {
                   /* Schema_of_Issues.findOne({ text: req.body.issue_name }, function (err, doc){
                        if(doc== null)
                        {
                            res.send("Data Not Found Here");
                        }
                        else
                        {

                            console.log(doc);
                            var store_item =  {email:p.x,issue_name:req.body.issue_name};
                            res.render('ShowUserPostOverHere',{store_item: store_item});

                        }
                    });*/
                    console.log(req.body.issue_name);
                   /* Schema_of_Issues.findOne({Issue_Names:{$elemMatch: {text:req.body.issue_name}}}, function (err,docs) {
                        console.log(docs);
                        if(err)
                        {console.log(err);}
                        else{console.log(docs);

                            var store_item =  {email:p.x,issue_name:req.body.issue_name,docs:docs};
                            res.render('ShowUserPostOverHere',{store_item: store_item});
                        } });*/
                    Schema_of_Issues.findOne({Issue_Names:{$elemMatch: {text:req.body.issue_name}}}, function (err,docs) { console.log(docs);
                       // res.send("Worksd");
                       // res.render('ShowUserPostOverHere');

                        var store_item =  {email:p.x,issue_name:req.body.issue_name};
                        res.render('ShowUserPostOverHere',{store_item: store_item});
                    });


                }
            });
        }

    });



}
exports.Comment_Info = function(req,res)
{
    console.log(req.body.comment_value);
    Comment.update({"IssueName" : req.body.issue_name}, {$push : {"Comment":{"text":req.body.comment_value}}},function(err)
    {
        if(err)
        {
            res.send("Error in Saving");
        }
        else
        {
            res.send("Comment Are Added");
        }
    });
}