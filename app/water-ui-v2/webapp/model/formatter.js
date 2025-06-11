sap.ui.define([

],

    function () {
        "use strict";

        return {
            /**
            * @public
            * @param {string} mpriority the number to be converted for the priority of the maintenance
            */
            priorityMethod: function (mpriority) {
                switch (mpriority) {
                    case "1":
                        return "High";
                    case "2":
                        return "Medium";
                    case "3":
                        return "Low";
                    case "4":
                        return "Completed";
                    case "High":
                        return "High";
                    case "Medium":
                        return "Medium";
                    case "Low":
                        return "Low";
                    case "Completed":
                        return "Completed";
                    default:
                        return mpriority;
                }
            },

            /**
            * @public
            * @param {Date} mDate date
            */
            date: function (mDate) {
                if (mDate) {
                    return new Date(mDate).toLocaleDateString('en-GB');
                }
                return "";
            }
        };
    });