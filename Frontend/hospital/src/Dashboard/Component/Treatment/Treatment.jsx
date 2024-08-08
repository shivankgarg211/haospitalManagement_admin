import { Input } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

function Treatment() {
  const [item, setItem] = useState([])
  const [viewDoctor, setViewDoctor] = useState([])
  const [viewpatient, setViewpatient] = useState([])

  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    emp_id: "",
    p_id: "",
    // date: ""
  })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const viewPatient = () => {
    axios.get("http://localhost:5003/api/hospital/view_patient").then((res) => {
      console.log(res.data.rows);
      setViewpatient(res.data.rows);
     
    }).catch((err)=>{
      console.log(err)
    })
  };

  const ViewDoctor = () => {
    axios.get("http://localhost:5003/api/hospital/viewDoctor")
      .then((res) => {
        console.log(res.data.rows)
        setViewDoctor(res.data.rows)
      }).catch((err) => {
        console.log(err)
      })
  }

  const ViewTreatment = () => {
    axios.get("http://localhost:5003/api/hospital/view_treatment")
      .then((res) => {
        console.log(res.data.rows)
        setItem(res.data.rows)
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    axios.post("http://localhost:5003/api/hospital/post_treatment", data)
      .then((res) => {
        console.log(res.data.rows)
        handleClose()
        ViewTreatment()
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    ViewTreatment()
    ViewDoctor()
    viewPatient()
  }, [])

  const columns = [
    {
      name: "Patient Id",
      selector: (row) => row.p_id,
    },
    {
      name: "Employee Id",
      selector: (row) => row.emp_id,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("DD-MM-YYYY"),
    },
  ]

  const customStyles = {
    rows: {
      style: {
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
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <h3>Treatment List</h3>
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
              Add Treatment
            </Button>
            <div className="d-flex">
              <Input
                type="text"
                placeholder="Search by Name"
                className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                // onChange={handleSearch}
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

          <Modal show={show} onHide={handleClose} style={{ marginTop: '8vh' }}>
            <Modal.Header closeButton>
              <Modal.Title>Add Treatment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Patient Id</Form.Label>
                <Form.Select
                  type="text"
                  name="p_id"
                
                  value={data.p_id}
                  onChange={(e) => setData({ ...data, p_id: e.target.value })}
                >

<option>Select Patient</option>
                  {viewpatient.map((d) => (
                    <option key={d.p_id} value={d.p_id}>
                      {d.p_name}
                    </option>
                  ))}
                </Form.Select>

              </Form.Group>
              <Form.Group>
                <Form.Label>Employee Id</Form.Label>
                <Form.Select
                  name="emp_id"
                  value={data.emp_id}
                  onChange={(e) => setData({ ...data, emp_id: e.target.value })}
                >
                  <option>Select doctor</option>
                  {viewDoctor.map((d) => (
                    <option key={d.emp_id} value={d.emp_id}>
                      {d.emp_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Add Treatment
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  )
}

export default Treatment
