sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict"; /*makes sure variables ae declared before they're used*/
   return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
   /*Extends Controller object of SAPUI5 core*/
      onShowHello : function () {
         // show a native JavaScript alert
         alert("Hello World");
      }
   });
});