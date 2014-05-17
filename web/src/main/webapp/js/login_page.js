var USERS_CURRENT = "http://" + location.host + "/rest/users/current";

$(function() {
    $("#login_btn").click(function() {
        console.log("LoginButton clicked");

        var username = $("#username")[0].value;
        var password = $("#password")[0].value;

        console.log("username: " + username);
        console.log("password: " + password);

        var authString = saxoniaCampusUtil.make_base_auth(username, password);
        saxoniaCampusRestApi.AUTH_STRING = authString;

        var error = function(data) {
            console.log('error occured!');
            $("#error_output").html("Bitte überprüfen Sie Benutzername und Passwort!")
        };

        //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
        //wird die seiner Rolle entsprechende Seite geladen.
        var user_success = function(data) {
            console.log(data);
            userRole = data.role;

            if (userRole === saxoniaCampusRestApi.ADMIN_ROLE) {
//                $(location).attr('href', 'admin.html');
                $(":mobile-pagecontainer").pagecontainer("change", "admin.html");
            } else {
                if (userRole === saxoniaCampusRestApi.USER_ROLE) {
                    $(location).attr('href', 'user.html');
                } else {
                    console.log('error occured!');
                    $("#error_output").html("Fehler beim verarbeiten der Benutzerinformationen!")
                }
            }
        };

        var auth_success = function(data) {
            console.log('Server-login successfull');
            $.cookie("id", authString);

            saxoniaCampusRestApi.getCurrentUser(user_success, error)
        };



        saxoniaCampusRestApi.authenticate(auth_success, error);
    });

    $("#cancel_btn").click(function() {
        $("#error_output").html("");
    });

    $(document).on("pagebeforecreate", "#adminPage", function() {
        authAdminPage();

        $("#logout_btn").click(function() {
            $.removeCookie("id");
        });

        // click new slot button
        $("#new_slot_btn").click(function() {
            adminNewSlotEditing = true;
            console.log("show detailView panel");
            $("#slot_detail_header").text('Neuer Slot');
            $("#admin_detail_popup").popup("open");
        });

        // click save button
        $("#save_slot_details_btn").click(function() {
            if (adminNewSlotEditing) {
                saveNewSlot();
            } else {
                updateExistingSlot();
            }
            $("#cancel_slot_details_btn").click();
        });

        // click cancel button
        $("#cancel_slot_details_btn").click(function() {
            currentSlotInWork = -1;
            $("#admin_detail_popup").popup("close");
        });
    });
});