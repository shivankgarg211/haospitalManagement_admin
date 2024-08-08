require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express')
app.use(express.static("Public"));
// const options = require('./Controller/Room/tbl_hsptl_room')

const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const cookieParser = require("cookie-parser");
app.use(cookieParser())

const room = require('./Route/Room_Route/tbl_room_route')
// const viewroom = require('./Route/Room_Route/tbl_room_route')
app.use('/', room)

const viewdeaprtment = require('./Route/Department_route/tbl_hsptl_department')
app.use('/', viewdeaprtment)

const viewrole = require('./Route/Role_Route/tbl_role_route');
app.use('/', viewrole)

const viewemployee = require('./Route/Employee_Route/employee_Route');
app.use('/', viewemployee)

const viewRoleassign = require('./Route/Assign_roleRoute/Assign_roleRoute');
app.use('/', viewRoleassign)

const view_profile = require('./Route/Emp_profile_route/emp_profileRoute');
app.use('/', view_profile)

const view_lab = require('./Route/lab_Route/lab_Route');
app.use('/', view_lab)

const patient = require('./Route/Patient_Route/patient_Route');
app.use('/', patient)

const treatment = require('./Route/Treatment_route/treatment_Route');
app.use('/', treatment)

const appointment = require("./Route/Appointment_Route/tbl_hsptl_appointment_route")
app.use('/', appointment)

const confirm = require("./Route/Confirm_Appointment_Route/confirm_appointment_Route");

app.use('/', confirm)

const port = process.env.PORT;

//   swagger

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "node js api documentation for psql",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5003"
      }
    ]
  },
  apis: ['./Route/Room_Route/tbl_room_route.js'],
  apis: ['./Route/Role_Route/tbl_role_route.js']
}

app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerJsdoc(options)));


app.listen(port, () => {
  console.log(`connection established ${port}`);
});
