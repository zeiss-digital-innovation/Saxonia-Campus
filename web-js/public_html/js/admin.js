/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var extractSlotId = function(element_id) {
    return element_id.split('_')[0];
}

$(function() {
    $(".delete_slot").click(function() {
        console.log("delete slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        var slotSelector = '#' + slotID + '_slot';

        console.log("slotID: " + slotID);
        console.log("slotSelector: " + slotSelector);

        $(slotSelector).remove();
        $("#admin_slot_list").listview("refresh");
    });

    $(".edit_slot").click(function() {
        console.log("edit slot clicked");
        console.log("this.id:" + this.id);

        var slotID = extractSlotId(this.id);
        console.log("slotID: " + slotID);
        
        console.log("get slot-data from backend");
        console.log("fill form in detail view.");
        console.log("show detail view.");
    });
});
