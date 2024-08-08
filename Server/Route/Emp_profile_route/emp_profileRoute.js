const express = require('express')
 const profile = express.Router()
 const profileValidation = require('../../Controller/Employee_profile/joiValidation');
 const upload = require('../../Multer_image/Multer')
 
 const {view_profile, post_profile, update_profile, delete_emp_profile, viewEmpprofile} = require('../../Controller/Employee_profile/Emp_profile');
 profile.get("/api/hospital/view_profile",view_profile);
 profile.post("/api/hospital/post_profile",profileValidation, upload.single('image'),post_profile);
 profile.put("/api/hospital/update_profile/:pro_id",update_profile);
 profile.delete("/api/hospital/delete_profile/:pro_id",delete_emp_profile);
 profile.get('/hospital/:emp_id',viewEmpprofile)
 module.exports = profile