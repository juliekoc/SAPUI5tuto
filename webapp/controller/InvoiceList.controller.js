sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Fragment) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
	    formatter: formatter,

		onOpenDialog : function () {

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.walkthrough.view.AlertDialog"
				});
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
         		onFilterInvoices : function (oEvent) {

         			// build filter array
         			var aFilter = [];
         			var sQuery = oEvent.getParameter("query");
         			if (sQuery) {
         				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
         			}

         			// filter binding
         			var oList = this.byId("invoiceList");
         			var oBinding = oList.getBinding("items");
         			oBinding.filter(aFilter);
         		}
         	});

	});
});