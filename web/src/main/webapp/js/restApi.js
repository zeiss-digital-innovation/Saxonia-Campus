/* 
 * Clientside implementation of the REST API.
 */

saxsys.campus.restApi.BASE_URL = location.protocol + "//" + location.host + "/rest/";
saxsys.campus.restApi.CURRENT_USER_URL = "";
saxsys.campus.restApi.SLOTS_URL = "";
saxsys.campus.restApi.ROOMS_URL = "";
saxsys.campus.restApi.BASE_URL = location.protocol + "//" + location.host + "/rest/";

saxsys.campus.restApi.AUTH_STRING = "";
saxsys.campus.restApi.ADMIN_ROLE = "ADMIN";
saxsys.campus.restApi.USER_ROLE = "USER";

saxsys.campus.restApi.authenticate = function(success_function, fail_function) {
    $.ajax
            ({
                type: "GET",
                url: saxsys.campus.restApi.BASE_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('authentication successfull');
                    saxsys.campus.restApi.CURRENT_USER_URL = data._links.currentUser.href;
                    saxsys.campus.restApi.SLOTS_URL = data._links.slots.href;
                    success_function(data);
                },
                error: function(err) {
                    console.log('authentication error occured!');
                    fail_function(err);
                }
            });
};

saxsys.campus.restApi.getCurrentUser = function(success_function, fail_function) {
    $.ajax
            ({
                type: "GET",
                url: saxsys.campus.restApi.CURRENT_USER_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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

saxsys.campus.restApi.getSlots = function(success_function, fail_function) {
    $.ajax
            ({
                type: "GET",
                url: saxsys.campus.restApi.SLOTS_URL,
                dataType: 'json',
                async: false,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
                },
                success: function(data) {
                    console.log('getSlots successfull');
                    saxsys.campus.restApi.ROOMS_URL = data._links.rooms.href;
                    success_function(data._embedded.slots);
                },
                error: function(err) {
                    console.log('getSlots error occured!');
                    fail_function(err);
                }
            });
};

saxsys.campus.restApi.getRooms = function(success_function, fail_function) {
    $.ajax
            ({
                type: "GET",
                url: saxsys.campus.restApi.ROOMS_URL,
                dataType: 'json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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

saxsys.campus.restApi.addSlot = function(slot, success_function, fail_function) {
    var slot_json = JSON.stringify(slot);
    $.ajax
            ({
                type: "POST",
                url: saxsys.campus.restApi.SLOTS_URL,
                dataType: 'hal+json',
                async: true,
                data: slot_json,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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

saxsys.campus.restApi.updateSlot = function(slot, success_function, fail_function) {
    var slotUpdateUrl = saxsys.campus.restApi.SLOTS_URL + "/" + slot.id;
    var slot_json = JSON.stringify(slot);
    $.ajax
            ({
                type: "PUT",
                url: slotUpdateUrl,
                dataType: 'hal+json',
                async: true,
                data: slot_json,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('updateSlot successfull');
                    success_function(data);
                },
                error: function(err) {
                    if ((err.status === 200)||(err.status === 201)) {
                        console.log('updateSlot completed');
                        success_function(err);
                    } else {
                        console.log('updateSlot error occured!');
                        fail_function(err);
                    }
                }
            });
};

saxsys.campus.restApi.deleteSlot = function(slot, success_function, fail_function) {
    var delete_url = saxsys.campus.restApi.SLOTS_URL + "/" + slot.id;

    $.ajax
            ({
                type: "DELETE",
                url: delete_url,
                dataType: 'hal+json',
                async: true,
                data: {},
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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

saxsys.campus.restApi.getParticipants = function(slot, success_function, fail_function) {
    var participantsUrl = saxsys.campus.restApi.SLOTS_URL + "/" + slot.id + "/participants";
    $.ajax
            ({
                type: "GET",
                url: participantsUrl,
                dataType: 'json',
                async: false,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
                    xhr.setRequestHeader('Accept', 'application/hal+json');
                    xhr.setRequestHeader('Content-Type', 'application/hal+json');
                },
                success: function(data) {
                    console.log('getParticipants successfull');
                    
                    //Wenn nur ein Element im Ergebnis ist, wird kein Array zurückgegeben.
                    //Workaround, einzelnes Objekt ebenfalls in Array packen
                    //-> einheitliches Ergebnishandling
                    var participants = data._embedded.participants;
                    if(data.count === 1){
                        participants = [];
                        participants[0] = data._embedded.participants;
                    }
                    success_function(participants);
                },
                error: function(err) {
                    console.log('getParticipants error occured!');
                    fail_function(err);
                }
            });
};

saxsys.campus.restApi.addParticipant = function(slot, success_function, fail_function) {
    var participantsUserUrl = saxsys.campus.restApi.SLOTS_URL + "/" + slot.id + "/participants/user";
    $.ajax
            ({
                type: "PUT",
                url: participantsUserUrl,
                dataType: 'hal+json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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

saxsys.campus.restApi.delParticipant = function(slot, success_function, fail_function) {
    var participantsUserUrl = saxsys.campus.restApi.SLOTS_URL + "/" + slot.id + "/participants/user";
    $.ajax
            ({
                type: "DELETE",
                url: participantsUserUrl,
                dataType: 'hal+json',
                async: true,
                data: '',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', saxsys.campus.restApi.AUTH_STRING);
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
