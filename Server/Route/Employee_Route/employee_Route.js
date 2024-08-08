const express = require ('express');
const employee = express.Router()
const employee_Validation = require('../../Controller/Employee/validation')


const {view_employee,post_employee,update_employee, delete_employee, emp_count, employeeLogin, verifyToken, verifyUser} = require('../../Controller/Employee/Employee');

employee.get('/api/hospital/view_employee', view_employee )
employee.post('/api/hospital/post_employee',employee_Validation, post_employee )
employee.put('/api/hospital/edit_employee/:emp_id', update_employee )
employee.delete('/api/hospital/delete_employee/:emp_id', delete_employee )
employee.get('/api/hospital/emp_count',emp_count),
employee.post('/api/hospital/emp_login',employeeLogin)
employee.post('/api/hospital/verifytoken',verifyToken, verifyUser)



module.exports = employee