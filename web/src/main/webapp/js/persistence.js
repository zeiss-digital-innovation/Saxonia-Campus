/*
 * Persistence module for communication with the REST-Service
 * 
 */

var saxsys = saxsys || {};
saxsys.campus = saxsys.campus || {};
saxsys.campus.persistence = saxsys.campus.persistence || {};


saxsys.campus.persistence.REST_SERVICE_ROOMS_URL = location.protocol + "//" + location.host + "/rest/rooms";
var LOCATION_PROTOCOL = location.protocol;

var Slot = function(slotID, slotTitle) {
    this.id = slotID;
    this.title = slotTitle;
    this.description = "Bitte Inhalt eingeben.";
    this.room = 1;
    this.starttime = "07:00";
    this.endtime = "16:30";
    this.speaker = "Marco Dierenfeldt";
    this.participants = 20;
};

var UpdateSlot = function(slotID, slotTitle) {
    this.id = slotID;
    this.title = slotTitle;
    this.description = "Bitte Inhalt eingeben.";
    this.room = 1;
    this.starttime = "07:00";
    this.endtime = "16:30";
    this.speaker = "Marco Dierenfeldt";
};

var SaveSlot = function(slotTitle) {
    this.title = slotTitle;
    this.description = "Bitte Inhalt eingeben.";
    this.room = 1;
    this.starttime = "07:00";
    this.endtime = "16:30";
    this.speaker = "Marco Dierenfeldt";
};

var saxoniaCampusPersistance = {};

saxsys.campus.persistence.userSlots = [];
saxsys.campus.persistence.sortedUserSlotIdMapping = [];
saxsys.campus.persistence.sortedSlotIdMapping = [];

saxsys.campus.persistence.mapSortedSlots = function() {
    for (var i in saxoniaCampusPersistance.slots) {
        var slotID = saxoniaCampusPersistance.slots[i].id;
        saxsys.campus.persistence.sortedSlotIdMapping[slotID] = i;
    }
};

saxoniaCampusPersistance.sortUserSlots = function() {
    saxsys.campus.persistence.userSlots.sort(saxoniaCampusUtil.slotComparator);
};

saxoniaCampusPersistance.getUserSlots = function() {
    return saxsys.campus.persistence.userSlots;
};

saxoniaCampusPersistance.initSortedUserSlotIdMapping = function() {
    var tmpSlotArray = [];
    for (var i in saxsys.campus.persistence.userSlots) {
        var currentSlot = saxsys.campus.persistence.userSlots[i];
        tmpSlotArray[currentSlot.id] = i;
    }
    saxsys.campus.persistence.sortedUserSlotIdMapping = tmpSlotArray;
};

saxoniaCampusPersistance.addUserSlot = function(slotID) {
    var tmpSlot = saxoniaCampusPersistance.getSlotById(slotID);
    saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = tmpSlot;
    saxoniaCampusPersistance.sortUserSlots();
    saxoniaCampusPersistance.initSortedUserSlotIdMapping();
};

saxoniaCampusPersistance.removeUserSlot = function(slotID) {
    var sortedID = saxsys.campus.persistence.sortedUserSlotIdMapping[slotID];
    saxsys.campus.persistence.userSlots.splice(sortedID, 1);
    saxsys.campus.persistence.sortedUserSlotIdMapping.splice(slotID, 1);
    saxoniaCampusPersistance.initSortedUserSlotIdMapping();
};

saxoniaCampusPersistance.initUserSlots = function(userSlots) {
    saxsys.campus.persistence.userSlots = [];
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            var slot = saxoniaCampusPersistance.getSlotById(userSlots[i].id);
            saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = slot;
            saxoniaCampusPersistance.sortUserSlots();
        }
    } else {
        //only one slot
        var slot = saxoniaCampusPersistance.getSlotById(userSlots.id);
        saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = slot;
    }
    saxoniaCampusPersistance.sortUserSlots();
    saxoniaCampusPersistance.initSortedUserSlotIdMapping();
};

saxoniaCampusPersistance.initSlots = function() {
    var authString = $.cookie("id");
    console.log("authstring" + authString);

    saxoniaCampusPersistance.slots = [];
    var success = function(data) {
        console.log('slots load successfull');
        for (var i in data) {
            var currentSlot = data[i];

            saxoniaCampusPersistance.slots[currentSlot.id] =
                    saxoniaCampusUtil.convertRestSlotToViewSlot(currentSlot);
        }
        saxoniaCampusPersistance.sortAndMapSlots();
    };
    var error = function(data) {
        console.log('error occured!');
    };

    saxoniaCampusRestApi.getSlots(success, error);

};

saxoniaCampusPersistance.sortAndMapSlots = function() {
    saxoniaCampusPersistance.slots.sort(saxoniaCampusUtil.slotComparator);
    saxsys.campus.persistence.mapSortedSlots();
}

saxoniaCampusPersistance.initRooms = function() {
    var authString = $.cookie("id");
    console.log("authstring" + authString);
    saxoniaCampusPersistance.rooms = [];
    $.ajax
            ({
                type: "GET",
                url: saxsys.campus.persistence.REST_SERVICE_ROOMS_URL,
                dataType: 'json',
                async: false,
                data: '{}',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', authString);
                },
                success: function(data) {
                    console.log('slots load successfull');
                    saxoniaCampusPersistance.rooms = data._embedded.rooms;
                },
                error: function() {
                    console.log('error occured!');
                }
            });
};

saxoniaCampusPersistance.init = function() {
    console.log("before slot init");
    this.initSlots();
    console.log("after slot init");
    console.log("before room init");
    this.initRooms();
    console.log("after room init");
};

saxoniaCampusPersistance.getSlotById = function(slotID) {
    console.log("saxoniaCampusPersistance.getSlotById(" + slotID + ") called");
    var sortedSlotId = saxsys.campus.persistence.sortedSlotIdMapping[slotID];

    return saxoniaCampusPersistance.slots[sortedSlotId];
};

saxoniaCampusPersistance.addNewSlot = function(slot) {
    saxoniaCampusPersistance.slots[saxoniaCampusPersistance.slots.length] = slot;
    saxoniaCampusPersistance.slots.sort(saxoniaCampusUtil.slotComparator);
    saxsys.campus.persistence.mapSortedSlots();
};

saxoniaCampusPersistance.updateSlot = function(slot) {
    var sortedSlotId = saxsys.campus.persistence.sortedSlotIdMapping[slot.id];
    saxoniaCampusPersistance.slots[sortedSlotId] = slot;
    saxoniaCampusPersistance.sortAndMapSlots();
};

saxoniaCampusPersistance.isSlotBooked = function(slotId) {
    var sortedId = saxsys.campus.persistence.sortedUserSlotIdMapping[slotId];

    return sortedId !== undefined;
};
saxoniaCampusPersistance.getParticipantsBySlot = function(){
  saxoniaCampusPersistance.tmpParticipants = [];
 
    for(var i in saxoniaCampusPersistance.slots){
      var slot = saxoniaCampusPersistance.slots[i];
      
        var participantSuccess = function(data) {
            saxoniaCampusPersistance.tmpParticipants[slot.id] = data;
        };

        var participantFail = function(err) {
            console.error("adding newSlot failed.");
            console.error(err);
        };

        if (slot.participants > 0) {
            saxoniaCampusRestApi.getParticipants(slot, participantSuccess, participantFail);
        } else {
            saxoniaCampusPersistance.tmpParticipants[slot.id] =[];
        }
        
  }
  return saxoniaCampusPersistance.tmpParticipants;
};