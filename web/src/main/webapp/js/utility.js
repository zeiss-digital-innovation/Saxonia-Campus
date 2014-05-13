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
