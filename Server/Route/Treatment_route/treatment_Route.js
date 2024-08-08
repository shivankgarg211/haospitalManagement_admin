const express = require('express');
const treatment = express.Router();
const joi = require ('joi');
const treatmentValidation = require('../../Controller/Treatment/treatment_validation')

const {view_treatment,post_treatment, update_treatment, viewDoctor} = require('../../Controller/Treatment/tbl_hsptl_treatment');
treatment.get('/api/hospital/view_treatment',view_treatment);
treatment.post('/api/hospital/post_treatment',treatmentValidation,post_treatment);
treatment.put('/api/hospital/update_treatment/:p_id',update_treatment);
treatment.put('/api/hospital/update_treatment/:p_id',update_treatment);
treatment.get('/api/hospital/viewDoctor',viewDoctor);

module.exports = treatment