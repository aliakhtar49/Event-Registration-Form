var mongoose = require('mongoose');
var nodemailer = require("nodemailer");
var q = require('q');
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

    linestyling:String,
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
  //  console.log(p.r);

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
            // console.log("herer");

             if(req.url == '/See_Exist_User_When_Login')
             {
                // console.log("herer1");
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
    var fs = require('fs');                            //node module for filing
    var path1 = req.files.thumbnail.path;              //It takes the absolute path of file Upload
    //console.log(path1);                                //console it for testing
    var content_of_file =  fs.readFileSync(path1,'binary'); // this line is taking the content of the file in a variable with binary encoding
  //  console.log(p.x);   //email globa;                      //globally email of a active user
    var data_of_user_of_Post = new Comment({IssueName:req.body.issue_name,linestyling:"default"}); //In variable  Schema Put the value that it gets from the client
    data_of_user_of_Post.save(function(err){   // save it to database
        if(err)
        {
            res.send("Error in Saving");   //if error an exception handling for error
        }
        else
        {                         //if a error not occur
            Schema_of_Issues.update({"email_in_Issue" : p.x}, {$push : {"Issue_Names":{"text":req.body.issue_name,"content":content_of_file}}},function(err)  //taking issue name as a ID to update the content of the Issue in database
            {
                if(err)
                {
                    res.send("Error in Saving");     //if error an exception handling for error
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
                 //   console.log(req.body.issue_name);
                   /* Schema_of_Issues.findOne({Issue_Names:{$elemMatch: {text:req.body.issue_name}}}, function (err,docs) {
                        console.log(docs);
                        if(err)
                        {console.log(err);}
                        else{console.log(docs);

                            var store_item =  {email:p.x,issue_name:req.body.issue_name,docs:docs};
                            res.render('ShowUserPostOverHere',{store_item: store_item});
                        } });*/
                    Schema_of_Issues.findOne({Issue_Names:{$elemMatch: {text:req.body.issue_name}}}, function (err,docs) { console.log(docs);



                        var store_item =  {email:p.x,issue_name:req.body.issue_name,docs:docs};
                        res.render('ShowUserPostOverHere',{store_item: store_item});
                    });


                }
            });
        }

    });



}
exports.Comment_Info = function(req,res)
{
  //  console.log(req.body.comment_value);
    Comment.update({"IssueName" : req.body.issue_name}, {$push : {"Comment":{"text":req.body.comment_value}}},function(err)
    {
        if(err)
        {
            res.send("Error in Saving");
        }
        else
        {
            Comment.findOne({ IssueName:  req.body.issue_name }, function (err, doc){
                if(doc== " ")
                {
                    res.send("Data Not Found Here");
                }
                else
                {
                  //  console.log(doc);
                    res.send(doc);

                }
            });
            /*Comment.findOne({Comment:{$elemMatch: {text:'this'}}}, function (err,docs) { console.log(docs);
                res.send(docs);
            });
            res.send("Comment Are Added");*/

        }
    });
}

exports.ShowAllRepositry = function(req,res)
{
    var  user_email ;

  if(req.body.email_of_other_user == "empty")
  {
      console.log("herer");
      user_email = p.x;
  }
    else
  {
      user_email = req.body.email_of_other_user;
  }
        Schema_of_Issues.findOne({ email_in_Issue:  user_email }, function (err, doc){
            if(doc== " ")
            {
                res.send("Data Not Found Here");
            }
            else
            {console.log(doc);
                res.send(doc);
            }
        });

}
exports.UsersAllData =  function(req,res)
{
   /* Comment.findOne({ IssueName:  req.body.issue_name }, function (err, doc){
        if(doc== " ")
        {
            res.send("Data Not Found Here");
        }
        else
        {*/

            Schema_of_Issues.findOne({ email_in_Issue:  p.x }, function (err, docs){
                if(docs== " ")
                {
                    res.send("Data Not Found Here");
                }
                else
                {
                   // console.log(docs + doc);

                    //res.send(docs + doc)
                    res.send(docs);
                }
            });
/*

        }
    });
*/

}
exports.AlreadyHaveComments = function(req,res)
{
    Comment.findOne({ IssueName:  req.body.issue_name }, function (err, doc){
        if(doc== " ")
        {
            res.send("Data Not Found Here");
        }
        else
        {
            res.send(doc);


        }
    });
}
exports.onlysavethecoomment = function(req,res)
{
    Comment.update({"IssueName" : req.body.issue_name}, {$push : {"Comment":{"text":req.body.comment_value}}},function(err)
    {
        if(err)
        {
            res.send("Error in Saving");
        }
        else
        {
            res.send("Your COmment Are Saved To Our data base");
        }
    });
}
exports.FirstfindPassword = function(req,res)
{
    Schema_of_SignUp.find({email_in_database:req.body.email}, function(err, docs){

        if(err){
            console.log('error');

        } else {
           // console.log(docs);
            res.send(docs);
        }
    });
}
exports.sendemailifuserfor = function(req,res)
{
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "smartali.7778@gmail.com",
            pass: "alimeldon"
        }
    });
    smtpTransport.sendMail({
        from: "Issue Tracking Website  <smartali.7778@gmail.com>", // sender address
        to:  req.body.email, // comma separated list of receivers
        subject: "Password", // Subject line
        text: "Your Password  \n" + req.body.password + "\n" // plaintext body
    }, function(error){
        if(error){
            console.log(error);
            res.send("error");
        }else{
            //console.log("Message sent: " + res.message);
            res.send("Sent");
        }
    });

}
/*
exports.AllDeveloper = function(req,res)
{
    Schema_of_SignUp.find({}, function(err, docs){

        if(err){
            console.log('error');

        } else {
            console.log(docs);
        }
    });

}*/
exports.SaveHiglitevalueHere = function(req,res)
{
    Comment.findOne({ IssueName: req.body.issue_name }, function (err, doc){
    //    console.log(doc);
       // console.log(req.body.red);
        doc.linestyling = req.body.red;
        doc.save();

       // doc.update({IssueName:"fff"},{linestyling:"kkk"});
        //   doc.save();

       // console.log(doc);
        res.send("data updated");
    });

}
exports.ShowAllAvailableUser = function(req,res){
    var deferred = q.defer();
    Schema_of_SignUp.find({}, function(err, docs){
        //var deferred = q.defer();
        if(err){
            console.log('error');

        } else {
           // console.log(docs);
            console.log(docs);
            res.send(docs);
        }
    });


}
exports.GetpdatedHighLiteToShowTheUser=function(req,res)
{
    Comment.findOne({ IssueName: req.body.issue_name }, function (err, doc){
        var linestyling = doc.linestyling;
        res.send(linestyling);



    });
}
exports.GetCurrentUserEmail = function(req,res)
{
    res.send(p.x);
}
exports.BackToYourProfile = function(req,res)
{
    Schema_of_SignUp.findOne({ email_in_database: req.body.email_in_login }, function (err, doc){
        if(err)
        {
            console.log("error");
        }

        if(req.url == '/BackToYourProfile')
        {

            res.render('AddEvent',{doc: doc});
        }
    });
}