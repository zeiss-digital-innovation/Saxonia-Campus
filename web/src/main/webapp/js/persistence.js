/*
 * Persistence module for communication with the REST-Service
 * 
 * POST
 * 
 */

var REST_SERVICE_BASE_URL = location.protocol + "//" + location.host + "/rest/";
var REST_SERVICE_SLOTS_URL = location.protocol + "//" + location.host + "/rest/slots";
var REST_SERVICE_ROOMS_URL = location.protocol + "//" + location.host + "/rest/rooms";
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

var updateSlot = function(slotID, slotTitle) {
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

saxoniaCampusPersistance.userSlots = [];
saxoniaCampusPersistance.sortedUserSlotIdMapping = [];
saxoniaCampusPersistance.sortedSlotIdMapping = [];

saxoniaCampusPersistance.mapSortedSlots = function() {
    for (var i in saxoniaCampusPersistance.slots) {
        var slotID = saxoniaCampusPersistance.slots[i].id;
        saxoniaCampusPersistance.sortedSlotIdMapping[slotID] = i;
    }
};

saxoniaCampusPersistance.sortUserSlots = function() {
    saxoniaCampusPersistance.userSlots.sort(saxoniaCampusUtil.slotComparator);
};

saxoniaCampusPersistance.getUserSlots = function() {
    return saxoniaCampusPersistance.userSlots;
};

saxoniaCampusPersistance.initSortedUserSlotIdMapping = function() {
    var tmpSlotArray = [];
    for (var i in saxoniaCampusPersistance.userSlots) {
        var currentSlot = saxoniaCampusPersistance.userSlots[i];
        tmpSlotArray[currentSlot.id] = i;
    }
    saxoniaCampusPersistance.sortedUserSlotIdMapping = tmpSlotArray;
};

saxoniaCampusPersistance.addUserSlot = function(slotID) {
    var tmpSlot = saxoniaCampusPersistance.getSlotById(slotID);
    saxoniaCampusPersistance.userSlots[saxoniaCampusPersistance.userSlots.length]= tmpSlot;
    saxoniaCampusPersistance.sortUserSlots();
    saxoniaCampusPersistance.initSortedUserSlotIdMapping();
};

saxoniaCampusPersistance.removeUserSlot = function(slotID) {
    var sortedID = saxoniaCampusPersistance.sortedUserSlotIdMapping[slotID];
    saxoniaCampusPersistance.userSlots.splice(sortedID,1);
    saxoniaCampusPersistance.sortedUserSlotIdMapping.splice(slotID,1);
    saxoniaCampusPersistance.initSortedUserSlotIdMapping();
};

saxoniaCampusPersistance.initUserSlots = function(userSlots) {
    saxoniaCampusPersistance.userSlots = [];
    if (Array.isArray(userSlots)) {
        for (var i in userSlots) {
            var slot = saxoniaCampusPersistance.getSlotById(userSlots[i].id);
            saxoniaCampusPersistance.userSlots[saxoniaCampusPersistance.userSlots.length] = slot;
            saxoniaCampusPersistance.sortUserSlots();
        }
    } else {
        //only one slot
        var slot = saxoniaCampusPersistance.getSlotById(userSlots.id);
        saxoniaCampusPersistance.userSlots[saxoniaCampusPersistance.userSlots.length] = slot;
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
        saxoniaCampusPersistance.slots.sort(saxoniaCampusUtil.slotComparator);
        saxoniaCampusPersistance.mapSortedSlots();

    };
    var error = function(data) {
        console.log('error occured!');
    };

    saxoniaCampusRestApi.getSlots(success, error);

};

saxoniaCampusPersistance.initRooms = function() {
    var roomsWrapper;
    var authString = $.cookie("id");
    console.log("authstring" + authString);
    saxoniaCampusPersistance.rooms = [];
    $.ajax
            ({
                type: "GET",
                url: REST_SERVICE_ROOMS_URL,
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
    var sortedSlotId = saxoniaCampusPersistance.sortedSlotIdMapping[slotID];

    return saxoniaCampusPersistance.slots[sortedSlotId];
};

saxoniaCampusPersistance.addNewSlot = function(slot) {
    saxoniaCampusPersistance.slots[saxoniaCampusPersistance.slots.length] = slot;
    saxoniaCampusPersistance.slots.sort(saxoniaCampusUtil.slotComparator);
    saxoniaCampusPersistance.mapSortedSlots();
};

saxoniaCampusPersistance.updateSlot = function(slot) {
    var sortedSlotId = saxoniaCampusPersistance.sortedSlotIdMapping[slotID];
    saxoniaCampusPersistance.slots[sortedSlotId] = slot;
};
