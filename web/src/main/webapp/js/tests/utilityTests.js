module("utility");
test("Slotcollisionstest keine Collision vorher", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "08:00", endtime: "10:00"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Grenzfall", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "08:00", endtime: "11:00"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "15:00", endtime: "17:00"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Grenzfall", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "14:00", endtime: "17:00"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "08:00", endtime: "10:00"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Grenzfall Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "08:00", endtime: "11:00"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "15:00", endtime: "17:00"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Grenzfall Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "14:00", endtime: "17:00"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Ende in neuem Slot", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "09:00", endtime: "11:30"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Beginn in neuem Slot", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "12:45", endtime: "16:30"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Ende in neuem Slot Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "09:00", endtime: "11:30"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Beginn in neuem Slot Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "12:45", endtime: "16:30"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision identische Slots", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "11:00", endtime: "14:00"};

    var collision = saxsys.campus.utility.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision identische Slots Reverse", function() {
    var slot1mock = {starttime: "11:00", endtime: "14:00"};
    var slot2mock = {starttime: "11:00", endtime: "14:00"};

    var collision = saxsys.campus.utility.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;

    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});
test("Umwandlung String in millis", function() {
    var timeStr = "11:17";

    var expYear = 114; //Anzahl Jahre seit 1900
    var expMonth = 6;
    var expDay = 4;
    var expHour = 11;
    var expMin = 17;
    var expSeconds = 0;
    var expMillis = 0

    var millis = saxsys.campus.utility.convertTimeStrToMillis(timeStr);
    var date = new Date(millis);

    var year = date.getYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dateMillis = date.getMilliseconds();

    equal(year, expYear, "Das Jahr muss 114 sein.");
    equal(month, expMonth, "Der Monat muss 6 sein.");
    equal(day, expDay, "Der Tag muss 4 sein.");
    equal(hour, expHour, "Die Stunde muss 11 sein.");
    equal(minutes, expMin, "Die Minuten müssen 17 sein.");
    equal(seconds, expSeconds, "Die Sekunden müssen 0 sein.");
    equal(dateMillis, expMillis, "Die Millisekunden müssen 0 sein.");



});
