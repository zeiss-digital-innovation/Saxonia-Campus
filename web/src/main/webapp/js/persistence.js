/*
 * Persistence module for communication with the REST-Service
 * 
 * POST
 * 
 {
  "description" : "Workshop x",
  "endtime" : 34200000,
  "speaker" : "Speaker x",
  "starttime" : 30600000,
  "title" : "Title x",
  "room" : 2
}
 */

var REST_SERVICE_BASE_URL = "http://nb087:8080/rest/";
var REST_SERVICE_SLOTS_URL = "http://nb087:8080/rest/slots";
var REST_SERVICE_ROOMS_URL = "http://nb087:8080/rest/rooms";


var Slot = function(slotID, slotTitle) {
    this.id = slotID;
    this.title = slotTitle;
    this.description = "Bitte Inhalt eingeben.";
    this.room = "FFP 911";
    this.roomId = 1;
    this.starttime = "07:00";
    this.endtime = "16:30";
    this.speaker = "Marco Dierenfeldt";
    this.participants = 20;
};

var saxoniaCampusPersistance = {};

saxoniaCampusPersistance.initSlots = function() {
    var slotsWrapper;
    var authString = $.cookie("id");
    console.log("authstring" + authString);

    $.ajax
            ({
                type: "GET",
                url: REST_SERVICE_SLOTS_URL,
                dataType: 'json',
                async: false,
                data: '{}',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', authString);
                },
                success: function(data) {
                    console.log('slots load successfull');
                    slotsWrapper = data;
                },
                error: function() {
                    console.log('error occured!');
                }
            });

    saxoniaCampusPersistance.slots = [];
    for (var i in slotsWrapper._embedded['slots']) {
        var currentSlot = slotsWrapper._embedded['slots'][i];

        saxoniaCampusPersistance.slots[currentSlot.id] =
                saxoniaCampusUtil.convertRestSlotToViewSlot(currentSlot);
    }
};

saxoniaCampusPersistance.initRooms = function() {
    var roomsWrapper;
    var authString = $.cookie("id");
    console.log("authstring" + authString);
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
                    roomsWrapper = data;
                },
                error: function() {
                    console.log('error occured!');
                }
            });
    saxoniaCampusPersistance.rooms = [];
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
    return saxoniaCampusPersistance.slots[slotID];
};

saxoniaCampusPersistance.getNextAvailableSlotId = function() {
    return saxoniaCampusPersistance.slots.length + 1;
};

saxoniaCampusPersistance.addNewSlot = function(slot) {
    saxoniaCampusPersistance.slots[slot.id] = slot;
};

saxoniaCampusPersistance.updateSlot = function(slot) {
    saxoniaCampusPersistance.slots[slot.id] = slot;
};