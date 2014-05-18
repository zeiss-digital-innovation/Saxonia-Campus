/*
 * Controller javascript für die User-View
 */

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
};

var fillSlotList = function() {
    var slots = saxoniaCampusPersistance.slots;
    for (var i in slots) {
        var slot = slots[i];
        saxoniaCampusRenderer.renderUserViewDetailSlot("#user_solot_container", slot);
    }
};

var authUserPage = function() {
    var authString = $.cookie("id");

    if (authString === undefined) {
        console.error("Cookie konnte nicht gefunden werden.");
        $(location).attr('href', 'index.html');
    } else {
        saxoniaCampusRestApi.AUTH_STRING = authString;
    }

    var error = function(data) {
        console.log("Error");
//        $(location).attr('href', 'index.html');
    };

    //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
    //wird die seiner Rolle entsprechende Seite geladen.
    var user_success = function(data) {
        console.log(data);
        var userRole = data.role;
        var userSlots = [];

        if (data._embedded !== undefined) {
            console.log("UserSlots definiert.");
            userSlots = data._embedded.slots;
        }

        if (userRole === saxoniaCampusRestApi.USER_ROLE) {
            saxoniaCampusPersistance.init();
            fillSlotList();
            $("#user_solot_container").collapsibleset('refresh');
            fillBookedListview(userSlots);
            initBookedListview();

            $(".book_slot_btn").click(function() {

                console.log("book-button clicked.");
                console.log("this.id:" + this.id);

                var slotID = extractSlotId(this.id);
                var slot = saxoniaCampusPersistance.slots[slotID];

                if (checkBeforeBooking(slot)) {

                    var success = function(data) {
                        slot.participants++;
                        console.log("slotID: " + slotID);
                        updateFreeCapacity(slot);
                        bookSlot(slotID);
                    };
                    var fail = function(err) {
                        console.log("Fehler beim buchen eines Slots");
                    };

                    saxoniaCampusRestApi.addParticipant(slot, success, fail);
                }
                ;
            });

            return;
        } else {
            if (userRole === saxoniaCampusRestApi.ADMIN_ROLE) {
                console.log("ADMIN-Role detected.");
                $(location).attr('href', 'index.html');
            } else {
                console.log('error occured!');
                console.error("Falsche Benutzerrolle.");
                $(location).attr('href', 'index.html');
            }
        }
    };

    var auth_success = function(data) {
        saxoniaCampusRestApi.getCurrentUser(user_success, error);
    };

    saxoniaCampusRestApi.authenticate(auth_success, error);
};

var checkBeforeBooking = function(slot) {
    if (slot.capacity < 1) {
        $("#error_output").text('FEHLER: Im Slot "' + slot.title + '" ist kein Platz mehr!');
        setTimeout(function(){
            $("#error_output").text('');
        },3000);
        return false;
    } else {
        return true;
    }
};

var fillBookedListview = function(userSlots) {
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            bookSlot(userSlots[i].id);
        };
    } else {
        //only one slot
        bookSlot(userSlots.id);
    }
    ;
};

var initBookedListview = function() {
    $(".delete_slot").click(function(event) {
        event.stopImmediatePropagation();
        console.log("delete slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        var slotSelector = '#user_booked_slot_list #' + slotID + '_slot';

        console.log("slotID: " + slotID);
        console.log("slotSelector: " + slotSelector);

        var slot = saxoniaCampusPersistance.slots[slotID];
        var success = function(data) {
            slot.participants--;
            updateFreeCapacity(slot);
            $(slotSelector).remove();
            $("#user_booked_slot_list").listview("refresh");
            $("#" + slotID + "_book_btn").toggle();
        };
        var fail = function(err) {
            console.log("Fehler beim entfernen eines Teilnehmers.");
        };

        saxoniaCampusRestApi.delParticipant(slot, success, fail);
    });

    $("#user_booked_slot_list").listview("refresh");
};

var updateFreeCapacity = function(slot) {
    $('#' + slot.id + '_free').text(slot.capacity - slot.participants);
};

var bookSlot = function(slotID) {
    var slot = saxoniaCampusPersistance.getSlotById(slotID);
    saxoniaCampusRenderer.renderUserViewBookedSlot("#user_booked_slot_list", slot);

    initBookedListview();
    //remove bookbutton
    $("#" + slotID + "_book_btn").toggle();
};

