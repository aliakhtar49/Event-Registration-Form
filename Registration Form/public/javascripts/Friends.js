$(document).ready(function(){

    var first_name = [];
    var email_of_all_user=[];
    var profile_name;
    var profile_email;
    var profile_name_currently_log_person;
    var email_of_currently_log_person;

    //  Ajax Request 0 : Get All User Data Availabe
    $.ajax({
        url:'/ShowAllAvailableUser',
        type:'POST',
        success:function(alluserinfodata)
        {

            //  alert(alluserinfodata.length);
            if(alluserinfodata.length == 0 )
            {
                alert("No User Have Account");
            }
            else
            {
                for(var i=0;i<alluserinfodata.length;i++)
                {
                    first_name[i]=alluserinfodata[i].first_name_in_database;  //put All User Available Name I
                    email_of_all_user[i]=alluserinfodata[i].email_in_database;
                }

            }


        }
    })
    //  End Ajax Request 1 :
    /*Get AutoComplete Library  */
    $( "#autocomplete" ).autocomplete({
        source: first_name
    });
    /* End Get AutoComplete Library  */
    $('#SerachAllContent').on("click",function(){
         profile_name=$('#autocomplete').val();
        for(var i=0;i<first_name.length;i++)
        {
            if(profile_name==first_name[i])
            {
                 profile_email = email_of_all_user[i];
                //  Ajax Request 1 : this Ajax Request will The Email of The current User and name of current user
                $.ajax
                ({
                    url:'/GetCurrentUserEmail',
                    type:'POST',

                    success:function(email)

                    {
                        for(var i=0;i<email_of_all_user.length;i++)
                        {
                            if(email_of_all_user[i]==email)
                            {
                                profile_name_currently_log_person=first_name[i];
                                email_of_currently_log_person=email;
                            }
                        }
                        if(profile_email==email)
                        {
                            $.ajax({
                                url:'/BackToYourProfile',
                                type:'POST',
                                data:{email_in_login:email},
                                success:function(res)
                                {

                                    $('body').html(res);
                                }
                            })
                        }
                        else
                        {
                            alert(email_of_currently_log_person);
                            alert(profile_name_currently_log_person);
                            alert(profile_email);
                            $('body').empty();
                            $('body').append("<div><ul class='nav nav-pills'> <li><a href='/'>Name</a></li><li><a class='back_to_your_profile' href='/'><i class='icon-user icon-white'></i>"+ profile_name_currently_log_person+"</a></li> <li><a href='/login'>Login</a></li> </ul><div > <div class='span2' id='githubdiv2'>FirstName:<span style='color: #ffffff'> " +profile_name+ "  </span><br> Email:<span style='color: #ffffff'>"+profile_email+"</span></div><div class='span6' id='githubdiv'><ul class='nav nav-pills'> <li><a id='show_all_repositry' href='#'>Show  All  Repostry</a></li> <li><a href='#'>Contributions</a></li></ul><span id='view_your_repositry'></span> </div> </div> </div>");
                            $('#show_all_repositry').on("click",function()
                           /* Ajax Request 3: This Will Show you ALl his Contributions*/
                            {
                                $.ajax({
                                    url:'/ShowAllRepositry',    //this request fetch you the issue name frm the database
                                    type:'post',
                                    data:{email_of_other_user:profile_email},
                                    success:function(res)
                                    {
                                        for(var i =0; i<res.Issue_Names.length;i++)
                                        {
                                            $('#view_your_repositry').append("<ul><li style='list-style: none' ><a  class='my_all_repositry' href='#'>"+ res.Issue_Names[i].text + "</a></li></ul><br/>").css({ "background-color": 'black','font': 'white', "fontSize": "40px"});   //this line is generating li of available his IssueNames
                                        }
                                        $('.my_all_repositry').on("click",function()
                                        {
                                            var issue_name = $(this).html();   //get the value of issue name that you click on
                                            $('body').empty();
                                            $('body').css({"width":"100%","height":"100%"});
                                            $('body').append("<div id='main_div_when_show_user_profile'><div id='forget_your_passwod_body'  style='background-color: #000000' ><ul class='nav nav-pills'> <li><a style='color: green' href='#'>Home</a></li><li><a style='color: green' href='#'>SignUp</a></li><li><a class='back_to_your_profile' style='color: green' href='#'><i class='icon-user icon-white'></i>"+ profile_name_currently_log_person+  "</a></li> </ul> </div><div><div  id='User_Contact_Over_Here'><div id='name_and_email_of_user' class='span3'> Name:"+ res.name_of_person +"<br> email :"+  res.email_in_Issue +" </div><div> </div> <div id='here_is_user_post' class='span4' id='User_Post_Over_Here'><span id='issue_name_of_user'>Issue Name : "+ issue_name + "</span><br> </div><br></div><p id='user_comment_over_there'><span id='comment_input_enter_here'><input id='comment' type='text'><br><button id='cmt_btn'><i class='icon-comment'></i>Comment</button><div id='comment_here_in_this_line'></p></div>");
                                            $('.back_to_your_profile').on("click",function(){
                                                $.ajax({
                                                    url:'/BackToYourProfile',
                                                    type:'POST',
                                                    data:{email_in_login:email_of_currently_log_person},
                                                    success:function(res)
                                                    {

                                                        $('body').html(res);
                                                    }
                                                })
                                            });
                                            for(var i =0; i<res.Issue_Names.length;i++)  //this loop for getting all data to the particular issue
                                            {
                                                if(res.Issue_Names[i].text==issue_name)   //if we find the issue
                                                {
                                                    var if_found  = null;
                                                    var length_of_line = [];
                                                    var line_no =1
                                                    var red = "0";
                                                    var a = 147;
                                                    var str = new Array();
                                                    var ptr = new Array();
                                                    var count = 0;
                                                    var one = 0;
                                                    var two = 0;
                                                    var doc = res.Issue_Names[i].content;
                                                    /*this code is replace the inverted comma*/
                                                    for(var i =0;i<doc.length;i++)
                                                    {
                                                        if(doc.charAt(i)==';')
                                                        {
                                                            a=147;
                                                        }
                                                        if(doc.charCodeAt(i)==a)
                                                        {
                                                            doc = doc.replace(doc.charAt(i),'\"');
                                                            a++;
                                                        }
                                                    }    //It is replacing the inverted comma or you can say it is inserting it
                                                    for(var i=0;i<doc.length;i++)
                                                    {

                                                        if(doc[i]==';')
                                                        {
                                                            two=i;
                                                            /*str[count] ="<div id="+ "a1"+count+">" + doc.slice(one,two)+"</div>;<button class='ali' id=" + "a" +count + ">HighLite</button><br><br> ";*/
                                                            str[count] ="<div id="+ "a1"+count+">Line:"+ line_no +"  " + doc.slice(one,two)+";</div><button class='ali' id=" + "a" +count + "><i class='icon-pencil'></i></button> ";
                                                            ptr[count]=doc.slice(one,two) + ';';
                                                            one=two +1 ;
                                                            count++;
                                                            line_no++;
                                                        }
                                                    }    //breaking in line with semicolon

                                                     $.ajax({
                                                        url:'/GetpdatedHighLiteToShowTheUser',
                                                        type:'POST',
                                                        data: {issue_name:issue_name},
                                                        success:function(linestyling)
                                                        {

                                                            if(linestyling == "default")
                                                            {
                                                            }
                                                            else
                                                            {
                                                                red=linestyling;

                                                                for(var i=1;i< linestyling.length;i++)
                                                                {
                                                                    length_of_line[i-1]=linestyling.charAt(i);
                                                                }

                                                            }

                                                        }
                                                    })  // ENd of Ajax Hihlite value of Line CSS
                                                   .done(function(linestyling)
                                                         {
                                                            for(var i=0;i<str.length;i++ )
                                                            {

                                                                for(var  j =0;j<length_of_line.length;j++)
                                                                {

                                                                    if(length_of_line[j] == i )
                                                                    {

                                                                        alert("here");

                                                                        if_found = "find";
                                                                    }

                                                                }

                                                                if(if_found == "find")
                                                                {
                                                                    $('#issue_name_of_user').append(""+str[i]+"");
                                                                    $('#a1'+ i+'').addClass('redline');
                                                                   // $('#a1' + i+'').css({ fontSize:"20px"  });
                                                                    if_found=null;
                                                                }
                                                                else
                                                                {
                                                                    $('#issue_name_of_user').append(""+str[i]+"");
                                                                }

                                                            }
                                                             $('.ali').on("click",function(){

                                                                 var a = $(this).attr("id");      //get the id of current click button that i generated dynamically
                                                                 alert(a);                        //alert it
                                                                 var b = a.charAt(1);             //get the value of count its positiona is at 1
                                                                 //  alert(ptr[b]);
                                                                 var id_string = "a1"+ a.charAt(1);
                                                                 // alert(id_string);
                                                                 if($('#a1'+ a.charAt(1)+'').hasClass('redline'))
                                                                 {
                                                                     $('#a1'+ a.charAt(1)+'').removeClass('redline');
                                                                     red = red.substr(0, red.length-1);
                                                                     alert(red);
                                                                 }
                                                                 else
                                                                 {
                                                                     $('#a1'+ a.charAt(1)+'').addClass('redline');
                                                                     red = red + b;
                                                                     alert(red);

                                                                 }

                                                             });

                                                        }); //after Getting Updated css Value Show user post Here
                                                   $('#here_is_user_post').append("<br><button title='Save Inline CSS To Choose Line ' id='btn_save_id'><i class='icon-ok-circle'></i></button><button title='Edit Your CSS ' id='btn_edit_id'> <i class='icon-edit'></i></button>");  //Bring Save and Edit Button Into Play


                                                    $('#btn_save_id').on("click",function()
                                                    {

                                                        $('.ali').attr("disabled", true);
                                                        $.ajax({
                                                            url:'/SaveHiglitevalueHere',
                                                            type:'POST',
                                                            data:{red:red,issue_name:issue_name},
                                                            success:function(res){alert(res);}
                                                        })
                                                        alert(red);
                                                    });

                                                    $('#btn_edit_id').on("click",function(){
                                                        $('.ali').attr("disabled", false);
                                                    });  //ehen click onthe save button
                                                }
                                            }
                                                    $.ajax({
                                                url:'/AlreadyHaveComments',
                                                type:'post',
                                                data:{'issue_name':issue_name},
                                                success:function(res){
                                                    for(var i =0; i<res.Comment.length;i++)
                                                    {
                                                        $('#comment_here_in_this_line').append( "<div class='border_in_comment'><br/>" + res.Comment[i].text +  "</div>" );
                                                    }

                                                }
                                            })  //Already User have Comment
                                                    $('#cmt_btn').on("click",function(){
                                                var comment_value = $('#comment').val();
                                                alert(comment_value);
                                                $.ajax({
                                                    url:'/comment1',
                                                    type:'post',
                                                    data:{email_post:profile_email,issue_name:issue_name,comment_value:comment_value},
                                                    success: function()
                                                    {

                                                            $('#comment_here_in_this_line').append( "<div class='border_in_comment'><br/>" + comment_value +  "</div>" );
                                                    }
                                                }).done(function(){

                                                        alert("done");
                                                    });
                                            });  //when you click on the comment btn it save the vale of comment in database
                                        });
                                    }
                                })
                            });
                           /* End Ajax Request 3: This Will Show you ALl his Contributions*/


                        }

                    }

                })
                //End Ajax Request 1
            }
        }
    });
});

