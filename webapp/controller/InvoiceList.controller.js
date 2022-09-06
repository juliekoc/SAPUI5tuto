sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Text"
], function (Controller, formatter, Filter, FilterOperator, Dialog, Button, mobileLibrary, List, StandardListItem, Text) {
	"use strict";
	//var self;

	// shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

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

        /*onInit: function () {
        	var oModel = new JSONModel("invoice");
        	this.getView().setModel(oModel);
        },*/
		onOpenAlert : function () {
             if (!this.oDefaultDialog) {
             	this.oDefaultDialog = new Dialog({
             		title: "Invoices higher than 50 EUR",
             		content: new List({
             				items: {
             					path: 'invoice>/Invoices',
                                formatter: function (value) {
                                      value : "{invoice>ExtendedPrice}";
                                      if (value>50) {
                                          return true;
                                      }
                                          return false;
                                },
             					template: new StandardListItem({
             							title: "{invoice>Quantity} x {invoice>ProductName}",
             							info: "{invoice>ExtendedPrice} {invoice>Currency}",
             							})
             						}
             					}),
             					beginButton: new Button({
             						type: ButtonType.Emphasized,
             						text: "OK",
             						press: function () {
             							this.oDefaultDialog.close();
             						}.bind(this)
             					}),

             				});

             				// to get access to the controller's model
             				this.getView().addDependent(this.oDefaultDialog);
             			}

             			this.oDefaultDialog.open();
             		},

		onCloseAlert : function () {
        	// note: We don't need to chain to the pDialog promise, since this event-handler
        	// is only called from within the loaded dialog itself.
        		this.byId("alertDialog").close();
        },

        onFilterInvoices : function (oEvent) {

            // build filter array
        	/*var aFilter = [];
            var sQuery = oEvent.getParameter("query");
         	if (sQuery) {
         		aFilter.push(new Filter("Currency", FilterOperator.Contains, sQuery));
         	}*/
         	var sQuery = oEvent.getSource().getValue();

            var oFilter = new sap.ui.model.Filter({

                filters: [

                  new sap.ui.model.Filter("Currency", FilterOperator.Contains, sQuery),
                  new sap.ui.model.Filter("ProductName", FilterOperator.Contains, sQuery)

                ],
                and: false

              });
         	// filter binding
         	var oList = this.byId("invoiceList");
         	var oBinding = oList.getBinding("items");
         	oBinding.filter(oFilter);
        }
    });

});
