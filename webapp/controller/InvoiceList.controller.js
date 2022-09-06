sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Fragment, formatter, Filter, FilterOperator) {
	"use strict";
	var self;

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,


		/*onInit: function(){
		    self = this;
           let prices = [];
           let invoicesModel = self.getView().byId("invoiceList").getModel().getData();
           for(var i=0; invoicesModel.length; i++){
               prices[i] = invoicesModel.get(i).ExtendedPrice;
           }
           let min = Math.min(prices);
           let max = Math.max(prices);

           let rangeSlide = self.getView().byId("rangeSlide");
           rangeSlide.setRange([min, max]);
           rangeSlide.setMin(min);
           rangeSlide.setMax(max);

           /*var oData = {RS:[min,max]};

           var oModel =  new JSONModel(oData);
           this.getView().setModel(oModel, "range");
		},*/
		onOpenAlert : function () {
             //recuperer Dialog avec byId et rajouter le truc dans le content
             //addContent en passant en param le nom de la table que je veux afficher
			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.walkthrough.view.AlertDialog"
				});
			}
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});

			let myAlert = this.byId("alertDialog");
			myAlert.addContent("alertTable");
		},
		onCloseAlert : function () {
        	// note: We don't need to chain to the pDialog promise, since this event-handler
        	// is only called from within the loaded dialog itself.
        		this.byId("alertDialog").close();
        },
         		onFilterInvoices : function (oEvent) {

         			// build filter array
         			var aFilter = [];
         			var sQuery = oEvent.getParameter("query");
         			if (sQuery) {
         				aFilter.push(new Filter("Currency", FilterOperator.Contains, sQuery));
         			}
         			// filter binding
         			var oList = this.byId("invoiceList");
         			var oBinding = oList.getBinding("items");
         			oBinding.filter(aFilter);
         		}
         	});

	});
