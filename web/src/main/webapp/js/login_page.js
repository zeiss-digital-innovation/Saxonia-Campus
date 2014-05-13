var USERS_CURRENT = "http://"+location.host+"/rest/users/current";


$(function() {
    $("#login_btn").click(function() {
        console.log("LoginButton clicked");
        var userview_user = "marco.dierenfeldt";
        var adminview_user = "stefan.bley";
        var username = $("#username")[0].value;
        var password = $("#password")[0].value;

        console.log("username: " + username);
        console.log("password: " + password);

        var authString = saxoniaCampusUtil.make_base_auth(username, password);
        var serverUrl = "http://"+location.host+"/rest/";
        $.ajax
                ({
                    type: "GET",
                    url: serverUrl,
                    dataType: 'json',
                    async: false,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', authString);
                    },
                    success: function() {
                        console.log('Server-login successfull');
                        $.cookie("id",authString);
                        
                        if (username === userview_user) {
                            console.log("Userview wird geladen");
                            $(location).attr('href', 'user.html');
                        } else if (username === adminview_user) {
                            console.log("Adminview wird geladen");
                            $(location).attr('href', 'admin.html');
                        } else {
                            console.log("User unbekannt.");
                            $("#error_output").html("Bitte überprüfen Sie Benutzername und Passwort.")
                        }
                    },
                    error: function() {
                        console.log('error occured!');
                            $("#error_output").html("Bitte überprüfen Sie Benutzername und Passwort!")
                    }
                });
    });

    $("#cancel_btn").click(function() {
        $("#error_output").html("");
    });
});