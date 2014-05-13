/* 
 * Clientside implementation of the REST API.
 */

var saxoniaCampusRestApi = {};

saxoniaCampusRestApi.BASE_URL = "http://" + location.host + "/rest/";
saxoniaCampusRestApi.CURRENT_USER_URL = "";
saxoniaCampusRestApi.SLOTS_URL = "";
saxoniaCampusRestApi.ROOMS_URL = "";
saxoniaCampusRestApi.BASE_URL = "http://" + location.host + "/rest/";

saxoniaCampusRestApi.AUTH_STRING = "";
saxoniaCampusRestApi.ADMIN_ROLE = "ADMIN";
saxoniaCampusRestApi.USER_ROLE = "USER";

saxoniaCampusRestApi.authenticate = function(success_function, fail_function) {
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

saxoniaCampusRestApi.getCurrentUser = function(success_function, fail_function) {
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

saxoniaCampusRestApi.getSlots = function(success_function, fail_function) {
    $.ajax
            ({
                type: "GET",
                url: saxoniaCampusRestApi.SLOTS_URL,
                dataType: 'json',
                async: false,
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

saxoniaCampusRestApi.getRooms = function(success_function, fail_function) {
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
                    success_function(data._embedded.rooms);
                },
                error: function(err) {
                    console.log('getRooms error occured!');
                    fail_function(err);
                }
            });
};

saxoniaCampusRestApi.addSlot = function(slot, success_function, fail_function) {
    var slot_json = JSON.stringify(slot);
    $.ajax
            ({
                type: "POST",
                url: saxoniaCampusRestApi.SLOTS_URL,
                dataType: 'hal+json',
                async: true,
                data: slot_json,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('addSlot successfull');
                    success_function(data);
                },
                error: function(err) {
                    if (err.status === 201) {
                        console.log('addSlot completed');
                        success_function(err);
                    } else {
                        console.log('addSlot error occured!');
                        fail_function(err);
                    }
                }
            });
};

saxoniaCampusRestApi.updateSlot = function(slot, success_function, fail_function) {
    var slotUpdateUrl = saxoniaCampusRestApi.SLOTS_URL + "/" + slot.id;
    var slot_json = JSON.stringify(slot);
    $.ajax
            ({
                type: "PUT",
                url: slotUpdateUrl,
                dataType: 'hal+json',
                async: true,
                data: slot_json,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('updateSlot successfull');
                    success_function(data);
                },
                error: function(err) {
                    if (err.status === 200) {
                        console.log('updateSlot completed');
                        success_function(err);
                    } else {
                        console.log('updateSlot error occured!');
                        fail_function(err);
                    }
                }
            });
};

saxoniaCampusRestApi.deleteSlot = function(slot, success_function, fail_function) {
    var delete_url = saxoniaCampusRestApi.SLOTS_URL + "/" + slot.id;

    $.ajax
            ({
                type: "DELETE",
                url: delete_url,
                dataType: 'hal+json',
                async: true,
                data: {},
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('delete slot successfull');
                    success_function(data);
                },
                error: function(err) {
                    if (err.status === 200) {
                        console.log('deleteSlot completed');
                        success_function(err);
                    } else {
                        console.log('deleteSlot error occured!');
                        fail_function(err);
                    }
                }
            });
};

saxoniaCampusRestApi.getParticipants = function(slot, success_function, fail_function) {
    var participantsUrl = saxoniaCampusRestApi.SLOTS_URL + "/" + slot.id + "/participants";
    $.ajax
            ({
                type: "GET",
                url: participantsUrl,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('getParticipants successfull');
                    success_function(data._embedded.participants);
                },
                error: function(err) {
                    console.log('getParticipants error occured!');
                    fail_function(err);
                }
            });
};

saxoniaCampusRestApi.addParticipant = function(slot, success_function, fail_function) {
    var participantsUserUrl = saxoniaCampusRestApi.SLOTS_URL + "/" + slot.id + "/participants/user";
    $.ajax
            ({
                type: "PUT",
                url: participantsUserUrl,
                dataType: 'hal+json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('addParticipant successfull');
                    success_function(data);
                },
                error: function(err) {
                    if (err.status === 200) {
                        console.log('addParticipant completed');
                        success_function(err);
                    } else {
                        console.log('addParticipant error occured!');
                        fail_function(err);
                    }
                }
            });
};

saxoniaCampusRestApi.delParticipant = function(slot, success_function, fail_function) {
    var participantsUserUrl = saxoniaCampusRestApi.SLOTS_URL + "/" + slot.id + "/participants/user";
    $.ajax
            ({
                type: "DELETE",
                url: participantsUserUrl,
                dataType: 'hal+json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxoniaCampusRestApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('delParticipant successfull');
                    success_function(data);
                },
                error: function(err) {
                    if (err.status === 200) {
                        console.log('delParticipant completed');
                        success_function(err);
                    } else {
                        console.log('delParticipant error occured!');
                        fail_function(err);
                    }
                }
            });
};
