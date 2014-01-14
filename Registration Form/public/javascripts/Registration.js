$(document).ready(function(){
    $('#sign_up').on("click",function(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var password = $('#password').val();
    var email =$('#email').val();
        var confirm_password = $('#confirm_password').val();

        var regrex_of_name =  /^[A-Za-z]{1,15}$/;
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

    });
});

