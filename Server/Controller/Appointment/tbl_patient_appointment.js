const connection = require("../../Modal/dbConnection");
const {sendMail} = require ("../../Nodemailer/Mailer")


const viewPatientAppointment = (req, res) => {
  try {
    let sqlQuery =
      "Select id,name,mobile,gender,age,symptoms,appointment_date,email,time FROM tbl_hsptl_appointment";
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        console.log(result);
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// const updatePatientAppointment = (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = {
//       appointment_date: req.body.appointment_date,
//       time: req.body.time,      
//     };
//     const psqlQuerry =
//       "UPDATE tbl_hsptl_appointment SET appointment_date = $1, time =$2 WHERE id = $3 RETURNING * ";

//     connection.query(
//       psqlQuerry,
//       [data.appointment_date, data.time, id],
//       (error, result) => {
//         if (error) {
//           console.log("Error", error.message);
//           res.status(500).json({ error: error.message });
//         } else {
//           res.json({
//             message: "Appointment Date and time updated ",
//             data: result.rows[0],
//           });
//         }
//       }
//     );
//   } catch (error) {
//     console.log("Error", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const updatePatientAppointment = (req, res) => {
  try {
    const id = req.params.id;
    const { appointment_date, time, email, name } = req.body;
    const data = { appointment_date, time };

    const psqlQuery =
      "UPDATE tbl_hsptl_appointment SET appointment_date = $1, time = $2 WHERE id = $3 RETURNING * ";

    connection.query(
      psqlQuery,
      [data.appointment_date, data.time, id],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          const updatedAppointment = result.rows[0];
          try {
            sendMail(
              email,
              "Appointment Confirmation",
              `Dear ${name}, your appointment has been Booked successfully to ${appointment_date} at ${time}.`
            );
            res.json({
              message: "Appointment date and time updated, and confirmation email sent",
              data: updatedAppointment,
            });
          } catch (mailError) {
            console.error("Error sending email", mailError);
            res.status(500).json({
              message: "Appointment updated but failed to send confirmation email",
              data: updatedAppointment,
            });
          }
        }
      }
    );
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};






module.exports = { viewPatientAppointment, updatePatientAppointment };
