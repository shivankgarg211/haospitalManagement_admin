const connection = require("../../Modal/dbConnection");
const sendmail = require("../../Nodemailer/Mailer")


const view_Doctor = (req, res) => {
        try {
                let sqlQuery = `SELECT e.emp_id, e.emp_name  FROM employee e JOIN tbl_hsptl_role_assign ar ON e.emp_id = ar.emp_id JOIN tbl_hsptl_role r ON ar.role_id = r.role_id WHERE r.role_name = 'Doctor'`;
                connection.query(sqlQuery, function (error, result) {
                        if (error) {
                                console.log("Error", error.sqlMessage);
                                return res.status(500).json({ error: error.sqlMessage });
                        } else {
                                return res.json(result);
                        }
                });
        } catch (error) {
                console.log("Error", error.message);
                return res.status(500).json({ error: error.message });
        }
};


const post_DoctorConfirm = (req, res) => {
        try {
                const { emp_id, id } = req.body
                const sqlQuery =
                        "INSERT INTO confirm_appointment (emp_id,id) VALUES ($1, $2) RETURNING *";

                connection.query(sqlQuery, [emp_id, id], (error, result) => {
                        if (error) {
                                console.log("Error", error.message);
                                res.status(500).json({ error: error.message });
                        } else {
                                res.json({
                                        message: "Doctor Assign successfully ",
                                        data: result.rows[0],
                                });
                        }
                });
        } catch (error) {
                console.log("Error", error.message);
                res.status(500).json({ error: error.message });
        }
};


// const post_DoctorConfirm = (req, res) => {
//         try {
//                 const { emp_id, id } = req.body;
//                 const sqlQuery = "INSERT INTO confirm_appointment (emp_id, id) VALUES ($1, $2, $3, $4) RETURNING *";

//                 connection.query(sqlQuery, [emp_id, id, appointment_date, appointment_time], (error, result) => {
//                         if (error) {
//                                 console.log("Error", error.message);
//                                 res.status(500).json({ error: error.message });
//                         } else {
//                                 const appointmentDetails = result.rows[0];

//                                 // Send confirmation email to the doctor
//                                 try {
//                                         const emailMessage = `Dear Dr. ${emp_name},
    
//                                               An appointment has been booked for you.
    
//                                                            Details:
//                                               Appointment ID: ${appointmentDetails.id}
//                                               Appointment Date: ${appointment_date}
//                                               Appointment Time: ${appointment_time}
//                                                  Patient ID: ${id}
    
//                                                    Thank you,
//                                                   Your Clinic`;

//                                         sendMail(emp_email, 'New Appointment Confirmation', emailMessage);
//                                         res.json({
//                                                 message: 'Doctor assigned successfully, and confirmation email sent to the doctor',
//                                                 data: appointmentDetails,
//                                         });
//                                 } catch (mailError) {
//                                         console.error('Error sending email', mailError);
//                                         res.status(500).json({
//                                                 message: 'Appointment booked but failed to send confirmation email to the doctor',
//                                                 data: appointmentDetails,
//                                         });
//                                 }
//                         }
//                 });
//         } catch (error) {
//                 console.log("Error", error.message);
//                 res.status(500).json({ error: error.message });
//         }
// };

const viewAssign_Doctor = (req, res) => {
        try {
                const id = req.params.id
                let sqlQuery = `SELECT 
    employee.emp_name ,
    employee.emp_id
FROM 
    employee 
JOIN 
    confirm_appointment 
    ON confirm_appointment.emp_id = employee.emp_id 
JOIN 
    tbl_hsptl_appointment 
    ON tbl_hsptl_appointment.id = confirm_appointment.id  where tbl_hsptl_appointment.id = $1
`;
                connection.query(sqlQuery, [id], function (error, result) {
                        if (error) {
                                console.log("Error", error.sqlMessage);
                                return res.status(500).json({ error: error.sqlMessage });
                        } else {
                                return res.json(result);
                        }
                });
        } catch (error) {
                console.log("Error", error.message);
                return res.status(500).json({ error: error.message });
        }
};



module.exports = { view_Doctor, post_DoctorConfirm, viewAssign_Doctor }