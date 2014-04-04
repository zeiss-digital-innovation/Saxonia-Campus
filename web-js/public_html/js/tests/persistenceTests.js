/* 
 *This QUnit Tests test the persistence code to communicate correctly with the 
 *REST-Service.
 */

module("persistence");

test("Initialisierung des Persistenzmoduls", function() {
    var persisitence = saxoniaCampusPersistance;
    var numberOfSlotsExpected = 3;

    persisitence.init();

    // there are only 3 slots, but the length attribute gives back 4 
    var numberOfSlots = persisitence.slots.length - 1;

    //Assert
    equal(numberOfSlots, numberOfSlotsExpected, "In der Datenbank befinden sich 3 Slots");
});


module("utility");

test("Datum aus Millisekunden erstellen", function() {
    var date = new Date();
    var expectedTimeString = date.getHours() + ':' + date.getMinutes();
    var epocheMillis = date.getTime();
    var timeString = saxoniaCampusUtil.convertMillisToTimeStr(epocheMillis);

    equal(timeString, expectedTimeString, "Die beiden Zeitstrings müssen gleich sein.");
});

test("Datum Format prüfen", function() {
    var expectedTimeString = "06:04";
    
    var date = new Date();
    
    date.setHours(06);
    date.setMinutes(04);
    
    var epocheMillis = date.getTime();
    var timeString = saxoniaCampusUtil.convertMillisToTimeStr(epocheMillis);

    equal(timeString, expectedTimeString, "Die beiden Zeitstrings müssen gleich sein.");
});

test("Erstellung eines ViewModel-Slots aus einem REST-Slot", function() {
    var restSlot = {"_links": {
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
    };
    var expectedSlot = new Slot(3, "JSF vs JavaScript");
    expectedSlot.description = "Vergleich";
    expectedSlot.room = "FFP 302";
    expectedSlot.roomId = 1;
    expectedSlot.starttime = "16:00";
    expectedSlot.endtime = "17:00";
    expectedSlot.speaker = "Stefan Bley, Marco Dierenfeldt";
    expectedSlot.participants = 20;

    var slot = saxoniaCampusUtil.convertRestSlotToViewSlot(restSlot);

    deepEqual(slot, expectedSlot, "Der generierte Slot muss dem erwarteten Slot entsprechen.")
});