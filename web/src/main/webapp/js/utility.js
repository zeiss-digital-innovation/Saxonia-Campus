/* 
 * Utilities to convert Objects
 */

var saxoniaCampusUtil = {};

saxoniaCampusUtil.convertMillisToTimeStr = function(millis) {
    var date = new Date(millis);
    var hourStr = saxoniaCampusUtil.leftFillStr("" + date.getHours(), 2, "0");
    var minuteStr = saxoniaCampusUtil.leftFillStr("" + date.getMinutes(), 2, "0");
    var timeStr = hourStr + ':' + minuteStr;

    return timeStr;
};

saxoniaCampusUtil.convertTimeStrToMillis = function(timeStr){
    var date = new Date();
    var splittetStr = timeStr.split(':');
    var hours = splittetStr[0];
    var minutes = splittetStr[1];
    
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.getTime();
};

saxoniaCampusUtil.convertRestSlotToViewSlot = function(restSlot) {
    var slotId = restSlot.id;
    var slotTitle = restSlot.title;
    var room = saxoniaCampusUtil.getRoomFromRestSlot(restSlot);
    var slot = new Slot(slotId, slotTitle);

    slot.description = restSlot.description;
    slot.room = room.roomnumber;
    slot.roomId = room.id;
    slot.starttime = saxoniaCampusUtil.convertMillisToTimeStr(restSlot.starttime);
    slot.endtime = saxoniaCampusUtil.convertMillisToTimeStr(restSlot.endtime);
    slot.speaker = restSlot.speaker;
    slot.capacity = restSlot.capacity;
    slot.participants = restSlot.participants;

    return slot;
};

saxoniaCampusUtil.convertJsonSlotToViewSlot = function(jsonSlot){
    var newSlot = JSON.parse(jsonSlot);
    
    return saxoniaCampusUtil.convertRestSlotToViewSlot(newSlot);
};

saxoniaCampusUtil.getRoomFromRestSlot = function(restSlot) {
    var room = restSlot._embedded.room;

    return room;
};

saxoniaCampusUtil.leftFillStr = function(str, length, fillChar) {
    while (str.length < length) {
        str = fillChar + str;
    }
    return str;
};

saxoniaCampusUtil.make_base_auth = function(user, password) {
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
saxoniaCampusUtil.collisionTest = function(slot1, slot2){
    var collision = true;
    console.log("Slot1.start: "+slot1.starttime);
    console.log("Slot1.ende: "+slot1.endtime);
    console.log("Slot2.start: "+slot2.starttime);
    console.log("Slot2.ende: "+slot2.endtime);
    
    var slot1StartMillis = saxoniaCampusUtil.convertTimeStrToMillis(slot1.starttime);
    var slot1EndeMillis = saxoniaCampusUtil.convertTimeStrToMillis(slot1.endtime);
    var slot2StartMillis = saxoniaCampusUtil.convertTimeStrToMillis(slot2.starttime);
    var slot2EndeMillis = saxoniaCampusUtil.convertTimeStrToMillis(slot2.endtime);
    
    console.log("Slot1.startMillis: "+slot1StartMillis);
    console.log("Slot1.endeMillis: "+slot1EndeMillis);
    console.log("Slot2.startMillis: "+slot2StartMillis);
    console.log("Slot2.endeMillis: "+slot2EndeMillis);
    
    if((slot1StartMillis<slot2StartMillis)&&(slot1EndeMillis<=slot2StartMillis)){
        collision = false;
    }
    
    if((slot2StartMillis<slot1StartMillis)&&(slot2EndeMillis<=slot1StartMillis)){
        collision = false;
    }
    
    return collision;
};

saxoniaCampusUtil.slotComparator = function(a,b){
    var differenz = saxoniaCampusUtil.convertTimeStrToMillis(a.starttime) - saxoniaCampusUtil.convertTimeStrToMillis(b.starttime);
    return differenz;
};
