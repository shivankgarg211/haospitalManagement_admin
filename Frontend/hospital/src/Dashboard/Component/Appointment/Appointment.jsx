import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { FormGroup, Input } from "@mui/material";

function Appointment() {
  const [item, setItem] = useState([]);
  const [viewAssignDoctor, setViewAssignDoctor] = useState({});
  const [viewDoctor, setViewDoctor] = useState([]);
  const [selectAppointmentId, setSelectAppointmentId] = useState(null);
  const [updateAppointment, setUpdateAppointment] = useState({
    appointment_date: "",
    time: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewAppointment = () => {
    axios
      .get("http://localhost:5003/api/patient/viewAppointment")
      .then((result) => {
        setItem(result.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShow1 = (id) => {
    const appo = item.find((d) => d.id === id);
    setUpdateAppointment({
      appointment_date: appo.appointment_date,
      time: appo.time,
    });
    setSelectAppointmentId(id);
    setShow(true);
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5003/api/patient/updatePatientAppointment/${selectAppointmentId}`,
        {
          appointment_date: updateAppointment.appointment_date,
          time: updateAppointment.time,
        }
      )
      .then((result) => {
        handleClose();
        viewAppointment();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Assign doctor 
// view employee only doctor
  const getDoctor = () => {
    axios
      .get("http://localhost:5003/api/hsptl/viewDoctor")
      .then((result) => {
        setViewDoctor(result.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };
// view ki is appointment ko konsa doctor assign hai
  const getAssignedDoctor = (id) => {
    axios
      .get(`http://localhost:5003/api/hsptl/view_Assign_doctor/${id}`)
      .then((result) => {
        setViewAssignDoctor((prev) => ({
          ...prev,
          [id]: result.data.rows[0]?.emp_name || "Not Assigned",
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Assign doctor 

  const handleDoctorConfirm=(id,emp_id)=>{
  console.log(emp_id,id)
  const updateDoctor = {
    emp_id:emp_id,
    id:id
  }

  axios.post("http://localhost:5003/api/hsptl/post_DoctorConfirm",updateDoctor)
       .then((result)=>{
        console.log(result)
        alert("Doctor Assigned Successfuly")
        viewAppointment()
       }).catch((error)=>{
        console.log(error)
       })
  
  }

  useEffect(() => {
    viewAppointment();
    getDoctor();
  }, []);

  useEffect(() => {
    if (item.length > 0) {
      item.forEach((appointment) => {
        getAssignedDoctor(appointment.id);
      });
    }
  }, [item]);

  const columns = [
    { name: "Id", selector: (row) => row.id },
    { name: "Name", selector: (row) => row.name },
    { name: "Mobile", selector: (row) => row.mobile },
    { name: "Gender", selector: (row) => row.gender },
    { name: "Age", selector: (row) => row.age },
    { name: "Symptoms", selector: (row) => row.symptoms },
    { name: "Email", selector: (row) => row.email },
    { name: "Appointment Date", selector: (row) => row.appointment_date },
    { name: "Time", selector: (row) => row.time },
    {
      name: "Doctor",
      selector: (row) => viewAssignDoctor[row.id] || "Not Assigned",
    },
    {
      name: "Assign Doctor",
      cell: (row) => (
        <Form.Control as="select"
        value={row.id}
        onChange={(e) => handleDoctorConfirm(row.id,e.target.value)}>
          <option value="">Select Doctor</option>
          {viewDoctor.map((d) => (
            <option key={d.emp_id} value={d.emp_id}>
              {d.emp_name}
            </option>
          ))}
        </Form.Control>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Button
            className="btn btn-info"
            onClick={() => handleShow1(row.id)}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #50DEC2",
              marginLeft: "5px",
            }}
          >
            <ModeEditOutlineIcon fontSize="small" />
          </Button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "2px",
        // height: "3.1vw",
        color: "black",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "black",
        backgroundColor: "#50DEC2",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Appointment List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex flex-grow-1 justify-content-end">
                <Input
                  type="text"
                  placeholder="Search by Name"
                  className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={item}
              customStyles={customStyles}
              pagination
              paginationPerPage={10}
              fixedHeader
              highlightOnHover
              responsive
            />
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="yyyy-mm-dd"
              autoComplete="off"
              value={updateAppointment.appointment_date}
              onChange={(e) =>
                setUpdateAppointment({
                  ...updateAppointment,
                  appointment_date: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="time"
              autoComplete="off"
              value={updateAppointment.time}
              onChange={(e) =>
                setUpdateAppointment({
                  ...updateAppointment,
                  time: e.target.value,
                })
              }
            />
          </FormGroup>
          {/* <FormGroup>
            <Form.Label>Select Doctor</Form.Label>
            <Form.Control as="select">
              <option value="">Select Doctor</option>
              {viewDoctor.map((d) => (
                <option key={d.emp_id} value={d.emp_id}>
                  {d.emp_name}
                </option>
              ))}
            </Form.Control>
          </FormGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Appointment;
