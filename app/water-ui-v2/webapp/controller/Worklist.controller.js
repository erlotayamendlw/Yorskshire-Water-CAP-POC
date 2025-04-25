sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("wateruiv2.controller.Worklist", {
        onInit() {
        },
        
		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 
		*_showObject : function (oItem) {
		*	this.getOwnerComponent().getRouter().navTo("object", {
		*		objectId: oItem.getBindingContext().getProperty("ProductID")
		*	});
		*	console.log("show object section" + oItem);
		*},
		*/
		
        /**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress : function (oEvent) {

			var oItem = oEvent.getSource();
			
			var sPath = oItem.getBindingContext().getPath();
			var sProductID = sPath.match(/'([^']+)'/)[1];

			// var sProductID = oItem.getBindingContext().getProperty("ProductID");

			console.log(sPath);
			console.log(sProductID);
			console.log(oItem.getBindingContext());

			 this.getOwnerComponent().getRouter().navTo("Object", {
			 	objectId: sProductID
			 })
			 
			// The source is the list item that got pressed
			// this._showObject(oEvent.getSource());
		},
		
		
        
    });
});

	