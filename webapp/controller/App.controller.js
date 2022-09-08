sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Carousel",
	"sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/ui/model/json/JSONModel",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Page"
], function (Controller, Carousel, Dialog, Button, mobileLibrary, JSONModel, List, StandardListItem, Page) {
	"use strict";
	var self;
	// shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.DialogType
    var DialogType = mobileLibrary.DialogType;

	return Controller.extend("sap.ui.demo.walkthrough.controller.App", {

	onOpenCarousel : function () {

	    let model = this.getView().getModel("planisense").getData();
	    const listArray = [];
	    for(let i = 0; i<model.PlaniSense.length;i++){
	     const personn = model.PlaniSense[i];
	     let list = new List({});
	     let item =  new StandardListItem({
	        title: personn.FirstName+" "+ personn.LastName,
            info: "sign: "+personn.Sign+" job:"+personn.Job
         });
         list.addItem(item);
         listArray.push(list);
	    }
	    let carousel = new Carousel({
	        loop : true,
	        pages : listArray
	    });
	    //let page = new Table({})
	    //carousel.setModel(new JSONModel(model.PlaniSense));

	    if (!this.oDefaultDialog) {
            this.oDefaultDialog = new Dialog({
                 title: "PlaniSense Carousel",
                 resizable: true,
                 content: carousel,
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