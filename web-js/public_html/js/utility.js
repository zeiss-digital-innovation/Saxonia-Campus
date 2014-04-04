/* 
 * Utilities to convert Objects
 */
var saxoniaCampusUtil = {}

saxoniaCampusUtil.convertMillisToTimeStr = function(millis) {
    var date = new Date(millis);
    var hourStr = saxoniaCampusUtil.leftFillStr(""+date.getHours(),2,"0");
    var minuteStr = saxoniaCampusUtil.leftFillStr(""+date.getMinutes(),2,"0");
    var timeStr =  hourStr + ':' + minuteStr;

    return timeStr;
};

saxoniaCampusUtil.convertRestSlotToViewSlot = function(restSlot) {
    var slotId = restSlot.id;
    var slotTitle = restSlot.title;
    var room = saxoniaCampusUtil.getRoomFromRestSlot(restSlot);
    var slot = new Slot(slotId,slotTitle);

    slot.description = restSlot.description;
    slot.room = room.roomnumber;
    slot.roomId = room.id;
    slot.starttime = saxoniaCampusUtil.convertMillisToTimeStr(restSlot.starttime);
    slot.endtime = saxoniaCampusUtil.convertMillisToTimeStr(restSlot.endtime);
    slot.speaker = restSlot.speaker;
    slot.participants = room.capacity;
    
    return slot;
};

saxoniaCampusUtil.getRoomFromRestSlot = function(restSlot){
    var room = restSlot._embedded.room;
    
    return room;
}

saxoniaCampusUtil.leftFillStr = function(str,length,fillChar){
  while(str.length < length)  {
    str = fillChar + str;  
  }
  return str;
};