import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './Dashboard/Component/Drawer/Sidebar.jsx'
import Dash from './Dashboard/Component/Dashboards/Dash.jsx'
import Room from './Dashboard/Component/Room/Room.jsx'
import Dept from './Dashboard/Component/Department/Dept.jsx'
import Employee from './Dashboard/Component/Employee/Employee.jsx'
import Profile from './Dashboard/Component/Employee_Profile/Profile.jsx'
import Role from './Dashboard/Component/Role/Role.jsx'
import Lab from './Dashboard/Component/Lab/Lab.jsx'
import Patient from './Dashboard/Component/Patient/Patient.jsx'
import Start from './Dashboard/Component/Start/Start.jsx'
import Treatment from './Dashboard/Component/Treatment/Treatment.jsx'
import ViewEmp_profile from './Dashboard/Component/Employee/ViewEmp_profile.jsx'
import Appointment from './Dashboard/Component/Appointment/Appointment.jsx'
import Login from './Dashboard/Component/Login/Login.jsx'
import axios from 'axios'
import Prescription from './Dashboard/Component/Prescription/Prescription.jsx'

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
       <Route path='/' element={<Sidebar/>}>
       <Route path='/dashboard' element={<Dash/>}></Route>
       <Route path='/room' element={<Room/>}></Route>
       <Route path='/department' element={<Dept/>}></Route>
       <Route path='/employee' element={<Employee/>}></Route>
       <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/viewEmp_profile/:emp_id' element={<ViewEmp_profile/>}></Route>
       <Route path='/role' element={<Role/>}></Route>
       <Route path='/lab' element={<Lab/>}></Route>
       <Route path='/Patient' element={<Patient/>}></Route>
       <Route path='/treatment' element={<Treatment/>}></Route>
       <Route path='/appointment' element={<Appointment/>}></Route>
       <Route path='/prescription' element={<Prescription/>}></Route>
       </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
