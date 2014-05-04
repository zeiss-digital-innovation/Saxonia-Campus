/* 
 * Clientside implementation of the REST API.
 */


var saxoniaCampusRestApi = {};

saxoniaCampusRestApi.BASE_URL = "http://"+location.host+"/rest/";
saxoniaCampusRestApi.CURRENT_USER_URL = "";
saxoniaCampusRestApi.SLOTS_URL = "";
saxoniaCampusRestApi.ROOMS_URL = "";
saxoniaCampusRestApi.BASE_URL = "http://"+location.host+"/rest/";

saxoniaCampusRestApi.AUTH_STRING = "";
saxoniaCampusRestApi.authenticate = function(success_function,fail_function){
    $.ajax
            ({
                type: "GET",
                url: saxoniaCampusRestApi.BASE_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('authentication successfull');
                    saxoniaCampusRestApi.CURRENT_USER_URL = data._links.currentUser.href;
                    saxoniaCampusRestApi.SLOTS_URL = data._links.slots.href;
                    success_function(data);
                },
                error: function(err) {
                    console.log('authentication error occured!');
                    fail_function(err);
                }
            });
};

saxoniaCampusRestApi.getCurrentUser = function (success_function, fail_function){
    $.ajax
            ({
                type: "GET",
                url: saxoniaCampusRestApi.CURRENT_USER_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('getCurrentUser successfull');
                    success_function(data);
                },
                error: function(err) {
                    console.log('getCurrentUser error occured!');
                    fail_function(err);
                }
            });
};

saxoniaCampusRestApi.getSlots = function (success_function, fail_function){
    $.ajax
            ({
                type: "GET",
                url: saxoniaCampusRestApi.SLOTS_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('getSlots successfull');
                    saxoniaCampusRestApi.ROOMS_URL = data._links.rooms.href;
                    success_function(data._embedded.slots);
                },
                error: function(err) {
                    console.log('getSlots error occured!');
                    fail_function(err);
                }
            });
};

saxoniaCampusRestApi.getRooms = function (success_function, fail_function){
    $.ajax
            ({
                type: "GET",
                url: saxoniaCampusRestApi.ROOMS_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('getRooms successfull');
                    success_function(data);
                },
                error: function(err) {
                    console.log('getRooms error occured!');
                    fail_function(err);
                }
            });
};