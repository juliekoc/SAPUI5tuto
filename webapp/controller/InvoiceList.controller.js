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
    "sap/m/Text",
    "sap/m/Table",
    "sap/ui/model/json/JSONModel",
], function (Controller, formatter, Filter, FilterOperator, Dialog, Button, mobileLibrary, List, StandardListItem, Text, Table, JSONModel) {
	"use strict";
	var self;

	// shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,


		onInit: function(){
		    self = this;
           let invoicesModel = jQuery.sap.sjax({
                                    url: sap.ui.require.toUrl("sap/ui/demo/walkthrough/mockdata") + "/Invoices.json",
                                    dataType: "json",
                               }).data;
           let prices = [];

           for(var i=0; i<invoicesModel.Invoices.length; i++){
               prices[i] = invoicesModel.Invoices[i].ExtendedPrice;
           }
           let min = Math.min(prices);
           let max = Math.max(prices);
           let rangeSlide = self.getView().byId("rangeSlide");
           rangeSlide.setRange([min, max]);
           rangeSlide.setStep(5);
           rangeSlide.setMin(min);
           rangeSlide.setMax(max);
		},

		_onRouteMatched: function(){

		},

        /*onInit: function () {
        	var oModel = new JSONModel("invoice");
        	this.getView().setModel(oModel);
        },*/
		onOpenAlert : function () {

             let model = this.getView().getModel("invoice").getData();
             let filterModel = model.Invoices.filter(x => x.ExtendedPrice >= 50);
             let list = new List({
                                     				items: {
                                     					path: "/",
                                                        templateShareable:false,
                                     					template: new StandardListItem({
                                     							title: "{Quantity} x {ProductName}",
                                     							info: "{ExtendedPrice} {Currency}",
                                     							}),
                                     						}
                                     					});
            list.setModel(new JSONModel(filterModel));
             if (!this.oDefaultDialog) {
             	this.oDefaultDialog = new Dialog({
             		title: "Invoices higher than 50 EUR",
             		content: list,

//                    content: new Table({
//                             items: {
//                                  path: 'invoice>/Invoices',
//                                  parameters : {
//                                 		  $filter : 'invoice>ExtendedPrice gt 50',
//                                 		  $select : 'invoice>Quantity, invoice>ProductName, invoice>ExtendedPrice, invoice>Currency'
//                                  },
//                                  template: new ColumnListItem({
//                                            cells: "invoice>ProductName",
//                                            cells: "invoice>ExtendedPrice"
//                                  })
//                             }
//                    }),
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

        onFilterInvoices : function (oEvent) {

            // build filter array from tutorial
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
