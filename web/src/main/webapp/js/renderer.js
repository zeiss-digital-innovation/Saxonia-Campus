/**
 * Renderer für die UI-Elemente der user und adminView 
 */

saxsys.campus.renderer.CSV_SEPERATOR = ";";
saxsys.campus.renderer.CSV_LINE_END = "\r\n";

saxsys.campus.renderer.gridclassArray = ["dummy", "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c"];

saxsys.campus.renderer.generateInnerSlot = function(slot) {
    var innerSlot = '<a id="'
            + slot.id + '_edit" class="edit_slot">'
            + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis "
            + slot.endtime + '</p>';

    if (slot.participants > 0) {
        innerSlot = innerSlot + '<span class="ui-li-count">'
                + slot.participants + '</span>';
    }

    innerSlot = innerSlot + '</a><a class="delete_slot" id="'
            + slot.id + '_delete"></a>';

    return innerSlot;
};

saxsys.campus.renderer.generateAdminViewSlot = function(slot) {
    var isSlotFull = (slot.capacity - slot.participants) === 0;
    var slotTheme = '';

    if (isSlotFull) {
        slotTheme = 'data-theme="c"';
    }

    var innerSlot = saxsys.campus.renderer.generateInnerSlot(slot);
    var slotHtml = '<li id="' + slot.id + '_slot"' + slotTheme + '>' + innerSlot + '</li>';

    return slotHtml;
};

saxsys.campus.renderer.renderAdminViewSlot = function(slotListSelector, slot) {
    var adminViewSlotHtml = saxsys.campus.renderer.generateAdminViewSlot(slot);

    $(slotListSelector).append(adminViewSlotHtml);
};

saxsys.campus.renderer.renderRoomOption = function(roomSelectSelector, room) {
    var option = '<option value="' + room.id + '">' + room.roomnumber + '</option>';

    $(roomSelectSelector).append(option);
};

saxsys.campus.renderer.renderParticipantOption = function(participantsSelectSelector, participant) {
    var option = '<option value="' + participant.username + '">' + participant.firstname + ' ' + participant.lastname + '</option>';

    $(participantsSelectSelector).append(option);
};

saxsys.campus.renderer.renderUserViewBookedSlot = function(slotListSelector, slot) {
    var slotHtml = '<li id="' + slot.id + '_slot"><a><span class="booked_slot_title">' + slot.title + '</span><p>'
            + slot.starttime + " bis " + slot.endtime + ' : Raum ' + slot.room + '</p></a><a id="' + slot.id
            + '_delete_slot" class="delete_slot"></a></li>';
    $(slotListSelector).append(slotHtml);
};

saxsys.campus.renderer.renderUserViewDetailSlot = function(slot) {
    var slotListSelector = '#' + slot.roomId + '_room_slotset';
    var isSlotBooked = saxsys.campus.persistence.isSlotBooked(slot.id);
    var freeCapacity = (slot.capacity - slot.participants);
    var showBookButton = (freeCapacity > 0) && (!isSlotBooked);

    var slotHtml = '<div data-role="collapsible" data-inset="true" '
            + 'data-collapsed-icon="carat-d" data-expanded-icon="carat-u" '
            + 'title="' + slot.title + '">'
            + '<h3>' + slot.title + ' <br> ' + slot.starttime + ' bis ' + slot.endtime + '</h3>'
            + '<table class="user_view_detail">'
            + '<tr><td colspan="2">Beschreibung: </td>';

    //Buchen-Button nur rendern, wenn freie Plätze vorhanden sind
    if (showBookButton) {
        slotHtml = slotHtml + '<td><button class="book_slot_btn" id="' + slot.id
                + '_book_btn" data-mini="true" data-inline="true">Buchen</button></td>';
    } else {
        slotHtml = slotHtml + '<td></td>';
    }

    slotHtml = slotHtml + '</tr>'
            + '<tr><td colspan="3"> <textarea id="content_input" readonly="true">' + slot.description + '</textarea></td></tr>'
            + '<tr><td>Raum:<br>' + slot.room + '</td>'
            + '<td>Speaker:<br>' + slot.speaker + '</td>'
            + '<td>Freie Plätze:<br><span id="' + slot.id + '_free">' + freeCapacity + '</span></td>'
            + '</tr>'
            + '</table>'
            + '</div>';

    $(slotListSelector).append(slotHtml);
};

saxsys.campus.renderer.renderRoomGrid = function(gridviewSelector, room) {
    var gridClass = saxsys.campus.renderer.gridclassArray[room.id];
    var roomSlotList = saxsys.campus.renderer.generateRoomSlotList(room);

    $(gridviewSelector).append('<div id="' + room.id + '_room_grid" class="'
            + gridClass + '">' + roomSlotList + '</div>');
};

saxsys.campus.renderer.generateRoomSlotList = function(room) {
    var roomSlotList = '<h4>Raum: ' + room.roomnumber + '</h4>'
            + '<div id="' + room.id + '_room_slotset" '
            + 'data-role="collapsibleset" data-mini="true"></div>';
    return roomSlotList;
};
saxsys.campus.renderer.renderCampusCsvExport = function(slots, participantsArray) {
    var csvString = "";
    for (var i in slots) {
        var slot = slots[i];
        var participans = participantsArray[slot.id];
        csvString = csvString + saxsys.campus.renderer.renderCampusCsvSlot(slot, participans);
    }
    return csvString;
};

saxsys.campus.renderer.renderCampusCsvSlot = function(slot, participants) {
    var csvString = "";
//    csvString = csvString + "SlotID" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + "Raum" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + "Titel" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + "Kapazität" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + "Speaker" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + "Teilnehmerzahl" + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + saxsys.campus.renderer.CSV_LINE_END;
    
//    csvString = csvString + slot.id + saxsys.campus.renderer.CSV_SEPERATOR;
    csvString = csvString + slot.title + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + slot.room + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + slot.capacity + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + slot.speaker + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + slot.participants + saxsys.campus.renderer.CSV_SEPERATOR;
//    csvString = csvString + saxsys.campus.renderer.CSV_LINE_END;
    for (var i in participants) {
        var participant = participants[i];
        csvString = csvString + participant.firstname + ' ' + participant.lastname +saxsys.campus.renderer.CSV_SEPERATOR;
    }
    csvString = csvString + saxsys.campus.renderer.CSV_LINE_END;
    return csvString;
};







