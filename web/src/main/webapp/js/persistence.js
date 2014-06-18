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

saxsys.campus.persistence.userSlots = [];
saxsys.campus.persistence.sortedUserSlotIdMapping = [];
saxsys.campus.persistence.sortedSlotIdMapping = [];

saxsys.campus.persistence.mapSortedSlots = function() {
    for (var i in saxsys.campus.persistence.slots) {
        var slotID = saxsys.campus.persistence.slots[i].id;
        saxsys.campus.persistence.sortedSlotIdMapping[slotID] = i;
    }
};

saxsys.campus.persistence.sortUserSlots = function() {
    saxsys.campus.persistence.userSlots.sort(saxoniaCampusUtil.slotComparator);
};

saxsys.campus.persistence.getUserSlots = function() {
    return saxsys.campus.persistence.userSlots;
};

saxsys.campus.persistence.initSortedUserSlotIdMapping = function() {
    var tmpSlotArray = [];
    for (var i in saxsys.campus.persistence.userSlots) {
        var currentSlot = saxsys.campus.persistence.userSlots[i];
        tmpSlotArray[currentSlot.id] = i;
    }
    saxsys.campus.persistence.sortedUserSlotIdMapping = tmpSlotArray;
};

saxsys.campus.persistence.addUserSlot = function(slotID) {
    var tmpSlot = saxsys.campus.persistence.getSlotById(slotID);
    saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = tmpSlot;
    saxsys.campus.persistence.sortUserSlots();
    saxsys.campus.persistence.initSortedUserSlotIdMapping();
};

saxsys.campus.persistence.removeUserSlot = function(slotID) {
    var sortedID = saxsys.campus.persistence.sortedUserSlotIdMapping[slotID];
    saxsys.campus.persistence.userSlots.splice(sortedID, 1);
    saxsys.campus.persistence.sortedUserSlotIdMapping.splice(slotID, 1);
    saxsys.campus.persistence.initSortedUserSlotIdMapping();
};

saxsys.campus.persistence.initUserSlots = function(userSlots) {
    saxsys.campus.persistence.userSlots = [];
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            var slot = saxsys.campus.persistence.getSlotById(userSlots[i].id);
            saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = slot;
            saxsys.campus.persistence.sortUserSlots();
        }
    } else {
        //only one slot
        var slot = saxsys.campus.persistence.getSlotById(userSlots.id);
        saxsys.campus.persistence.userSlots[saxsys.campus.persistence.userSlots.length] = slot;
    }
    saxsys.campus.persistence.sortUserSlots();
    saxsys.campus.persistence.initSortedUserSlotIdMapping();
};

saxsys.campus.persistence.initSlots = function() {
    var authString = $.cookie("id");
    console.log("authstring" + authString);

    saxsys.campus.persistence.slots = [];
    var success = function(data) {
        console.log('slots load successfull');
        for (var i in data) {
            var currentSlot = data[i];

            saxsys.campus.persistence.slots[currentSlot.id] =
                    saxoniaCampusUtil.convertRestSlotToViewSlot(currentSlot);
        }
        saxsys.campus.persistence.sortAndMapSlots();
    };
    var error = function(data) {
        console.log('error occured!');
    };

    saxoniaCampusRestApi.getSlots(success, error);

};

saxsys.campus.persistence.sortAndMapSlots = function() {
    saxsys.campus.persistence.slots.sort(saxoniaCampusUtil.slotComparator);
    saxsys.campus.persistence.mapSortedSlots();
}

saxsys.campus.persistence.initRooms = function() {
    var authString = $.cookie("id");
    console.log("authstring" + authString);
    saxsys.campus.persistence.rooms = [];
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
                    saxsys.campus.persistence.rooms = data._embedded.rooms;
                },
                error: function() {
                    console.log('error occured!');
                }
            });
};

saxsys.campus.persistence.init = function() {
    console.log("before slot init");
    this.initSlots();
    console.log("after slot init");
    console.log("before room init");
    this.initRooms();
    console.log("after room init");
};

saxsys.campus.persistence.getSlotById = function(slotID) {
    console.log("saxsys.campus.persistence.getSlotById(" + slotID + ") called");
    var sortedSlotId = saxsys.campus.persistence.sortedSlotIdMapping[slotID];

    return saxsys.campus.persistence.slots[sortedSlotId];
};

saxsys.campus.persistence.addNewSlot = function(slot) {
    saxsys.campus.persistence.slots[saxsys.campus.persistence.slots.length] = slot;
    saxsys.campus.persistence.slots.sort(saxoniaCampusUtil.slotComparator);
    saxsys.campus.persistence.mapSortedSlots();
};

saxsys.campus.persistence.updateSlot = function(slot) {
    var sortedSlotId = saxsys.campus.persistence.sortedSlotIdMapping[slot.id];
    saxsys.campus.persistence.slots[sortedSlotId] = slot;
    saxsys.campus.persistence.sortAndMapSlots();
};

saxsys.campus.persistence.isSlotBooked = function(slotId) {
    var sortedId = saxsys.campus.persistence.sortedUserSlotIdMapping[slotId];

    return sortedId !== undefined;
};
saxsys.campus.persistence.getParticipantsBySlot = function(){
  saxsys.campus.persistence.tmpParticipants = [];
 
    for(var i in saxsys.campus.persistence.slots){
      var slot = saxsys.campus.persistence.slots[i];
      
        var participantSuccess = function(data) {
            saxsys.campus.persistence.tmpParticipants[slot.id] = data;
        };

        var participantFail = function(err) {
            console.error("adding newSlot failed.");
            console.error(err);
        };

        if (slot.participants > 0) {
            saxoniaCampusRestApi.getParticipants(slot, participantSuccess, participantFail);
        } else {
            saxsys.campus.persistence.tmpParticipants[slot.id] =[];
        }
        
  }
  return saxsys.campus.persistence.tmpParticipants;
};