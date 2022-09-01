sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast", /*Imports message boxgit*/
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast) {
   "use strict"; /*makes sure variables ae declared before they're used*/
   return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
   /*Extends Controller object of SAPUI5 core*/
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