/*
 * Controller javascript für die User-View
 */

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
}

var fillSlotList = function(){
  var slots = saxoniaCampusPersistance.slots;  
  for(var i in slots){
      var slot = slots[i];
      saxoniaCampusRenderer.renderUserViewDetailSlot("#user_solot_container", slot);
  }
};

var initBookedListview = function(){
    $(".delete_slot").click(function() {
        console.log("delete slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        var slotSelector = '#user_booked_slot_list #' + slotID + '_slot';

        console.log("slotID: " + slotID);
        console.log("slotSelector: " + slotSelector);

        $(slotSelector).remove();
        $("#user_booked_slot_list").listview("refresh");
        $("#"+slotID+"_book_btn").toggle();
    });
    
    $("#user_booked_slot_list").listview("refresh");
}

var bookSlot = function(slotID){
    var slot = saxoniaCampusPersistance.getSlotById(slotID);
    saxoniaCampusRenderer.renderUserViewBookedSlot("#user_booked_slot_list", slot);
    
//    var slotHtml = '<li id="'+slotID+'_slot"><a>Slot '+slotID+' Title</a><a id="'+slotID+'_delete_slot" class="delete_slot"></a></li>';
//    $("#user_booked_slot_list").append(slotHtml);
    initBookedListview();
    //remove bookbutton
    $("#"+slotID+"_book_btn").toggle();
}

$(function() {
    fillSlotList();
    $("#user_solot_container").collapsibleset('refresh');
    initBookedListview();
    
    
    $(".book_slot_btn").click(function(){
        console.log("book-button clicked.");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);

        console.log("slotID: " + slotID);
        bookSlot(slotID);
    });
});
