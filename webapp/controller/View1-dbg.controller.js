sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.snet.proj.zprojmassupdate.controller.View1", {
            onInit: function () {

            },

        
            onUpdate: function (oEvent) {

            var oModel = this.getView().getModel();
            var oEntry = {};

            oEntry.ProjectDefinition = this.getView().byId("idProjectCode").getValue();
            oEntry.PlannedFinishDate = this.getView().byId("idDueDate").getDateValue();

            if (oEntry.ProjectDefinition.length === 0 || oEntry.ProjectDefinition === '') {
                MessageToast.show('Please enter the Project Code');
                return;
            }

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                //   pattern: "yyyyMMdd"
                pattern: "MM/dd/yyyy"
            });

            oEntry.PlannedFinishDate = dateFormat.format(oEntry.PlannedFinishDate);
            
            if(oEntry.PlannedFinishDate === "" || oEntry.PlannedFinishDate === null )
            {
                MessageToast.show('Please enter the valid date!!');
                this.getView().byId("idDueDate").setDateValue();
                return;
            }

            oModel.create("/ProjectSet", oEntry, {
                method: "POST",
                success: function (data) {
                    this.getView().byId("idDueDate").setDateValue();
                    MessageToast.show("Due Date has been successfully updated for the project ' " + data.ProjectDefinition + "'");
                }.bind(this),
                error: function (e) {
                    //MessageToast.show(e.responseText.split(',')[2].split(":")[1] + ' ' + e.responseText.split(',')[2].split(":")[2]);
                    this.getView().byId("idDueDate").setDateValue();
                    MessageToast.show(JSON.parse(e.responseText).error.message.value);
                }.bind(this)
            });
        },

            onChangeOfProject: function (oEvent) {

                var inputControl = oEvent.getSource();
                var inputValue = inputControl.getValue();

                // Define a regular expression to allow only alphanumeric characters
                var alphanumericRegex = /^[a-zA-Z0-9.]*$/;

                // Check if the input value matches the alphanumeric regex
                if (!alphanumericRegex.test(inputValue)) {
                    // If not alphanumeric, remove the last entered character
                    var newValue = inputValue.slice(0, -1);
                    inputControl.setValue(newValue);
                }

            }
        });
    });
