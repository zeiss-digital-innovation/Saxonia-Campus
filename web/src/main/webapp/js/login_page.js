var saxsys = saxsys || {};
saxsys.campus = saxsys.campus || {};

/**
 * Versucht einen noch eingeloggten Benutzer (Der Cookie existiert noch) 
 * automatisch einzuloggen.
 * @returns {undefined}
 */
saxsys.campus.tryAutoLogin = function() {
    var authString = $.cookie( "id" );

    if ( authString !== undefined ) {
        saxsys.campus.tryLogin( authString );
    }
};

/**
 * Versucht mit dem gegebenen authString einen Login und git im Fehlerfall eine 
 * Fehlermeldung aus.
 * 
 * @param {String} authString
 * @returns {undefined}
 */
saxsys.campus.tryLogin = function( authString ) {
    saxoniaCampusRestApi.AUTH_STRING = authString;

    var error = function( data ) {
        $( "#error_output" ).text( "Bitte überprüfen Sie Benutzername und Passwort!" );
    };

    //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
    //wird die seiner Rolle entsprechende Seite geladen.
    var user_success = function(data) {
        userRole = data.role;

        if ( userRole === saxoniaCampusRestApi.ADMIN_ROLE ) {
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "admin.html" );
        } else {
            if ( userRole === saxoniaCampusRestApi.USER_ROLE ) {
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "user.html" );
            } else {
                $( "#error_output" ).text( "Fehler beim Verarbeiten der Benutzerinformationen!" );
            }
        }
    };

    var auth_success = function( data ) {
        $.cookie( "id", saxoniaCampusRestApi.AUTH_STRING );
        saxoniaCampusRestApi.getCurrentUser( user_success , error );
    };
    saxoniaCampusRestApi.authenticate( auth_success, error );
};

/**
 * Initialisieren der Anwendung SaxoniaCampus WebApp
 * @returns {undefined}
 */
saxsys.campus.init = function() {
    
    //event-binding für den LoginButton im Login Dialog
    $( "#login_btn" ).click(function() {
        $( "#error_output" ).text( "" );

        var username = $( "#username" )[0].value;
        var password = $( "#password" )[0].value;

        var authString = saxoniaCampusUtil.make_base_auth( username, password );
        saxsys.campus.tryLogin( authString );
    });

    //event-binding für den CancelButton im Login Dialog
    $( "#cancel_btn" ).click(function() {
        $( "#error_output" ).text( "" );
    });

    //initialisierung der Administrationsseite
    $( document ).on( "pagebeforeshow", "#adminPage", function() {
        saxsys.campus.adminController.init();

        //click LogoutButton der Adminseite
        $( "#logout_btn" ).click(function() {
            $.removeCookie( "id" );
        });

        // click new slot button 
        $( "#new_slot_btn" ).click(function() {
            saxsys.campus.adminController.adminNewSlotEditing = true;
            $( "#slot_detail_header" ).text( "Neuer Slot" );
            $( "#admin_detail_popup" ).popup( "open" );
        });

        // click save button
        $( "#save_slot_details_btn" ).click(function() {
            if ( saxsys.campus.adminController.adminNewSlotEditing ) {
                saveNewSlot();
            } else {
                updateExistingSlot();
            }
            currentSlotInWork = -1;
            $( "#admin_detail_popup" ).popup( "close" );
        });

        // click cancel button
        $( "#cancel_slot_details_btn" ).click(function() {
            currentSlotInWork = -1;
            $( "#admin_detail_popup" ).popup( "close" );
        });
    });

    //Initialisieren der Userseite
    $( document ).on( "pagebeforecreate", "#userPage", function() {
        authUserPage();

        $( "#logout_btn_user" ).click(function() {
            $.removeCookie( "id" );
        });
    });

    //Abfangen von Enter in den LoginDialogInputfeldern
    $( ".login_input" ).keydown(function( event ) {
        var keycode = event.which;
        if (keycode === 13) {
            $( "#login_btn" ).click();
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