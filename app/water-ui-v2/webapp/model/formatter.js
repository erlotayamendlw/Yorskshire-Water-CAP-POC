sap.ui.define([

], 

function () {
    "use strict";

    return {
        /**
        * @public
		* @param {string} mpriority the number to be converted for the priority of the maintenance
        */
        priorityMethod: function(mpriority) {
            console.log("Formatter function is being run")
            switch(mpriority){
                case 1:
                    return "Low";
                case "2":
                    return "Medium";
                case 3:
                    return "High";
                default:
                    return "Unknown";
                    
            }
        }
    };
});