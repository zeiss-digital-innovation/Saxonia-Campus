/*
 * Controller javascript für die User-View
 */

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
};
var refreshRoomGrid = function() {
    var rooms = saxoniaCampusPersistance.rooms;

    for (var i in rooms) {
        var room = rooms[i];
        $('#' + room.id + '_room_slotset').collapsibleset("refresh");
    }
    ;
};

var generateRoomGrids = function() {
    var rooms = saxoniaCampusPersistance.rooms;

    for (var i in rooms) {
        var room = rooms[i];
        saxoniaCampusRenderer.renderRoomGrid("#room_grid", room);
    }
    ;
};

var fillSlotList = function() {
    var slots = saxoniaCampusPersistance.slots;
    for (var i in slots) {
        var slot = slots[i];
        saxoniaCampusRenderer.renderUserViewDetailSlot(slot);
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
//        console.log(data);
        var userRole = data.role;
        var userSlots = [];

        if (data._embedded !== undefined) {
            console.log("UserSlots definiert.");
            userSlots = data._embedded.slots;
        }

        if (userRole === saxoniaCampusRestApi.USER_ROLE) {
            saxoniaCampusPersistance.init();
            saxoniaCampusPersistance.initUserSlots(userSlots);
            generateRoomGrids();

            fillSlotList();
            fillBookedListview(saxoniaCampusPersistance.getUserSlots());
            initBookedListview();
            $("#userPageContent").trigger('create');

            $(".book_slot_btn").click(function() {

//                console.log("book-button clicked.");
//                console.log("this.id:" + this.id);

                var slotID = extractSlotId(this.id);

                //remove bookbutton
                $("#" + slotID + "_book_btn").hide();

                var slot = saxoniaCampusPersistance.getSlotById(slotID);

                if (checkBeforeBooking(slot)) {

                    var success = function(data) {
                        slot.participants++;
//                        console.log("slotID: " + slotID);
                        updateFreeCapacity(slot);
                        saxoniaCampusPersistance.addUserSlot(slot.id);
                        fillBookedListview(saxoniaCampusPersistance.getUserSlots());
                        initBookedListview();
                    };
                    var fail = function(err) {
                        console.log("Fehler beim Buchen eines Slots");
                        //err.responseText.detail
                        var error = jQuery.parseJSON(err.responseText);

                        $("#user_error_output").text('FEHLER: ' + error.detail);
                        $("#user_error_output").popup("open");
                        setTimeout(function() {
                            $("#user_error_output").popup("close");
                            location.reload();
                        }, 3000);
                    };

                    saxoniaCampusRestApi.addParticipant(slot, success, fail);
                }
                ;
            });

            return;
        } else {
            if (userRole === saxoniaCampusRestApi.ADMIN_ROLE) {
//                console.log("ADMIN-Role detected.");
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
        $("#user_error_output").text('FEHLER: Im Slot "' + slot.title + '" ist kein Platz mehr!');
        $("#user_error_output").popup("open");
        setTimeout(function() {
            $("#user_error_output").popup("close");
        }, 3000);
        return false;
    }

    var bookedSlots = saxoniaCampusPersistance.getUserSlots();

//    console.log("slot.startTime: " + slot.starttime);
//    console.log("slot.endTime: " + slot.endtime);
    for (var i in bookedSlots) {
        var currentSlot = saxoniaCampusPersistance.getSlotById(bookedSlots[i].id);
//        console.log("currentSlot.startTime: " + currentSlot.starttime);
//        console.log("currentSlot.endTime: " + currentSlot.endtime);

        var collision = saxoniaCampusUtil.collisionTest(slot, currentSlot);
//        console.log("collision: " + collision);
        if (collision) {
            var error = 'FEHLER: Slot "' + slot.title + '" überschneidet sich zeitlich mit dem Slot "' + currentSlot.title + '"!';

            $("#user_error_output").text(error);
            $("#user_error_output").popup("open");
            setTimeout(function() {
                $("#user_error_output").popup("close");
            }, 3000);
            return false;
        }
    }
    return true;
};

var fillBookedListview = function(userSlots) {
    $("#user_booked_slot_list").html('');
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            bookSlot(userSlots[i].id);
        }
    } else {
        //only one slot
        bookSlot(userSlots.id);
    }
};

var initBookedListview = function() {
    $(".delete_slot").click(function(event) {
        event.stopImmediatePropagation();
//        console.log("delete slot clicked");
//        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        var slotSelector = '#user_booked_slot_list #' + slotID + '_slot';

//        console.log("slotID: " + slotID);
//        console.log("slotSelector: " + slotSelector);
        $("#" + slotID + "_book_btn").show();

        var slot = saxoniaCampusPersistance.getSlotById(slotID);
        var success = function(data) {
            slot.participants--;
            updateFreeCapacity(slot);
            saxoniaCampusPersistance.removeUserSlot(slot.id);
            $(slotSelector).remove();
            $("#user_booked_slot_list").listview("refresh");
        };
        var fail = function(err) {
            console.log("Fehler beim Entfernen eines Teilnehmers.");
            var error = jQuery.parseJSON(err.responseText);

            $("#user_error_output").text('FEHLER: ' + error.detail);
            $("#user_error_output").popup("open");
            setTimeout(function() {
                $("#user_error_output").popup("close");
            }, 3000);

            $("#" + slotID + "_book_btn").hide();
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
};

