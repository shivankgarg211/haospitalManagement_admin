const express = require ('express');
const confirm = express.Router();


const{view_Doctor, post_DoctorConfirm, viewAssign_Doctor} = require("../../Controller/Confirm_Appointment/Confirm_appointment");
confirm.get("/api/hsptl/viewDoctor", view_Doctor);
confirm.post("/api/hsptl/post_DoctorConfirm", post_DoctorConfirm);
confirm.get("/api/hsptl/view_Assign_doctor/:id",viewAssign_Doctor)
module.exports = confirm