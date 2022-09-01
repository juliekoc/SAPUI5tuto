sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast", /*Imports message boxgit*/
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
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
               // set i18n model on view
               var i18nModel = new ResourceModel({
                   bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
               });
               this.getView().setModel(i18nModel, "i18n");
            },
      onShowHello : function () {
           // read msg from i18n model
           var oBundle = this.getView().getModel("i18n").getResourceBundle();
           var sRecipient = this.getView().getModel().getProperty("/recipient/name");
           var sMsg = oBundle.getText("helloMsg", [sRecipient]);
           // show message
           MessageToast.show(sMsg);
      }
   });
});