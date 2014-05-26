/* 
 *This QUnit Tests test the persistence code to communicate correctly with the 
 *REST-Service.
 */

module("persistence");

test("Basic auth test des generierten String", function(){
    var username = "marco.dierenfeldt";
    var password = "campus";
    var expectedAuthStr = "Basic bWFyY28uZGllcmVuZmVsZHQ6Y2FtcHVz";
    
    var result = saxoniaCampusUtil.make_base_auth(username,password);
    
    equal(result, expectedAuthStr, "Überprüfung ob baseAuth generierung funktioniert.");
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

