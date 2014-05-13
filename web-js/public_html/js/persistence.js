/*
 * Persistence module for communication with the REST-Service
 */

var REST_SERVICE_BASE_URL = "http://nb170:8180/rest/";
var REST_SERVICE_SLOTS_URL = "http://nb170:8180/rest/slots";
var REST_SERVICE_ROOMS_URL = "http://nb170:8180/rest/rooms";


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

saxoniaCampusPersistance.init = function() {
//    $.getJSON(REST_SERVICE_SLOTS_URL, function(data) {
//        for (var i in data) {
//            console.log('data['+i+']: '+data[i]);
//        }
//    });

    var slotsWrapper = {
        "_links": {
            "self": {
                "href": "http://nb170:8180/rest/slots"
            }
        },
        "_embedded": {
            "slots": [{
                    "_links": {
                        "self": {
                            "href": "http://nb170:8180/rest/slots/1"
                        }
                    },
                    "description": "Workshop",
                    "endtime": 34200000,
                    "id": 1,
                    "speaker": "Stefan Saring",
                    "starttime": 30600000,
                    "title": "Java 8 Lambdas",
                    "_embedded": {
                        "room": {
                            "_links": {
                                "self": {
                                    "href": "http://nb170:8180/rest/rooms/1"
                                }
                            },
                            "capacity": 20,
                            "id": 1,
                            "roomnumber": "FFP 302"
                        }
                    }
                }, {
                    "_links": {
                        "self": {
                            "href": "http://nb170:8180/rest/slots/2"
                        }
                    },
                    "description": "Vortrag zu APIs und Cypher",
                    "endtime": 39600000,
                    "id": 2,
                    "speaker": "Matthias Baumgart",
                    "starttime": 30600000,
                    "title": "Neo4J",
                    "_embedded": {
                        "room": {
                            "_links": {
                                "self": {
                                    "href": "http://nb170:8180/rest/rooms/2"
                                }
                            },
                            "capacity": 30,
                            "id": 2,
                            "roomnumber": "BS UG"
                        }
                    }
                }, {
                    "_links": {
                        "self": {
                            "href": "http://nb170:8180/rest/slots/3"
                        }
                    },
                    "description": "Vergleich",
                    "endtime": 57600000,
                    "id": 3,
                    "speaker": "Stefan Bley, Marco Dierenfeldt",
                    "starttime": 54000000,
                    "title": "JSF vs JavaScript",
                    "_embedded": {
                        "room": {
                            "_links": {
                                "self": {
                                    "href": "http://nb170:8180/rest/rooms/1"
                                }
                            },
                            "capacity": 20,
                            "id": 1,
                            "roomnumber": "FFP 302"
                        }
                    }
                }]
        }
    };

    saxoniaCampusPersistance.slots = [];
    for (var i in slotsWrapper._embedded['slots']) {
        var currentSlot = slotsWrapper._embedded['slots'][i];

        saxoniaCampusPersistance.slots[currentSlot.id] = saxoniaCampusUtil.convertRestSlotToViewSlot(currentSlot);
    }
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