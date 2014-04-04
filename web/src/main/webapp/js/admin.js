/*
 * Controller javascript für die Admin-View 
 */
var adminNewSlotEditing = false;
var currentSlotInWork = -1;

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
}

var fillSlotList = function(){
  var slots = saxoniaCampusPersistance.slots;  
  for(var i in slots){
      var slot = slots[i];
      saxoniaCampusRenderer.renderAdminViewSlot("#admin_slot_list", slot);
  }
  
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

        $(slotSelector).remove();
        $("#admin_slot_list").listview("refresh");
    });

    //edit slot
    $(".edit_slot").click(function() {
        adminNewSlotEditing = false;
        console.log("edit slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        console.log("slotID: " + slotID);

        currentSlotInWork = slotID;
                
        console.log("get slot-data from persistence");
        var slot = saxoniaCampusPersistance.getSlotById(slotID);

        console.log("got slot: " + slot);
        console.log("fill form in detail view.");

        console.log("slot.title: " + slot.title);
        $("#title_input").val(slot.title);

        console.log("slot.description: " + slot.description);
        $("#content_input").val(slot.description);

        console.log("slot.room: " + slot.room);
        $("#room_input").val(slot.room);

        console.log("slot.starttime: " + slot.starttime);
        $("#start_time_input").val(slot.starttime);

        console.log("slot.endtime: " + slot.endtime);
        $("#end_time_input").val(slot.endtime);

        console.log("slot.speaker: " + slot.speaker);
        $("#speaker_input").val(slot.speaker);

        console.log("slot.participants: " + slot.participants);
        $("#attendees_input").val(slot.participants);

        console.log("show detail view.");
        $("#admin_detail_view").show();
    });

    $("#admin_slot_list").listview('refresh');
};

var saveNewSlot = function() {
    var slotID = saxoniaCampusPersistance.getNextAvailableSlotId();
    var slotTitle = $("#title_input").val();
    var slotDescription = $("#content_input").val();
    var slotRoom = $("#room_input").val();
    var slotStarttime = $("#start_time_input").val();
    var slotEndtime = $("#end_time_input").val();
    var slotSpeaker = $("#speaker_input").val();
    var slotParticipants = $("#attendees_input").val();

    var newSlot = new Slot(slotID, slotTitle);
    newSlot.description = slotDescription;
    newSlot.room = slotRoom;
    newSlot.starttime = slotStarttime;
    newSlot.endtime = slotEndtime;
    newSlot.speaker = slotSpeaker;
    newSlot.participants = slotParticipants;

    saxoniaCampusPersistance.addNewSlot(newSlot);

    //insert new slot into slotlist
    saxoniaCampusRenderer.renderAdminViewSlot("#admin_slot_list", newSlot);
    initAdminview();
}

var updateExistingSlot = function() {
    console.log("update existing Slot");
    var slotID = currentSlotInWork;
    var slotTitle = $("#title_input").val();
    var slotDescription = $("#content_input").val();
    var slotRoom = $("#room_input").val();
    var slotStarttime = $("#start_time_input").val();
    var slotEndtime = $("#end_time_input").val();
    var slotSpeaker = $("#speaker_input").val();
    var slotParticipants = $("#attendees_input").val();
    
    var slot = new Slot(slotID, slotTitle);
    slot.description = slotDescription;
    slot.room = slotRoom;
    slot.starttime = slotStarttime;
    slot.endtime = slotEndtime;
    slot.speaker = slotSpeaker;
    slot.participants = slotParticipants;
    
    saxoniaCampusPersistance.updateSlot(slot);
    $('#'+slot.id+'_slot').html(saxoniaCampusRenderer.generateInnerSlot(slot));
    initAdminview();
};

$(function() {
    saxoniaCampusPersistance.init();
    fillSlotList();
    initAdminview();

    // click new slot button
    $("#new_slot_btn").click(function() {
        adminNewSlotEditing = true;
        console.log("show detailView");
        $("#admin_detail_view").show();
    });

    // click save button
    $("#save_slot_details_btn").click(function() {

        if (adminNewSlotEditing) {
            saveNewSlot();
        } else {
            updateExistingSlot();
        }
        $("#cancel_btn").click();
        currentSlotInWork = -1;
    });
    
    // click cancel button
    $("#cancel_btn").click(function(){
        currentSlotInWork = -1;
        $("#admin_detail_view").hide();
    });
});
