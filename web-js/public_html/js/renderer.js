var saxoniaCampusRenderer = {};

saxoniaCampusRenderer.renderAdminViewSlot = function(slotListSelector,slot){
    var slotText = '<a id="' + slot.id + '_edit" class="edit_slot">'  
            + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis " 
            + slot.endtime + '</p></a>';
    $(slotListSelector).append('<li id="' + slot.id + '_slot">' + slotText 
            + '<a class="delete_slot" id="' + slot.id + '_delete"></a></li>');
};