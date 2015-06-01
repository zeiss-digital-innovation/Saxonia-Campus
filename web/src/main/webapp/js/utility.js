/* 
 * Utilities to convert Objects
 */

saxsys.campus.utility.convertMillisToTimeStr = function(millis) {
    var date = new Date(millis);
    var hourStr = saxsys.campus.utility.leftFillStr("" + date.getHours(), 2, "0");
    var minuteStr = saxsys.campus.utility.leftFillStr("" + date.getMinutes(), 2, "0");
    var timeStr = hourStr + ':' + minuteStr;

    return timeStr;
};

saxsys.campus.utility.convertTimeStrToMillis = function(timeStr) {
    var date = new Date();
    var splittetStr = timeStr.split(':');
    var hours = splittetStr[0];
    var minutes = splittetStr[1];

    date.setYear(2014);
    date.setMonth(6);
    date.setDate(3);
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.getTime();
};

saxsys.campus.utility.convertRestSlotToViewSlot = function(restSlot) {
    var slotId = restSlot.id;
    var slotTitle = restSlot.title;
    var room = saxsys.campus.utility.getRoomFromRestSlot(restSlot);
    var slot = new Slot(slotId, slotTitle);

    slot.description = restSlot.description;
    slot.room = room.roomnumber;
    slot.roomId = room.id;
    slot.starttime = restSlot.starttime; //saxsys.campus.utility.convertMillisToTimeStr(restSlot.starttime);
    slot.endtime = restSlot.endtime; //saxsys.campus.utility.convertMillisToTimeStr(restSlot.endtime);
    slot.speaker = restSlot.speaker;
    slot.capacity = restSlot.capacity;
    slot.participants = restSlot.participants;

    return slot;
};

saxsys.campus.utility.convertJsonSlotToViewSlot = function(jsonSlot) {
    var newSlot = JSON.parse(jsonSlot);

    return saxsys.campus.utility.convertRestSlotToViewSlot(newSlot);
};

saxsys.campus.utility.getRoomFromRestSlot = function(restSlot) {
    var room = restSlot._embedded.room;

    return room;
};

saxsys.campus.utility.leftFillStr = function(str, length, fillChar) {
    while (str.length < length) {
        str = fillChar + str;
    }
    return str;
};

saxsys.campus.utility.make_base_auth = function(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
};

/**
 * Testet ob die Zeiten zweier Slots miteinander kollidieren.
 * @param {Slot} slot1 Erster zu vergleichender Slot
 * @param {Slot} slot2 Zweiter zu vergleichender Slot
 * @returns {boolean} true wenn eine Collision besteht, false wenn nicht.
 */
saxsys.campus.utility.collisionTest = function(slot1, slot2) {
    var collision = true;
//    console.log("Slot1.start: "+slot1.starttime);
//    console.log("Slot1.ende: "+slot1.endtime);
//    console.log("Slot2.start: "+slot2.starttime);
//    console.log("Slot2.ende: "+slot2.endtime);

    var slot1StartMillis = saxsys.campus.utility.convertTimeStrToMillis(slot1.starttime);
    var slot1EndeMillis = saxsys.campus.utility.convertTimeStrToMillis(slot1.endtime);
    var slot2StartMillis = saxsys.campus.utility.convertTimeStrToMillis(slot2.starttime);
    var slot2EndeMillis = saxsys.campus.utility.convertTimeStrToMillis(slot2.endtime);

//    console.log("Slot1.startMillis: "+slot1StartMillis);
//    console.log("Slot1.endeMillis: "+slot1EndeMillis);
//    console.log("Slot2.startMillis: "+slot2StartMillis);
//    console.log("Slot2.endeMillis: "+slot2EndeMillis);

    if ((slot1StartMillis < slot2StartMillis) && (slot1EndeMillis <= slot2StartMillis)) {
        collision = false;
    }

    if ((slot2StartMillis < slot1StartMillis) && (slot2EndeMillis <= slot1StartMillis)) {
        collision = false;
    }

    return collision;
};

saxsys.campus.utility.slotComparator = function(a, b) {
    var differenz = saxsys.campus.utility.convertTimeStrToMillis(a.starttime) - saxsys.campus.utility.convertTimeStrToMillis(b.starttime);
    return differenz;
};

saxsys.campus.utility.extractSlotId = function(element_id) {
    return element_id.split('_')[0];
};

saxsys.campus.utility.startCsvDownload = function(csvString, fileName) {
    var a = document.createElement("a");
    a.href = "data:application/csv;charset=utf-8," + encodeURIComponent(csvString);
    a.target = "_blank";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
};

saxsys.campus.utility.displayUserError = function(message, duration) {
    $("#user_error_output").text(message);
    $("#user_error_output").popup("open");
    setTimeout(function() {
        $("#user_error_output").popup("close");
    }, duration);
};