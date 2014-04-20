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
                            $('body').append("<div><ul class='nav nav-pills'> <li><a href='/'>Name</a></li><li><a href='/'><i class='icon-user icon-white'></i>"+ profile_name_currently_log_person+"</a></li> <li><a href='/login'>Login</a></li> </ul><div > <div class='span2' id='githubdiv2'>FirstName:<span style='color: #ffffff'> " +profile_name+ "  </span><br> Email:<span style='color: #ffffff'>"+profile_email+"</span></div><div class='span6' id='githubdiv'><ul class='nav nav-pills'> <li><a id='show_all_repositry' href='#'>Show  All  Repostry</a></li> <li><a href='#'>Contributions</a></li></ul><span id='view_your_repositry'></span> </div> </div> </div>");
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

