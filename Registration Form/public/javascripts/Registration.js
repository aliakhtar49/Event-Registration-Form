$(document).ready(function(){

  $('#login').on("click",function(){
       $('body').empty();
        $('body').append("<ul class='nav nav-pills'> <li><a href='#'>Home</a></li> <li><a href='#'>About</a></li> <li><a href='#'>Repoistry</a></li> </ul>");
        $('body').append("<div class='container' class='span12'> <div id='forget_your_passwod_div'  class='span4' > <div  style='width: 200px'> <div><div> <h4>Password Is Sent To Your Email </h4> <input type='email' placeholder='Email'/>  <button class='btn btn-primary'  style='display: block;  margin: -8px -18px 14px; width: 100px; height: 32px; padding: 0px; float: right;'>Sent</button></div></div></div></div><div  id='forget_your_passwod_div' class='span4'> <h3>Don't You Have Account </h3><a href='\'>SignUp</a> </div> </div>");
    });

    $('#sign_up').on("click",function(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var password_of_user = $('#password').val();
    var email_of_user =$('#email').val();
     var confirm_password = $('#confirm_password').val();
/*
  $.ajax({
            url:'/check',
            type:'post',
            data:{email:email}
        })
*/

  /*  var regrex_of_name =  /^[A-Za-z]{1,15}$/;
        var regrex_of_password = /^([a-z0-9]){4,15}/;
        var regrex_of_email = /^[A-Za-z0-9\.\^\-\_]{1,}[@]{1}((yahoo.com)||(gmail.com)||(hotmail.com))$/;
      if((first_name.match(regrex_of_name)) && (last_name.match(regrex_of_name)) && (password.match(regrex_of_password)) && (confirm_password==password) && (email.match(regrex_of_email)))
     {
         alert("Proper name");
     }
        else
        {
          alert("Wrng");
        }
*/

       // if(password_of_user == confirm_password)
        //{
        $.ajax({
            url:'/SignUp',
            type:'post',
            data:{first_name:first_name,last_name:last_name,password_of_user:password_of_user,email_of_user:email_of_user},
            success:function(res){$('body').html(res);}

        })
    });
});

