const express = require ("express");
const test = express.Router();

const {addTest,viewTest, view_lab} = require('../../Controller/Test/Test')
test.post('/api/addpatienttest',addTest);
//  test.get('/api/viewpatienttest/:id',viewPatientTest);
 test.get('/api/viewpatienttest',viewTest);
 test.get('/api/viewLab',view_lab);

module.exports = test