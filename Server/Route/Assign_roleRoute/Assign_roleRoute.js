const express = require ('express');
const assign = express.Router();


const{get_roleAssign, post_roleAssign,update_roleAssign, get_emp_roleAssign} = require('../../Controller/Role_assign/assign_role')
assign.get('/api/hospital/view_Roleassign', get_roleAssign);
assign.post('/api/hospital/post_Roleassign', post_roleAssign);
assign.put('/api/hospital/update_Roleassign/:role_id', update_roleAssign);
assign.get('/api/hospital/emp_roleAssign/getEmpRoleAssign', get_emp_roleAssign);


module.exports = assign