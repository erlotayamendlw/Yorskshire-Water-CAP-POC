//@ui5-bundle wateroverview/Component-preload.js
sap.ui.require.preload({
	"wateroverview/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","wateroverview/model/models"],(e,t)=>{"use strict";return e.extend("wateroverview.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},init(){e.prototype.init.apply(this,arguments);this.setModel(t.createDeviceModel(),"device");this.getRouter().initialize()}})});
},
	"wateroverview/controller/App.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("wateroverview.controller.App",{onInit(){}})});
},
	"wateroverview/controller/OverviewPage.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller"],e=>{"use strict";return e.extend("wateroverview.controller.OverviewPage",{onInit(){}})});
},
	"wateroverview/i18n/i18n.properties":'# This is the resource bundle for wateroverview\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Yorkshire Water overview page\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Yorkshire Water overview page',
	"wateroverview/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"wateroverview","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.17.1","toolsId":"ed573ee1-ecba-41df-a318-d9a0872f1f4d"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.134.1","libs":{"sap.m":{},"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"wateroverview.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","controlAggregation":"pages","controlId":"app","transition":"slide","type":"View","viewType":"XML","path":"wateroverview.view","async":true,"viewPath":"wateroverview.view"},"routes":[{"name":"RouteOverviewPage","pattern":":?query:","target":["TargetOverviewPage"]}],"targets":{"TargetOverviewPage":{"id":"OverviewPage","name":"OverviewPage"}}},"rootView":{"viewName":"wateroverview.view.App","type":"XML","id":"App","async":true}}}',
	"wateroverview/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"wateroverview/view/App.view.xml":'<mvc:View controllerName="wateroverview.controller.App"\n    displayBlock="true"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"><App id="app"></App></mvc:View>',
	"wateroverview/view/OverviewPage.view.xml":'<mvc:View controllerName="wateroverview.controller.OverviewPage"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"></Page></mvc:View>'
});
//# sourceMappingURL=Component-preload.js.map
