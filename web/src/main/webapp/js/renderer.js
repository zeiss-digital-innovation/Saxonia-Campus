/**
 * Renderer für die UI-Elemente der user und adminView 
 */

var saxoniaCampusRenderer = {};

saxoniaCampusRenderer.generateInnerSlot = function(slot) {
    var innerSlot = '<a id="'
            + slot.id + '_edit" class="edit_slot">'
            + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis "
            + slot.endtime + '</p></a>' + '<a class="delete_slot" id="'
            + slot.id + '_delete"></a>';

    return innerSlot;
};

saxoniaCampusRenderer.generateAdminViewSlot = function(slot) {
    var innerSlot = saxoniaCampusRenderer.generateInnerSlot(slot);
    var slotHtml = '<li id="' + slot.id + '_slot">' + innerSlot + '</li>';

    return slotHtml;
};

saxoniaCampusRenderer.renderAdminViewSlot = function(slotListSelector, slot) {
    var adminViewSlotHtml = saxoniaCampusRenderer.generateAdminViewSlot(slot);

    $(slotListSelector).append(adminViewSlotHtml);
};

saxoniaCampusRenderer.renderRoomOption = function(roomSelectSelector, room) {
    var option = '<option value="' + room.id + '">' + room.roomnumber + '</option>';

    $(roomSelectSelector).append(option);
};

saxoniaCampusRenderer.renderUserViewBookedSlot = function(slotListSelector, slot) {
    var slotHtml = '<li id="' + slot.id + '_slot"><a><span class="booked_slot_title">' + slot.title + '</span><p class="ui-li-aside">'
            + slot.starttime + " bis " + slot.endtime + '</p></a><a id="' + slot.id
            + '_delete_slot" class="delete_slot"></a></li>';
    $(slotListSelector).append(slotHtml);
};

saxoniaCampusRenderer.renderUserViewDetailSlot = function(slotListSelector, slot) {
    var freeCapacity = (slot.capacity - slot.participants);
    var slotHtml = '<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">'
            + '<h3>' + slot.title + ' - ' + slot.starttime + ' bis ' + slot.endtime + '</h3>'
            + '<table>'
            + '<tr><td colspan="2">Beschreibung: </td>';

    //Buchen-Button nur rendern, wenn freie Plätze vorhanden sind
    if (freeCapacity > 0) {
        slotHtml = slotHtml + '<td><button class="book_slot_btn" id="' + slot.id
                + '_book_btn" data-mini="true" data-inline="true">Buchen</button></td>';
    } else {
        slotHtml = slotHtml + '<td></td>';
    }

    slotHtml = slotHtml + '</tr>'
            + '<tr><td colspan="2">' + slot.description + '</td><td></td></tr>'
            + '<tr><td>Raum:<br>' + slot.room + '</td>'
            + '<td>Speaker:<br>' + slot.speaker + '</td>'
            + '<td>Freie Plätze:<br><span id="' + slot.id + '_free">' + freeCapacity + '</span></td>'
            + '</tr>'
            + '</table>'
            + '</div>';

    $(slotListSelector).append(slotHtml);
};