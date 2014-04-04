var Slot= function(slotID, slotTitle){
    this.id = slotID;
    this.title = slotTitle;
    this.description = "Bitte Inhalt eingeben.";
    this.room = "FFP 911";
    this.starttime = "07:00";
    this.endtime = "16:30";
    this.speaker = "Marco Dierenfeldt";
    this.participants = 20;
    
};

var saxoniaCampusPersistance = {};

saxoniaCampusPersistance.slots = [];
saxoniaCampusPersistance.slots[1] = new Slot(1, "Slot 1 Titel");
saxoniaCampusPersistance.slots[2] = new Slot(2, "Slot 2 Titel");
saxoniaCampusPersistance.slots[3] = new Slot(3, "Slot 3 Titel");
saxoniaCampusPersistance.slots[4] = new Slot(4, "Slot 4 Titel");
saxoniaCampusPersistance.slots[5] = new Slot(5, "Slot 5 Titel");
saxoniaCampusPersistance.slots[6] = new Slot(6, "Slot 6 Titel");
saxoniaCampusPersistance.slots[7] = new Slot(7, "Slot 7 Titel");
saxoniaCampusPersistance.slots[8] = new Slot(8, "Slot 8 Titel");
saxoniaCampusPersistance.slots[9] = new Slot(9, "Slot 9 Titel");
saxoniaCampusPersistance.slots['n'] = new Slot('n', "Slot n Titel");

saxoniaCampusPersistance.getSlotById = function(slotID){
    console.log("saxoniaCampusPersistance.getSlotById("+slotID+") called");
    return saxoniaCampusPersistance.slots[slotID];  
};

saxoniaCampusPersistance.getNextAvailableSlotId = function(){
  return saxoniaCampusPersistance.slots.length +1;  
};

saxoniaCampusPersistance.addNewSlot = function(slot){
   saxoniaCampusPersistance.slots[slot.id] = slot;
};

saxoniaCampusPersistance.updateSlot = function(slot){
     saxoniaCampusPersistance.slots[slot.id] = slot;
}