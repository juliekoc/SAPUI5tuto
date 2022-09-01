sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast", /*Imports message boxgit*/
   "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
   "use strict"; /*makes sure variables ae declared before they're used*/
   return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
   /*Extends Controller object of SAPUI5 core*/
      onInit : function () { /*invoked by SAPUI5 when object created*/
               // set data model on view
               var oData = {
                  recipient : {
                     name : "World"
                  }
               };
               var oModel = new JSONModel(oData);
               this.getView().setModel(oModel);
            },
      onShowHello : function () {
         // show a native JavaScript alert
         MessageToast.show("Hello World");
      }
   });
});