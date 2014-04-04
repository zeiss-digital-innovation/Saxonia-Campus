
$(function() {
    $("#login_btn").click(function() {
        console.log("LoginButton clicked");
        var userview_user = "user";
        var adminview_user = "admin";
        var username = $("#username")[0].value;
        var password = $("#password")[0].value;

        console.log("username: " + username);
        console.log("password: " + password);

        var authString = saxoniaCampusUtil.make_base_auth(username, password);

        $.ajax
                ({
                    type: "GET",
                    url: "http://localhost:8080/rest/",
                    dataType: 'json',
                    async: false,
                    data: '{}',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', authString);
                    },
                    success: function() {
                        console.log('Server-login successfull');
                        
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