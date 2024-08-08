import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

function Update_profile({ props }) {
  const pro_id = props.pro_id;
  console.log(pro_id);
  const pro_name = props.pro_name;
  const gender = props.gender;
  const mobile = props.mobile;
  const address = props.address;
  const salary = props.salary;
  const doj = props.doj;
  const dob = props.dob;
  const adhar_no = props.adhar_no;
  // const emp_id = props.emp_id;
  // const image = props.image;
  console.log(pro_id,pro_name, gender,mobile,address,salary,
    doj ,dob,adhar_no
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const[profile,setProfile] = useState(pro_id)

  const handleUpdate =()=>{
    axios.put(`http://localhost:5003/api/hospital/update_profile/${pro_id}`,{
       pro_name : profile, 
        gender: profile,
        mobile:profile,
        address:profile,
        salary:profile,
        doj :profile,
        dob: profile,
        adhar_no:profile,
        // emp_id:profile
    })
    .then((res)=>{
      console.log(res)
      handleClose()
      window.location.reload();
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <Button
          className="btn btn-info"
          onClick={handleShow}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
          }}
        >
          <ModeEditOutlineIcon fontSize="small" />
        </Button>
        <Button
          className="btn btn-info"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
            marginLeft: "5px",
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>

      <div>
        <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="pro_name"
                    placeholder="Enter Profile Name"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number "
                    name="age"
                    placeholder="Enter age"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setProfile(e.target.value)}
                  >
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    placeholder="Enter number"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>


            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Date of joining</Form.Label>
                  <Form.Control
                    type="date"
                    name="date "
                    placeholder="Enter DOJ"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Enter Dob"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label> Aadhar No</Form.Label>
                  <Form.Control
                    type="text"
                    name="dept_id"
                    placeholder="Enter Dept Id"
                    autoComplete="off"
                    onChange={(e) => setProfile(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Update_profile;
