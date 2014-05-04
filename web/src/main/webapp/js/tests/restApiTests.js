/* 
 *This QUnit Tests test the REST-API of the Campus Application.
 */

module("API");

asyncTest("Testen der Authentisierung.", function() {
    saxoniaCampusRestApi.AUTH_STRING = "Basic bWFyY28uZGllcmVuZmVsZHQ6Y2FtcHVz";

    var auth_success = function(data) {
        ok(true, "Authentication successfull");
        notEqual(data, undefined, "data ist nicht undefined");
        notEqual(saxoniaCampusRestApi.CURRENT_USER_URL, "", "currentUser URL ist definiert");
        notEqual(saxoniaCampusRestApi.SLOTS_URL, "", "slots URL ist definiert");
        notEqual(data, undefined, "data ist nicht undefined");
        start();
    };
    var auth_fail = function() {
        ok(false, "Authentication failed");
        start();
    };

    saxoniaCampusRestApi.authenticate(auth_success, auth_fail);
});

asyncTest("Teste getCurrentUser", function() {
    var expectedUsername = "marco.dierenfeldt";
    var expectedRole = "ADMIN";

    saxoniaCampusRestApi.AUTH_STRING = "Basic bWFyY28uZGllcmVuZmVsZHQ6Y2FtcHVz";
    saxoniaCampusRestApi.authenticate(function() {
        var onSuccess = function(data) {
            ok(true, "getCurrentUser successfull");
            equal(data.role, expectedRole, "Erwartete Rolle ADMIN");
            equal(data.username, expectedUsername, "Erwarteter Username marco.dierenfeldt");
            start();
        };
        var onFail = function() {
            ok(false, "getCurrentUser failed");
            start();
        };

        saxoniaCampusRestApi.getCurrentUser(onSuccess, onFail);
    },
            function() {
            });
});

asyncTest("Teste getSlots", function() {
    var expectedSlotslength = 3;
    var expectedRoomsUrl = "http://"+location.host+"/rest/rooms";

    saxoniaCampusRestApi.AUTH_STRING = "Basic bWFyY28uZGllcmVuZmVsZHQ6Y2FtcHVz";
    saxoniaCampusRestApi.authenticate(function() {
        var onSuccess = function(slots) {
            ok(true, "getSlots successfull");
            equal(slots.length, expectedSlotslength, "Es werden 5 Slots zurückgeliefert.")
            notEqual(saxoniaCampusRestApi.ROOMS_URL, undefined, "ROOMS_URL ist definiert.");
            equal(saxoniaCampusRestApi.ROOMS_URL, expectedRoomsUrl, "Rooms Url http://HOSTNAME:PORT/rest/romms");
            start();
        };
        var onFail = function() {
            ok(false, "getSlots failed");
            start();
        };

        saxoniaCampusRestApi.getSlots(onSuccess, onFail);
    },
            function() {
            });
});

asyncTest("Teste getRooms", function() {
    var expectedSlotslength = 3;

    saxoniaCampusRestApi.AUTH_STRING = "Basic bWFyY28uZGllcmVuZmVsZHQ6Y2FtcHVz";
    saxoniaCampusRestApi.authenticate(function() {
        saxoniaCampusRestApi.getSlots(function() {
            var onSuccess = function(slots) {
                ok(true, "getRooms successfull");
                start();
            };
            var onFail = function() {
                ok(false, "getRooms failed");
                start();
            };

            saxoniaCampusRestApi.getRooms(onSuccess, onFail);
        }, function() {});
    },
            function() {
            });
});