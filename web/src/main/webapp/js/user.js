/*
 * Controller javascript für die User-View
 */

var saxsys = saxsys || {};
saxsys.campus = saxsys.campus || {};
saxsys.campus.userController = saxsys.campus.userController || {};

saxsys.campus.userController.init = function() {
    saxoniaCampusPersistance.init();
    saxoniaCampusPersistance.initUserSlots(saxsys.campus.userController.tmpUserSlots);
    saxsys.campus.userController.generateRoomGrids();

    saxsys.campus.userController.fillSlotList();
    saxsys.campus.userController.fillBookedListview(saxoniaCampusPersistance.getUserSlots());
    saxsys.campus.userController.initBookedListview();
    $("#userPageContent").trigger('create');

    $(".book_slot_btn").click(function() {

//                console.log("book-button clicked.");
        //                console.log("this.id:" + this.id);

        var slotID = saxoniaCampusUtil.extractSlotId(this.id);

        //remove bookbutton
        $("#" + slotID + "_book_btn").hide();

        var slot = saxoniaCampusPersistance.getSlotById(slotID);

        if (saxsys.campus.userController.checkBeforeBooking(slot)) {

            var success = function(data) {
                slot.participants++;
                //                        console.log("slotID: " + slotID);
                saxsys.campus.userController.updateFreeCapacity(slot);
                saxoniaCampusPersistance.addUserSlot(slot.id);
                saxsys.campus.userController.fillBookedListview(saxoniaCampusPersistance.getUserSlots());
                saxsys.campus.userController.initBookedListview();
                $("#user_info_output").popup("open");
                setTimeout(function() {
                    $("#user_info_output").popup("close");
                }, 1500);
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
                $("#" + slotID + "_book_btn").show();
            };

            saxoniaCampusRestApi.addParticipant(slot, success, fail);
        }
        ;
    });
};

saxsys.campus.userController.refreshRoomGrid = function() {
    var rooms = saxoniaCampusPersistance.rooms;
    for (var i in rooms) {
        var room = rooms[i];
        $('#' + room.id + '_room_slotset').collapsibleset("refresh");
    }
    ;
};

saxsys.campus.userController.generateRoomGrids = function() {
    var rooms = saxoniaCampusPersistance.rooms;

    for (var i in rooms) {
        var room = rooms[i];
        saxoniaCampusRenderer.renderRoomGrid("#room_grid", room);
    }
    ;
};

saxsys.campus.userController.fillSlotList = function() {
    var slots = saxoniaCampusPersistance.slots;
    for (var i in slots) {
        var slot = slots[i];
        saxoniaCampusRenderer.renderUserViewDetailSlot(slot);
    }
};

saxsys.campus.userController.checkBeforeBooking = function(slot) {
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
            $("#" + slot.id + "_book_btn").show();
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

saxsys.campus.userController.fillBookedListview = function(userSlots) {
    $("#user_booked_slot_list").html('');
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            saxsys.campus.userController.bookSlot(userSlots[i].id);
        }
    } else {
        //only one slot
        saxsys.campus.userController.bookSlot(userSlots.id);
    }
};

saxsys.campus.userController.initBookedListview = function() {
    $(".delete_slot").click(function(event) {
        event.stopImmediatePropagation();
//        console.log("delete slot clicked");
//        console.log("this.id:" + this.id);

        var slotID = saxoniaCampusUtil.extractSlotId(this.id);
        var slotSelector = '#user_booked_slot_list #' + slotID + '_slot';

//        console.log("slotID: " + slotID);
//        console.log("slotSelector: " + slotSelector);
        $("#" + slotID + "_book_btn").show();

        var slot = saxoniaCampusPersistance.getSlotById(slotID);
        var success = function(data) {
            slot.participants--;
            saxsys.campus.userController.updateFreeCapacity(slot);
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

saxsys.campus.userController.updateFreeCapacity = function(slot) {
    $('#' + slot.id + '_free').text(slot.capacity - slot.participants);
};

saxsys.campus.userController.bookSlot = function(slotID) {
    var slot = saxoniaCampusPersistance.getSlotById(slotID);
    saxoniaCampusRenderer.renderUserViewBookedSlot("#user_booked_slot_list", slot);

    saxsys.campus.userController.initBookedListview();
};

