sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
], (Controller, Filter) => {
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

		onPressWorkItem: function(oEvent) {
			let oItem = oEvent.getParameter("listItem");
			let oContext = oItem.getBindingContext(); // get the binding context
		
			if (oContext) {
				let oData = oContext.getObject(); // get the data object
				let notificationID = oData.MaintenanceNotification;
				console.log("Selected Row Data:", oData);
				console.log("Row ID:", notificationID);
				this.getOwnerComponent().getRouter().navTo("Object", {
					objectId: notificationID,
					object: oData
				})
			}
		},

		onClickCircle: function(oEvent){
			var oBinding = this.byId("idProductsTable").getBinding("items"),
			sKey = oEvent.getParameter("MaintenanceNotification"),
			oFilter;

			if (sKey === "nofault") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", 'Low')], and: true});
				oBinding.filter([oFilter]);
			} else if (sKey === "unsure") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", 'Medium')], and: true});
				oBinding.filter([oFilter]);
			} else if (sKey === "fault") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", 'High')], and: true});
				oBinding.filter([oFilter]);
			} else {
				oBinding.filter([]);
			}
		},

		onFilterSelect: function (oEvent) {
			var oBinding = this.byId("_IDGenTable1").getBinding("items"),
				sKey = oEvent.getParameter("key"),
				// oUnitFilter = new Filter("WeightUnit", "EQ", "KG"),
				oFilter;

			if (sKey === "nofault") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", '3')], and: true});
				oBinding.filter([oFilter]);
			} else if (sKey === "unsure") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", '2')], and: true});
				oBinding.filter([oFilter]);
			} else if (sKey === "fault") {
				oFilter = new Filter({filters: [new Filter("MaintPriority", "EQ", '1')], and: true});
				oBinding.filter([oFilter]);
			} else {
				oBinding.filter([]);
			}
		},

		
		
        
    });
});

	