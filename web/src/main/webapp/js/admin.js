/*
 * Controller javascript für die Admin-View 
 */

//Variable um zu unterscheiden, ob der Slot, der gerade bearbeitet wird ein 
//neuer Slot ist oder ein bereits vorhandener Slot.
//Diese Unterscheidung wird benötigt um entweder ein update oder ein save auszulösen.
//Alternativ dazu könnte man für edit und new jeweils eigene Formulare im HTML anlegen.
saxsys.campus.adminController.adminNewSlotEditing = false;

//Wird benötigt, um sich den aktuell in Bearbeitung befindlichen Slot zu merken.
saxsys.campus.adminController.currentSlotInWork = -1;

saxsys.campus.adminController.init = function() {
    saxsys.campus.persistence.init();
    saxsys.campus.adminController.fillAdminSlotList();
    saxsys.campus.adminController.fillRooms();
    saxsys.campus.adminController.initView();
    return;
};

saxsys.campus.adminController.fillAdminSlotList = function() {
    var slots = saxsys.campus.persistence.slots;
    $("#admin_slot_list").html('');
    for (var i in slots) {
        var slot = slots[i];
        saxsys.campus.renderer.renderAdminViewSlot("#admin_slot_list", slot);
    }
};

saxsys.campus.adminController.fillRooms = function() {
    var rooms = saxsys.campus.persistence.rooms;
    for (var i in rooms) {
        var room = rooms[i];
        saxsys.campus.renderer.renderRoomOption("#room_select", room);
    }
};

saxsys.campus.adminController.initView = function() {
    //deleteButton am Slot wurde geklickt
    $(".delete_slot").click(function() {
        console.log("delete slot clicked");
        console.log("this.id:" + this.id);

        var slotID = saxsys.campus.utility.extractSlotId(this.id);
        var slotSelector = '#' + slotID + '_slot';

        console.log("slotID: " + slotID);
        console.log("slotSelector: " + slotSelector);

        saxsys.campus.restApi.deleteSlot(
                saxsys.campus.persistence.getSlotById(slotID),
                function() {
                }, function() {
        });

        $(slotSelector).remove();
        $("#admin_slot_list").listview("refresh");
    });

    //edit slot
    $(".edit_slot").click(function() {
        saxsys.campus.adminController.adminNewSlotEditing = false;

        var slotID = saxsys.campus.utility.extractSlotId(this.id);
        saxsys.campus.adminController.currentSlotInWork = slotID;

        var slot = saxsys.campus.persistence.getSlotById(slotID);

        var participantSuccess = function(data) {
            saxsys.campus.adminController.fillParticipantSelect(data);
            saxsys.campus.adminController.fillDetailView(slot);
        };

        var participantFail = function(err) {
            console.error("adding newSlot failed.");
            console.error(err);
        };

        if (slot.participants > 0) {
            saxsys.campus.restApi.getParticipants(slot, participantSuccess, participantFail);
        } else {
            saxsys.campus.adminController.clearParticipantSelect();
            saxsys.campus.adminController.fillDetailView(slot);
        }

    });

    $("#admin_slot_list").listview('refresh');
    $("#room_select").selectmenu("refresh");
};

saxsys.campus.adminController.clearParticipantSelect = function() {
    $("#participant_list").html("");
    $("#participant_list").selectmenu("refresh");
};

saxsys.campus.adminController.fillParticipantSelect = function(participants) {
    console.log("fillParticipantSelect");
    console.log(participants);

    //delete content of the selectmenu
    $("#participant_list").html('');

    for (var i in participants) {
        var participant = participants[i];
        saxsys.campus.renderer.renderParticipantOption("#participant_list", participant);
    }
    $("#participant_list").selectmenu("refresh");
};

saxsys.campus.adminController.fillDetailView = function(slot) {
    $("#title_input").val(slot.title);
    $("#content_input").val(slot.description);
    $("#room_select").val(slot.roomId).selectmenu('refresh');
    $("#free_capacity").text(slot.capacity - slot.participants);
    $("#start_time_input").val(slot.starttime);
    $("#end_time_input").val(slot.endtime);
    $("#speaker_input").val(slot.speaker);
    $("#capacity_input").val(slot.capacity);
    $("#participants_hidden_input").val(slot.participants);
    $("#slot_detail_header").text('Slot bearbeiten');
    $("#admin_detail_popup").popup("open");
};

saxsys.campus.adminController.saveNewSlot = function() {
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
    newSlot.starttime = slotStarttime; //saxsys.campus.utility.convertTimeStrToMillis(slotStarttime);
    newSlot.endtime = slotEndtime; //saxsys.campus.utility.convertTimeStrToMillis(slotEndtime);
    newSlot.speaker = slotSpeaker;
    newSlot.capacity = capacity;

    var success = function(data) {
        console.log("newSlot added successfully.");
        console.log(data);
        var jsonSlot = saxsys.campus.utility.convertJsonSlotToViewSlot(data.responseText);
        saxsys.campus.persistence.addNewSlot(jsonSlot);
        //insert new slot into slotlist
        saxsys.campus.renderer.renderAdminViewSlot("#admin_slot_list", jsonSlot);
        saxsys.campus.adminController.initView();
    };
    var fail = function(err) {
        console.error("adding newSlot failed.");
        console.error(err);
    };

    saxsys.campus.restApi.addSlot(newSlot, success, fail);


};

saxsys.campus.adminController.updateExistingSlot = function() {
    console.log("update existing Slot");
    var slotID = saxsys.campus.adminController.currentSlotInWork;
    var slotTitle = $("#title_input").val();
    var slotDescription = $("#content_input").val();
    var slotRoomId = $("#room_select").val();
    var slotStarttime = $("#start_time_input").val();
    var slotEndtime = $("#end_time_input").val();
    var slotSpeaker = $("#speaker_input").val();
    var slotCapacity = $("#capacity_input").val();
    var slotParticipants = $("#participants_hidden_input").val();

    var slot = new UpdateSlot(slotID, slotTitle);
    slot.description = slotDescription;
    slot.room = slotRoomId;
    slot.starttime = saxsys.campus.utility.convertTimeStrToMillis(slotStarttime);
    slot.endtime = saxsys.campus.utility.convertTimeStrToMillis(slotEndtime);
    slot.speaker = slotSpeaker;
    slot.capacity = slotCapacity;

    var jsonSlot = new Slot(slotID, slotTitle);
    jsonSlot.description = slotDescription;
    jsonSlot.roomId = slotRoomId;
    jsonSlot.starttime = slotStarttime;
    jsonSlot.endtime = slotEndtime;
    jsonSlot.speaker = slotSpeaker;
    jsonSlot.capacity = slotCapacity;
    jsonSlot.participants = slotParticipants;

    var success = function(data) {
        console.log("Slot updated successfully.");
        console.log(data);

        saxsys.campus.persistence.updateSlot(jsonSlot);
        saxsys.campus.adminController.fillAdminSlotList();
        saxsys.campus.adminController.initView();
    };
    var fail = function(err) {
        var error = jQuery.parseJSON(err.responseText);
        $("#admin_error_output").text('FEHLER: ' + error.detail);
        $("#admin_error_output").popup("open");
        setTimeout(function() {
            $("#admin_error_output").popup("close");
        }, 3000);
    };

    saxsys.campus.restApi.updateSlot(slot, success, fail);
};
saxsys.campus.adminController.generateExportCsv = function (){
    var csvString = "";
    var slots = saxsys.campus.persistence.slots;
    var participants = saxsys.campus.persistence.getParticipantsBySlot();
    csvString = saxsys.campus.renderer.renderCampusCsvExport(slots, participants);
    return csvString;
};
