/*
 * Controller javascript für die User-View
 */

var saxsys = saxsys || {};
saxsys.campus = saxsys.campus || {};
saxsys.campus.userController = saxsys.campus.userController || {};

saxsys.campus.userController.init = function() {
    saxoniaCampusPersistance.init();

    //saxsys.campus.userController.tmpUserSlots wird in login-Controller gesetzt
    saxoniaCampusPersistance.initUserSlots(saxsys.campus.userController.tmpUserSlots);
    saxsys.campus.userController.generateRoomGrids();

    saxsys.campus.userController.fillSlotList();
    saxsys.campus.userController.fillBookedListview(saxoniaCampusPersistance.getUserSlots());
    saxsys.campus.userController.initBookedListview();
    $("#userPageContent").trigger("create");

    $(".book_slot_btn").click(function() {

        var slotID = saxoniaCampusUtil.extractSlotId(this.id);

        //remove bookbutton
        $("#" + slotID + "_book_btn").hide();

        var slot = saxoniaCampusPersistance.getSlotById(slotID);

        if (saxsys.campus.userController.checkBeforeBooking(slot)) {

            var success = function(data) {
                slot.participants++;
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
                var error = jQuery.parseJSON(err.responseText);
                var errorMessage = "FEHLER: " + error.detail;
                
                saxoniaCampusUtil.displayUserError(errorMessage, 3000);
                
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
        $("#" + room.id + "_room_slotset").collapsibleset("refresh");
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
        var errorMessage = "FEHLER: Im Slot " +
                '"' + slot.title + '"' + "ist kein Platz mehr!";

        saxoniaCampusUtil.displayUserError(errorMessage, 3000);

        return false;
    }

    var bookedSlots = saxoniaCampusPersistance.getUserSlots();

    for (var i in bookedSlots) {
        var currentSlot = saxoniaCampusPersistance.getSlotById(bookedSlots[i].id);
        var collision = saxoniaCampusUtil.collisionTest(slot, currentSlot);

        if (collision) {
            $("#" + slot.id + "_book_btn").show();

            var errorMessage = "FEHLER: Slot " + '"' + slot.title + '"' +
                    " überschneidet sich zeitlich mit dem Slot " +
                    '"' + currentSlot.title + '"' + "!";

            saxoniaCampusUtil.displayUserError(errorMessage, 3000);

            return false;
        }
    }
    return true;
};

saxsys.campus.userController.fillBookedListview = function(userSlots) {
    $("#user_booked_slot_list").html("");
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

        var slotID = saxoniaCampusUtil.extractSlotId(this.id);
        var slotSelector = "#user_booked_slot_list #" + slotID + "_slot";

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
            var error = jQuery.parseJSON(err.responseText);
            var errorMessage = "FEHLER: " + error.detail;
            
            saxoniaCampusUtil.displayUserError( errorMessage, 3000 );
            
            $("#" + slotID + "_book_btn").hide();
        };

        saxoniaCampusRestApi.delParticipant(slot, success, fail);
    });

    $("#user_booked_slot_list").listview("refresh");
};

saxsys.campus.userController.updateFreeCapacity = function(slot) {
    $("#" + slot.id + "_free").text(slot.capacity - slot.participants);
};

saxsys.campus.userController.bookSlot = function(slotID) {
    var slot = saxoniaCampusPersistance.getSlotById(slotID);
    
    saxoniaCampusRenderer.renderUserViewBookedSlot("#user_booked_slot_list", slot);

    saxsys.campus.userController.initBookedListview();
};

