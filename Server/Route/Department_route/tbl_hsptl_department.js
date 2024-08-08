const express = require('express')
 const deaprtment = express.Router()
 const departmentValidation = require('../../Controller/Department/Validation/Validation')

 const {get_department, post_department, update_department, delete_department, get_room} = require("../../Controller/Department/tbl_hsptl_department")
 deaprtment.get('/api/hospital/get_department', get_department)
 deaprtment.post('/api/hospital/post_department',departmentValidation, post_department)
 deaprtment.put('/api/hospital/update_department/:dept_id', update_department)
 deaprtment.delete('/api/hospital/delete_department/:dept_id', delete_department)
 deaprtment.get('/api/hospital/get_room', get_room)


 module.exports = deaprtment