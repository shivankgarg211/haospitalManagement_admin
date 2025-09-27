const express = require("express");
const patientPrescription = express.Router();
const { viewPrescription } = require("../../Controller/Prescription/Prescription");

// Define the route for viewing patient prescriptions
patientPrescription.get('/view_patientPrescription', viewPrescription);

// Export the router module
module.exports = patientPrescription;
