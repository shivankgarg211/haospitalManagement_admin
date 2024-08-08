import { Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Modal from "react-bootstrap/Modal";
import EditPatient from "./EditPatient";

function Patient() {
  const [item, setItem] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data,setData]= useState({
    p_id:"",
    p_name:"",
    age:"",
    gender:"",
    mobile:"",
    city:"",
    symptoms:""
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewPatient = () => {
    axios.get("http://localhost:5003/api/hospital/view_patient").then((res) => {
      console.log(res.data.rows);
      setItem(res.data.rows);
      setFilteredData(res.data.rows)
    }).catch((err)=>{
      console.log(err)
    })
  };

  useEffect(() => {
    viewPatient();
  }, []);

  const handlePostPatient =()=>{
    axios.post("http://localhost:5003/api/hospital/post_patient", data)
  .then((res)=>{
     setData(res.data.rows)
     viewPatient()
      handleClose()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const columns = [
    {
      name: "Patient Id",
      selector: (row) => row.p_id,
    },
    {
      name: "Patient Name",
      selector: (row) => row.p_name,
    },
    {
      name: "Age",
      selector: (row) => row.age,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Symptoms",
      selector: (row) => row.symptoms,
    },
    {
      name: "Action",
      cell: (row) => (
     <div>
      <EditPatient props = {row}/>
     </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        // minHeight: "2px",
        // height:"2.5vw",
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

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const newData = filteredData.filter((row) =>
      row.p_name.toLowerCase().includes(value)
    );
    setItem(newData);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Patient List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Button
                color="#50DEC2"
                style={{
                  background: "transparent",
                  color: "black",
                  border: "2px solid #50DEC2",
                }}
                onClick={handleShow}
              >
                Add Patient
              </Button>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Name"
                  className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                   onChange={handleSearch}
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

      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Patient Id</Form.Label>
                <Form.Control
                  type="text"
                  name="p_id"
                  placeholder="Enter patient Id"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, p_id: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter patient Name"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, p_name: e.target.value })}
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
                  onChange={(e) => setData({ ...data, age: e.target.value })}
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
                  onChange={(e) => setData({ ...data, mobile: e.target.value })}
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
                  onChange={(e) => setData({ ...data, city: e.target.value })}
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
                  onChange={(e) => setData({ ...data, symptoms: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Label> Select Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, gender: e.target.value })}
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
          <Button variant="primary" onClick={handlePostPatient}>
            Add Patient
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Patient;
