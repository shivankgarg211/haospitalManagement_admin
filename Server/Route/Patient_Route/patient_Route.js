const express = require('express');
const patient = express.Router();
const joi = require('joi');
const patient_Validation = require('../../Controller/Patient/patient_validation');


const{view_patient, post_patient, update_patient, delete_patient}= require('../../Controller/Patient/tbl_hsptl_patient');
patient.get('/api/hospital/view_patient',view_patient);
patient.post('/api/hospital/post_patient', patient_Validation,post_patient);
patient.put('/api/hospital/update_patient/:p_id', update_patient);
patient.delete('/api/hospital/delete_patient/:p_id', delete_patient);

module.exports = patient