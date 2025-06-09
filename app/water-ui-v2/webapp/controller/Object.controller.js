sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
	"sap/m/Text",
	"sap/m/TextArea"


], function (
	BaseController,
	JSONModel,
	History,
	formatter,
	Filter,
	FilterOperator,
	Dialog,
	Button,
	MessageToast,
	Text,
	TextArea
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
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Object").attachPatternMatched(this._onObjectMatched, this);

			
			// Hides the image on the object page side panel at the start of the program
			this.byId("myPanelImage").setVisible(false);


			this.oTable = this.getView().byId("_IDGenTable");
			this.getFiltersWithValues = this.getFiltersWithValues.bind(this);
			this.oFilterBar = this.getView().byId("filterbar");
			
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
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		onBackButtonPress: function () {
			// window.history.go(-1);
			window.history.back();
		},

		onObjectPress: function (oEvent) {
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

		displayCorrectFile: function (filePath) {
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
		_onObjectMatched: function (oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;

			this.oView.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.oView.getModel().createKey("Notification", {
					MaintenanceNotification: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));

			var SACURI = "https://delaware-digital.eu20.analytics.cloud.sap"
			var SACPath = "/sap/fpa/ui/app.html#/story?shellMode=embed&/s/E331F3D994457F6C5F1FEB90DC824DB8/?mode=view&f01Model=t.NSNS9F.Cs9uuukenbt49h0vpf176eerf5o:Cs9uuukenbt49h0vpf176eerf5o&f01Dim=Incident_ID&pageBar=disable"
			var SACIncidentID = "&f01Val=" + sObjectId

			var SACURL = SACURI + SACPath + SACIncidentID


			var oData = { SACUrl: SACURL };


			var oModel = new sap.ui.model.json.JSONModel({
				SACUrl: SACURL
			});

			this.oView.setModel(oModel, "myModel");

			// this.oView.getModel().setProperty(SACURL, 'SACUrl');

			var sIframeId = this.getView().byId(this.createId("SACiFrame")).getId();
			$("#"+sIframeId).attr("src",SACURL);

			const oView = this.getView();
			const oModels = oView.oModels;
			console.log(Object.keys(oModels));

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
		_bindView: function (sObjectPath) {
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

		_onBindingChange: function () {
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

		viewRec: function (id) {
			return id;

		},

		onSelectionChange: function (oEvent) {
			// this.oSmartVariantManagement.currentVariantSetModified(true);
			this.oFilterBar.fireFilterChange(oEvent);
		},

		// _updateLabelsAndTable: function () {
		// 	// this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
		// 	// this.oSnappedLabel.setText(this.getFormattedSummaryText());
		// 	// this.oTable.setShowOverlay(true);
		// },

		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1: sSelectedKey
						});
					});

				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}
				return aResult;
			}, []);

			this.oTable.getBinding("items").filter(aTableFilters);
			this.oTable.setShowOverlay(false);
		},
		onSearchClick: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				// var filter = new Filter("GenAIDescription", FilterOperator.Contains, sQuery);
				// aFilters.push(createFilterfilter);
				aFilters.push(this.createFilter("GenAIDescription", FilterOperator.Contains, sQuery, true));
			}

			// update list binding
			var oList = this.byId("_IDGenTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		//This allows for the searchbars filted to work with lower case and upper case
		createFilter: function (key, operator, value, useToLower) {
			return new Filter(useToLower ? "tolower(" + key + ")" : key, operator, useToLower ? "'" + value.toLowerCase() + "'" : value);
		},

		// onFilterChange: function () {
		// 	this._updateLabelsAndTable();
		// },

		// onAfterVariantLoad: function () {
		// 	this._updateLabelsAndTable();
		// },


		getFiltersWithValues: function () {
			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl();

				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
					aResult.push(oFilterGroupItem);
				}

				return aResult;
			}, []);

			return aFiltersWithValue;
		},


		onConfirmDialogPress: function () {
			var that = this;
			var oView = this.getView();
			var oModel = oView.getModel(); // or use a named model if needed
			// var oModel = this.getOwnerComponent().getModel();
			var oContext = oView.getBindingContext(); // or get from selected item
			console.log("Model here!: " + oModel);
			// if(oModel instanceof sap.ui.model.Model){
			// 	console.log("Safe");
			// }

			if (!this._oDialog) {
				// var frgaId = "openFrag";
				// this._oDialog = sap.ui.xmlfragment(
				// 	this.getView().getId(),
				// 	"wateruiv2.view.fragment.Form", this
				// );

				// this._oDialog.setModel(oModel);
				// this._oDialog.setBindingContext(oContext);
				// oView.addDependent(this._oDialog); // Optional

				var sPath = oContext.getPath(); // e.g., "/Notification('MN001')"
				var sObjectId = sPath.match(/\('(.+?)'\)/)[1]; // Extracts 'MN001'
				// oModel.setProperty(sPath + "/MaintPriority", "Completed");
				oModel.read("/NotificationMedia(" + "'" + sObjectId + "'" + ")", {
					success: function (oSuccess) {
						console.log("----SUCCESSS FRAGMENT BIDNING----" + oSuccess);
						// var frgaId = "openFrag";
						that._oDialog = sap.ui.xmlfragment(
							that.getView().getId(),
							"wateruiv2.view.fragment.Form", that
						);
						// sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oData), "modelSource");
						that._oDialog.setModel(new sap.ui.model.json.JSONModel(oSuccess), "NotificationMediaModel");
						// var oTable = sap.ui.getCore().byId("LineItemsSmartTable");
						// oTable.getBinding("items").refresh();
					},
					error: function (oErrorMsg) {
						console.log("!!!FRAGMENT BIDNING ERROR!!!" + oErrorMsg.message);
						// reject(oError);
					}
				});

			} else {
				this._oDialog.open();
			}
		},

		onSubmitOK: function () {
			// Get the model
			var oModel = this.getOwnerComponent().getModel();

			// Get the current binding context (assuming the view is bound to the object)
			var oContext = this.getView().getBindingContext();

			// Update the Maintpriority field to "4" which represents being complete
			if (oContext) {
				// var sPath = oContext.getPath();
				var sPath = oContext.getPath(); // e.g., "/Notification('MN001')"
				var sObjectId = sPath.match(/\('(.+?)'\)/)[1]; // Extracts 'MN001'

				oModel.setProperty(sPath + "/MaintPriority", "Completed");

				var oData = {
					MaintPriority: "Completed"
				}
				oModel.update("/Notification(" + "'" + sObjectId + "'" + ")", oData, {
					success: function (oSuccess) {
						console.log("----SUCCESSS----" + oSuccess.message);
						var oTable = sap.ui.getCore().byId("LineItemsSmartTable");
						// oTable.getBinding("items").refresh();
					},
					error: function (oErrorMsg) {
						console.log("!!!!!!" + oErrorMsg.message);
						// reject(oError);
					}
				})
			}

			//NOTE: The above should be set to 4 and then converted to "Complete in the formatter" so this is a temp solution
			//      Also the value is only set in the session... Once refreshed it resets... So need to change so it changes in the database/csv

			this._oDialog.close();
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
				console.log("going back!");
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteWorklist", {}, true); // Replace with your default route
				console.log("navigating!");
			}
		},

		onSubmitCancel: function () {
			this._oDialog.close();
		}
	});

});