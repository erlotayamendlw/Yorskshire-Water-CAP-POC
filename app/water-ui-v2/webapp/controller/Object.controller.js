sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"


], function (
	BaseController,
	JSONModel,
	History,
	formatter,
	Filter,
	FilterOperator
) {
	"use strict";

	return BaseController.extend("wateruiv2.controller.Object", {

	// return BaseController.extend("water-ui-v2/webapp/controller/Object.Controller.js", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Object").attachPatternMatched(this._onObjectMatched, this);

			
			// var iOriginalBusyDelay,
			// 	oViewModel = new JSONModel({
			// 		busy : true,
			// 		delay : 0
			// 	});

			// this.getRouter().getRoute("Object").attachPatternMatched(this._onObjectMatched, this);

			// // Store original busy indicator delay, so it can be restored later on
			// iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			// this.setModel(oViewModel, "objectView");
			// this.getOwnerComponent().getModel().metadataLoaded().then(function () {
			// 		// Restore original busy indicator delay for the object view
			// 		oViewModel.setProperty("/delay", iOriginalBusyDelay);
			//	}
			// );
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */


		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		onBackButtonPress : function() {
			window.history.go(-1);
		},

		onObjectPress : function(oEvent) {
			// var oItem = oEvent.getSource();
			// var sPath = oItem.getBindingContext().getPath();
			// var sProductID = sPath.match(/'([^']+)'/)[1];

			// console.log("Testing 3 lines");
			// console.log(sPath);
			// console.log(sProductID);
			// console.log(oItem.getBindingContext());

			//  this.getOwnerComponent().getRouter().navTo("Object", {
			//  	objectId: sProductID
			//  })

			var oSelectedItem = oEvent.getParameter("listItem");
			var oContext = oSelectedItem.getBindingContext();
			var oData = oContext.getObject();
			
			// Update the side panel
			var oDetailText = this.byId("detailText");
			oDetailText.setText(`ID: ${oData.ID}\nTitle:${oData.Title} \nTranscript:${oData.GenAITranscript}`);
			
			var oURL = oData.URL;
			this.getView().getModel().setProperty("/URL", oURL);
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			
			this.oView.getModel().metadataLoaded().then( function() {
				var sObjectPath = this.oView.getModel().createKey("Notification", {
					MaintenanceNotification :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
			
			var oModel = this.getView().getModel();
			oModel.setProperty("/currentObjectId", sObjectId);
			//------------
			var that = this;
			var oModel2 = this.getOwnerComponent().getModel();
			var aFilters = [];
			aFilters.push(new Filter("MaintenanceNotification", FilterOperator.EQ, sObjectId));
			var urlParams = {}
			return new Promise(function (resolve, reject) {
				var url = "/NotificationMedia";
				that.getView().setBusy(true);
				oModel2.read(url, {
						        urlParameters: urlParams,
								filters: aFilters,
								success: function (oData) {
									that.getView().setBusy(false);
									// oModel2.setModel(oData)
									console.log("Successfully read!");
									resolve(oData);
								},
								error: function (oError) {
									that.getView().setBusy(false);
									console.log("Rejected read!");
									reject(oError);
								}      
							}	
						);
					}
				);

		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function (sObjectPath) {
			var oViewModel = this.oView.getModel("objectView"),
				oDataModel = this.oView.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							// oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						// oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange : function () {
			var oView = this.getView(),
				oViewModel = this.oView.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				// this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			// var oResourceBundle = this.getResourceBundle(),
			// 	oObject = oView.getBindingContext().getObject(),
			// 	sObjectId = oObject.ProductID,
			// 	sObjectName = oObject.ProductName;

			// oViewModel.setProperty("/busy", false);
			// oViewModel.setProperty("/shareSendEmailSubject",
			// oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			// oViewModel.setProperty("/shareSendEmailMessage",
			// oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		viewRec : function (id) {
			return id;

		}

	});

});