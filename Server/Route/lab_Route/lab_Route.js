const express = require('express');
const lab = express.Router();
const joi = require('joi');
const lab_Validation = require('../../Controller/Lab/Validation_lab');


const {view_lab,post_lab, update_lab, lab_delete} = require('../../Controller/Lab/Lab')
lab.get('/api/hospital/lab',view_lab)
lab.post('/api/hospital/post_lab', lab_Validation,post_lab)
lab.put('/api/hospital/update_lab/:lab_no',update_lab)
lab.delete('/api/hospital/delete_lab/:lab_no',lab_delete)

module.exports = lab