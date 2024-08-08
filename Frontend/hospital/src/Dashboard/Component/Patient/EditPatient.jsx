import React, { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function EditPatient({ props }) {
  const p_id = props.p_id;
  const p_name = props.p_name;
  const age = props.age;
  const gender = props.gender;
  const mobile = props.mobile;
  const city = props.city;
  const symptoms = props.symptoms;

  const [updatepatient, setUpdatePatient] = useState({
    p_name: p_name,
    age: age,
    gender: gender,
    mobile: mobile,
    city: city,
    symptoms: symptoms,
  });
  console.log(updatepatient)

  const handleUpdate = () => {
        axios
          .put(
            `http://localhost:5003/api/hospital/update_patient/${p_id}`,updatepatient)
          .then((res) => {
            console.log(res);
            alert("Successfuly updated")
            handleClose();
          })
          .catch((err) => console.log(err));
      };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handledelete = (p_id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          handleChange(p_id);
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      };
    
      const handleChange = (p_id) => {
        console.log(p_id);
        axios
          .delete(`http://localhost:5003/api/hospital/delete_patient/${p_id}`)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      };
  return (
    <>
      <div>
        <Button
          className="btn btn-info"
          onClick={() => handleShow()}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
            marginLeft: "5px",
          }}
        >
          <ModeEditOutlineIcon fontSize="small" />
        </Button>
        <Button
          className="btn btn-info"
           onClick={()=>handledelete(p_id)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
            marginLeft: "5px",
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter patient Name"
                  autoComplete="off"
                  value={updatepatient.p_name}
                  onChange={(e) => setUpdatePatient({...updatepatient,p_name: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label> Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  autoComplete="off"
                  value={updatepatient.age}
                  onChange={(e) => setUpdatePatient({...updatepatient,age: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label> Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter Mobile No"
                  autoComplete="off"
                  value={updatepatient.mobile}
                  onChange={(e) => setUpdatePatient({...updatepatient,mobile: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter City"
                  autoComplete="off"
                  value={updatepatient.city}
                  onChange={(e) => setUpdatePatient({...updatepatient,city: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label> Symptoms</Form.Label>
                <Form.Control
                  type="text"
                  name="symptoms"
                  placeholder="Enter symptoms"
                  autoComplete="off"
                  value={updatepatient.symptoms}
                  onChange={(e) => setUpdatePatient({...updatepatient,symptoms: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Label> Select Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={updatepatient.gender}
            onChange={(e) => setUpdatePatient({...updatepatient,gender: e.target.value })}
          >
            <option>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Patient
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPatient;
