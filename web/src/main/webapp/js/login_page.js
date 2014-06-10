var USERS_CURRENT = location.protocol + "//" + location.host + "/rest/users/current";

var saxsys = saxsys || {};

saxsys.campus = saxsys.campus || {};

/**
 * Versucht einen noch eingeloggten Benutzer (Der Cookie existiert noch) 
 * automatisch einzuloggen.
 * @returns {undefined}
 */
saxsys.campus.tryAutoLogin = function() {
    var authString = $.cookie("id");

    if (authString !== undefined) {
        saxsys.campus.tryLogin(authString);
    }
};

/**
 * Versucht mit dem gegebenen authString einen Login und git im Fehlerfall eine 
 * Fehlermeldung aus.
 * 
 * @param {String} authString
 * @returns {undefined}
 */
saxsys.campus.tryLogin = function(authString) {
    saxoniaCampusRestApi.AUTH_STRING = authString;

    var error = function(data) {
        $("#error_output").html("Bitte überprüfen Sie Benutzername und Passwort!");
    };

    //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
    //wird die seiner Rolle entsprechende Seite geladen.
    var user_success = function(data) {
        userRole = data.role;

        if (userRole === saxoniaCampusRestApi.ADMIN_ROLE) {
            $(":mobile-pagecontainer").pagecontainer("change", "admin.html");
        } else {
            if (userRole === saxoniaCampusRestApi.USER_ROLE) {
                $(":mobile-pagecontainer").pagecontainer("change", 'user.html');
            } else {
                console.log('error occured!');
                $("#error_output").html("Fehler beim Verarbeiten der Benutzerinformationen!");
            }
        }
    };

    var auth_success = function(data) {
        $.cookie("id", authString);
        saxoniaCampusRestApi.getCurrentUser(user_success, error);
    };
    saxoniaCampusRestApi.authenticate(auth_success, error);
};

saxsys.campus.init = function() {
    $("#login_btn").click(function() {
        $("#error_output").html = ('');

        var username = $("#username")[0].value;
        var password = $("#password")[0].value;

        var authString = saxoniaCampusUtil.make_base_auth(username, password);
        saxsys.campus.tryLogin(authString);
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

    $(document).on("pagebeforecreate", "#userPage", function() {
        authUserPage();

        $("#logout_btn_user").click(function() {
            $.removeCookie("id");
        });
    });

    $("input").keydown(function(event) {
        var keycode = event.which;
        if (keycode === 13) {
            $("#login_btn").click();
        }
        ;
    });

};

$(function() {
    saxsys.campus.init();
    
    //Prüfe ob Benutzer bereits eingeloggt ist und leite ihn gemäß seiner 
    //Rolle auf die entsprechende Seite weiter
    saxsys.campus.tryAutoLogin();
});