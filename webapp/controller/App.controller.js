sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Carousel",
	"sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
], function (Controller, Carousel, Dialog, Button, mobileLibrary, JSONModel) {
	"use strict";
	var self;
	// shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

	onOpenCarousel : function () {

	    let model = this.getView().getModel("planisense").getData();
	    /*let carousel = new Carousel({
	    });*/

	    if (!this.oDefaultDialog) {
            this.oDefaultDialog = new Dialog({
                 title: "Invoices higher than 50 EUR",
                 //content: "carousel",
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
	}

	});

});