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

			
			// Hides the image on the object page side panel at the start of the program
			this.byId("myPanelImage").setVisible(false);
			
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
			var oSelectedItem = oEvent.getParameter("listItem");
			var oContext = oSelectedItem.getBindingContext();
			var oData = oContext.getObject();
			
			// Update the transcript and key observations panels
			var oPanel2Text1 = this.byId("panel2text1");
			oPanel2Text1.setText(`${oData.GenAIAnalysisOverview}`);

			var oPanel2Text2 = this.byId("panel2text2");
			oPanel2Text2.setText(`${oData.GenAIAnalysisOfCause}`);

			var oPanel2Text3 = this.byId("panel2text3");
			oPanel2Text3.setText(`${oData.GenAICategorisation}`);

			var oPanel2Text4 = this.byId("panel2text4");
			oPanel2Text4.setText(`${oData.GenAISeverity}`);

			var oPanel2Text5 = this.byId("panel2text5");
			oPanel2Text5.setText(`${oData.GenAIconfidence}`);

			var oPanel2Text6 = this.byId("panel2text6");
			oPanel2Text6.setText(`${oData.GenAIDescription}`);

			var oPanel3Text1 = this.byId("panel3text1");
			oPanel3Text1.setText(`${oData.GenAITranscript}`);

			// new sap.m.Text({ text : "{/URL}" }).placeAt("content");

			//Updating the video panel
			// oDetailTitle.setText(`ID: ${oData.ID}\nTitle:${oData.Title} \nTranscript:${oData.GenAITranscript}`);

			//Sets the image to be visible again in the object page side panel
			this.byId("myPanelImage").setVisible(true);
			this.byId("myPanelImage").rerender(); // Must be re rendered otherwise will require 2 clicks

			var fileName = oData.URL;
			this.displayCorrectFile(fileName);
		},

		displayCorrectFile : function(filePath) {
			// Assume `sFileName` is the variable holding the file name or URL
			var sFileName = filePath.toLowerCase();

			// Define arrays of known video and image extensions
			var videoFormats = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"];
			var imageFormats = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"];

			// Define the DOM refrences to the image and video tags in the object view for the side panel
			var panelImage = this.byId("myPanelImage").getDomRef();
			var panelVideo = this.byId("myPanelVideo").getDomRef();

			if (videoFormats.some(ext => sFileName.endsWith(ext))) {
				console.log("This is a video file.");
				// Hides the image and displays the video
				panelImage.style.display = "none";
				panelVideo.style.display = "flex";

				// Replaces the video and pauses it
				panelVideo.src = filePath;
				panelVideo.pause();
			}
			else if (imageFormats.some(ext => sFileName.endsWith(ext))) {
				console.log("This is an image file.");
				// Hides the video and displays image
				panelVideo.style.display = "none";
				panelImage.style.display = "flex";

				// Replaces the image
				panelImage.src = filePath;
			}
			else {
				console.log("Unknown file type.");
			}

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