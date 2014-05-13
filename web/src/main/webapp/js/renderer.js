var saxoniaCampusRenderer = {};

saxoniaCampusRenderer.generateInnerSlot = function(slot){
    var innerSlot = '<a id="' 
          + slot.id + '_edit" class="edit_slot">'
          + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis "
          + slot.endtime + '</p></a>' + '<a class="delete_slot" id="' 
          + slot.id + '_delete"></a>';
  
    return innerSlot;
}

saxoniaCampusRenderer.generateAdminViewSlot = function(slot){
  var innerSlot = saxoniaCampusRenderer.generateInnerSlot(slot);
  var slotHtml = '<li id="' + slot.id + '_slot">' + innerSlot + '</li>';
  
    return slotHtml;
};

saxoniaCampusRenderer.renderAdminViewSlot = function(slotListSelector, slot) {
    var adminViewSlotHtml = saxoniaCampusRenderer.generateAdminViewSlot(slot);
    
    $(slotListSelector).append(adminViewSlotHtml);
};

saxoniaCampusRenderer.renderUserViewBookedSlot = function(slotListSelector, slot) {
    var slotHtml = '<li id="' + slot.id + '_slot"><a>' + slot.title + '<p class="ui-li-aside">'
            + slot.starttime + " bis " + slot.endtime + '</p></a><a id="' + slot.id
            + '_delete_slot" class="delete_slot"></a></li>';
    $(slotListSelector).append(slotHtml);
};

saxoniaCampusRenderer.renderUserViewDetailSlot = function(slotListSelector, slot) {
    var slotHtml = '<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">'
            + '<h3>' + slot.title + ' - ' + slot.starttime + ' bis ' + slot.endtime + '</h3>'
            + '<table>'
            + '<tr><td colspan="2">Beschreibung: </td>'
            + '<td><button class="book_slot_btn" id="' + slot.id
            + '_book_btn" data-mini="true" data-inline="true">Buchen</button></td>'
            + '</tr>'
            + '<tr><td colspan="2">' + slot.description + '</td><td></td></tr>'
            + '<tr><td>Raum: '+slot.room+'</td>'
            + '<td>Speaker: '+slot.speaker+'</td>'
            + '<td>Freie Plätze: '+slot.participants+'</td>'
            + '</tr>'
            + '</table>'
            + '</div>';
    
    $(slotListSelector).append(slotHtml);
};