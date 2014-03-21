var saxoniaCampusRenderer = {};

saxoniaCampusRenderer.renderAdminViewSlot = function(slotListSelector,slot){
    var slotText = '<a id="' + slot.id + '_edit" class="edit_slot">'  
            + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis " 
            + slot.endtime + '</p></a>';
    $(slotListSelector).append('<li id="' + slot.id + '_slot">' + slotText 
            + '<a class="delete_slot" id="' + slot.id + '_delete"></a></li>');
};

saxoniaCampusRenderer.renderUserViewBookedSlot = function(slotListSelector,slot){
    var slotHtml = '<li id="'+slot.id+'_slot"><a>'+slot.title+'<p class="ui-li-aside">'
            + slot.starttime + " bis " + slot.endtime + '</p></a><a id="'+slot.id
            +'_delete_slot" class="delete_slot"></a></li>';
    $(slotListSelector).append(slotHtml);
};