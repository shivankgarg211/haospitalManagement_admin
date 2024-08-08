const express = require ("express");
const appointment = express.Router();



const {viewPatientAppointment, updatePatientAppointment} = require("../../Controller/Appointment/tbl_patient_appointment");
appointment.get("/api/patient/viewAppointment",viewPatientAppointment);
appointment.put("/api/patient/updatePatientAppointment/:id",updatePatientAppointment)


module.exports = appointment