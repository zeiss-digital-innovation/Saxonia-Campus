/*
 * Controller javascript für die Admin-View 
 */

//Variable um zu unterscheiden, ob der Slot, der gerade bearbeitet wird ein 
//neuer Slot ist oder ein bereits vorhandener Slot.
//Diese Unterscheidung wird benötigt um entweder ein update oder ein save auszulösen.
//Alternativ dazu könnte man für edit und new jeweils eigene Formulare im HTML anlegen.
var adminNewSlotEditing = false;
var currentSlotInWork = -1;

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
}

var fillAdminSlotList = function() {
    var slots = saxoniaCampusPersistance.slots;
    for (var i in slots) {
        var slot = slots[i];
        saxoniaCampusRenderer.renderAdminViewSlot("#admin_slot_list", slot);
    }
};

var fillRooms = function() {
    var rooms = saxoniaCampusPersistance.rooms;
    for (var i in rooms) {
        var room = rooms[i];
        saxoniaCampusRenderer.renderRoomOption("#room_select", room);
    }
};

var authAdminPage = function() {
    var authString = $.cookie("id");

    if (authString === undefined) {
        console.error("Cookie konnte nicht gefunden werden.");
        $(location).attr('href', 'index.html');
    } else {
        saxoniaCampusRestApi.AUTH_STRING = authString;
    }

    var error = function(data) {
        $(location).attr('href', 'index.html');
    };

    //Wenn aktueller Benutzer erfolgreich vom Server geholt werden konnte,
    //wird die seiner Rolle entsprechende Seite geladen.
    var user_success = function(data) {
        console.log(data);
        userRole = data.role;

        if (userRole === saxoniaCampusRestApi.ADMIN_ROLE) {
            saxoniaCampusPersistance.init();
            fillAdminSlotList();
            fillRooms();
            initAdminview();
            return;
        } else {
            if (userRole === saxoniaCampusRestApi.USER_ROLE) {
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

var initAdminview = function() {
    //deleteButton am Slot wurde geklickt
    $(".delete_slot").click(function() {
        console.log("delete slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        var slotSelector = '#' + slotID + '_slot';

        console.log("slotID: " + slotID);
        console.log("slotSelector: " + slotSelector);
        
        saxoniaCampusRestApi.deleteSlot(
                saxoniaCampusPersistance.getSlotById(slotID),
                function (){},function (){});

        $(slotSelector).remove();
        $("#admin_slot_list").listview("refresh");
    });

    //edit slot
    $(".edit_slot").click(function() {
        adminNewSlotEditing = false;

        var slotID = extractSlotId(this.id);
        currentSlotInWork = slotID;

        var slot = saxoniaCampusPersistance.getSlotById(slotID);

        $("#title_input").val(slot.title);

        $("#content_input").val(slot.description);

        $("#room_select").val(slot.roomId).selectmenu('refresh');

        $("#start_time_input").val(slot.starttime);

        $("#end_time_input").val(slot.endtime);

        $("#speaker_input").val(slot.speaker);

        $("#capacity_input").val(slot.capacity);

        $("#slot_detail_header").text('Slot Bearbeiten');
        $("#admin_detail_popup").popup("open");
    });

    $("#admin_slot_list").listview('refresh');
    $("#room_select").selectmenu("refresh");
};

var saveNewSlot = function() {
    var slotTitle = $("#title_input").val();
    var slotDescription = $("#content_input").val();
    var slotRoom = $("#room_select").val();
    var slotStarttime = $("#start_time_input").val();
    var slotEndtime = $("#end_time_input").val();
    var slotSpeaker = $("#speaker_input").val();
    var capacity = $("#capacity_input").val();

    var newSlot = new SaveSlot(slotTitle);
    newSlot.description = slotDescription;
    newSlot.room = slotRoom;
    newSlot.starttime = saxoniaCampusUtil.convertTimeStrToMillis(slotStarttime);
    newSlot.endtime = saxoniaCampusUtil.convertTimeStrToMillis(slotEndtime);
    newSlot.speaker = slotSpeaker;
    newSlot.capacity = capacity;

    var success = function(data) {
        console.log("newSlot added successfully.");
        console.log(data);
        var jsonSlot = saxoniaCampusUtil.convertJsonSlotToViewSlot(data.responseText);
        saxoniaCampusPersistance.addNewSlot(jsonSlot);
        //insert new slot into slotlist
        saxoniaCampusRenderer.renderAdminViewSlot("#admin_slot_list", jsonSlot);
        initAdminview();
    };
    var fail = function(err) {
        console.error("adding newSlot failed.");
        console.error(err);
    };

    saxoniaCampusRestApi.addSlot(newSlot, success, fail);


};

var updateExistingSlot = function() {
    console.log("update existing Slot");
    var slotID = currentSlotInWork;
    var slotTitle = $("#title_input").val();
    var slotDescription = $("#content_input").val();
    var slotRoom = $("#room_select").val();
    var slotStarttime = $("#start_time_input").val();
    var slotEndtime = $("#end_time_input").val();
    var slotSpeaker = $("#speaker_input").val();
    var slotCapacity = $("#capacity_input").val();

    var slot = new updateSlot(slotID, slotTitle);
    slot.description = slotDescription;
    slot.room = slotRoom;
    slot.starttime = saxoniaCampusUtil.convertTimeStrToMillis(slotStarttime);
    slot.endtime = saxoniaCampusUtil.convertTimeStrToMillis(slotEndtime);
    slot.speaker = slotSpeaker;
    slot.capacity = slotCapacity;
    
    var jsonSlot = new Slot(slotID, slotTitle);
    jsonSlot.description = slotDescription;
    jsonSlot.room = slotRoom;
    jsonSlot.starttime = slotStarttime;
    jsonSlot.endtime = slotEndtime;
    jsonSlot.speaker = slotSpeaker;
    jsonSlot.capacity = slotCapacity;

    var success = function(data) {
        console.log("Slot updated successfully.");
        console.log(data);

        saxoniaCampusPersistance.updateSlot(jsonSlot);
        $('#' + jsonSlot.id + '_slot').html(saxoniaCampusRenderer.generateInnerSlot(jsonSlot));
        initAdminview();
    };
    var fail = function(err) {
        console.error("updating Slot failed.");
        console.error(err);
    };

    saxoniaCampusRestApi.updateSlot(slot, success, fail);
};


