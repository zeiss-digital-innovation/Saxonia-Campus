module("utility");
test("Slotcollisionstest keine Collision vorher",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"08:00",endtime:"10:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Grenzfall",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"08:00",endtime:"11:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"15:00",endtime:"17:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Grenzfall",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"14:00",endtime:"17:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"08:00",endtime:"10:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision vorher Grenzfall Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"08:00",endtime:"11:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"15:00",endtime:"17:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest keine Collision nachher Grenzfall Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"14:00",endtime:"17:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = false;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Ende in neuem Slot",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"09:00",endtime:"11:30"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Beginn in neuem Slot",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"12:45",endtime:"16:30"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Ende in neuem Slot Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"09:00",endtime:"11:30"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision Beginn in neuem Slot Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"12:45",endtime:"16:30"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision identische Slots",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"11:00",endtime:"14:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot1mock, slot2mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});

test("Slotcollisionstest Collision identische Slots Reverse",function(){
    var slot1mock = {starttime:"11:00",endtime:"14:00"};
    var slot2mock = {starttime:"11:00",endtime:"14:00"};
    
    var collision = saxoniaCampusUtil.collisionTest(slot2mock, slot1mock);
    var expectedCollision = true;
    
    equal(collision, expectedCollision, "Slot2 liegt zeitlich vor Slot1 -> keine collision");
});