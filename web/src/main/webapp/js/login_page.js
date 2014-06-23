var saxsys = saxsys || {};
saxsys.campus = saxsys.campus || {};
saxsys.campus.userController = saxsys.campus.userController || {};

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
    saxsys.campus.restApi.AUTH_STRING = authString;

    var error = function(data) {
        $("#error_output").text("Bitte überprüfen Sie Benutzername und Passwort!");
    };

    //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
    //wird die seiner Rolle entsprechende Seite geladen.
    var user_success = function(data) {
        userRole = data.role;

        if (userRole === saxsys.campus.restApi.ADMIN_ROLE) {
            $(":mobile-pagecontainer").pagecontainer("change", "admin.html");
        } else {
            if (userRole === saxsys.campus.restApi.USER_ROLE) {
                saxsys.campus.userController.tmpUserSlots = [];

                if (data._embedded !== undefined) {
                    console.log("UserSlots definiert.");
                    saxsys.campus.userController.tmpUserSlots = data._embedded.slots;
                }

                $(":mobile-pagecontainer").pagecontainer("change", "user.html");
            } else {
                $("#error_output").text("Fehler beim Verarbeiten der Benutzerinformationen!");
            }
        }
    };

    var auth_success = function(data) {
        $.cookie("id", saxsys.campus.restApi.AUTH_STRING);
        saxsys.campus.restApi.getCurrentUser(user_success, error);
    };
    saxsys.campus.restApi.authenticate(auth_success, error);
};

/**
 * Initialisieren der Anwendung SaxoniaCampus WebApp
 * @returns {undefined}
 */
saxsys.campus.init = function() {

    //event-binding für den LoginButton im Login Dialog
    $("#login_btn").click(function() {
        $("#error_output").text("");

        var username = $("#username")[0].value;
        var password = $("#password")[0].value;

        var authString = saxsys.campus.utility.make_base_auth(username, password);
        saxsys.campus.tryLogin(authString);
    });

    //event-binding für den CancelButton im Login Dialog
    $("#cancel_btn").click(function() {
        $("#error_output").text("");
    });

    //initialisierung der Administrationsseite
    $(document).on("pagebeforeshow", "#adminPage", function() {
        saxsys.campus.adminController.init();

        //click LogoutButton der Adminseite
        $("#logout_btn").click(function() {
            $.removeCookie("id");
        });

        // click new slot button 
        $("#new_slot_btn").click(function() {
            saxsys.campus.adminController.adminNewSlotEditing = true;
            $("#slot_detail_header").text("Neuer Slot");
            $("#admin_detail_popup").popup("open");
        });

        // click save button
        $("#save_slot_details_btn").click(function() {
            if (saxsys.campus.adminController.adminNewSlotEditing) {
                saxsys.campus.adminController.saveNewSlot();
            } else {
                saxsys.campus.adminController.updateExistingSlot();
            }
            saxsys.campus.adminController.currentSlotInWork = -1;
            $("#admin_detail_popup").popup("close");
        });

        // click cancel button
        $("#cancel_slot_details_btn").click(function() {
            saxsys.campus.adminController.currentSlotInWork = -1;
            $("#admin_detail_popup").popup("close");
        });

        $("#csvExportButton").click(function() {
            var csvFileName = "campusExport.csv";
            //generiere CSV in admin controller mit Rendererhiilfe
            var csvString = saxsys.campus.adminController.generateExportCsv();
            //starte CSV-Download in Utility
            saxsys.campus.utility.startCsvDownload(csvString, csvFileName);
        });
    });

    //Initialisieren der Userseite
    $(document).on("pagebeforeshow", "#userPage", function() {
//        authUserPage();
        saxsys.campus.userController.init();

        $("#logout_btn_user").click(function() {
            $.removeCookie("id");
        });
    });

    //Abfangen von Enter in den LoginDialogInputfeldern
    $(".login_input").keydown(function(event) {
        var keycode = event.which;
        if (keycode === 13) {
            $("#login_btn").click();
        }
        ;
    });

};

$(function() {
    //initialisiere die Anwendung
    saxsys.campus.init();

    //Prüfe ob Benutzer bereits eingeloggt ist und leite ihn gemäß seiner 
    //Rolle auf die entsprechende Seite weiter
    saxsys.campus.tryAutoLogin();
});