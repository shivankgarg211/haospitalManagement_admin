import { Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { Link } from "react-router-dom";
import moment from "moment";
import Update_profile from "./Update_profile";

function Profile() {
  const [item, setItem] = useState([]);
  const [itememployee, setItememployee] = useState([]);
  const [data, setData] = useState({
    pro_id: "",
    pro_name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    salary: "",
    doj: "",
    dob: "",
    adhar_no: "",
    emp_id: "",
    image: null,
  });
  console.log(data);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // post [profile]//
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pro_id", data.pro_id);
    formData.append("pro_name", data.pro_name);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    formData.append("mobile", data.mobile);
    formData.append("address", data.address);
    formData.append("salary", data.salary);
    formData.append("doj", data.doj);
    formData.append("dob", data.dob);
    formData.append("adhar_no", data.adhar_no);
    formData.append("emp_id", data.emp_id);
    formData.append("image", data.image);

    axios
      .post("http://localhost:5003/api/hospital/post_profile", formData)

      .then((response) => {
        console.log(response.data);
        alert("Form submitted successfully!");
        viewprofile();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while submitting the form.");
      });
  };

  const viewEmployee = () => {
    axios
      .get("http://localhost:5003/api/hospital/view_employee")
      .then((res) => {
        setItememployee(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // get profile

  const viewprofile = () => {
    axios
      .get("http://localhost:5003/api/hospital/view_profile")
      .then((res) => {
        setItem(res.data.rows);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewprofile();
    viewEmployee();
  }, []);
  const columns = [
    {
      name: "Pro Id",
      selector: (row) => row.pro_id,
    },
    {
      name: "Pro Name",
      selector: (row) => row.pro_name,
    },
    {
      name: " Age",
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
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
    },
    {
      name: "DOJ",
      selector: (row) => moment(row.doj).format("YYYY-MM-DD"),
    },
    {
      name: "DOB",
      selector: (row) => moment(row.dob).format("YYYY-MM-DD"),
    },
    {
      name: "Aadhar No",
      selector: (row) => row.adhar_no,
    },
    {
      name: "Emp ID",
      selector: (row) => row.emp_id,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`http://localhost:5003/Image/${row.image}`}
          alt={row.image}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (<Update_profile props={row}/>),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        // minHeight: "2px",
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
              <h3>Employee Profile List</h3>
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
                Add Prof
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
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Pro Id</Form.Label>
                <Form.Control
                  type="text"
                  name="pro_id"
                  placeholder="Enter profile Id"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, pro_id: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Profile Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pro_name"
                  placeholder="Enter Profile Name"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, pro_name: e.target.value })
                  }
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
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number "
                  name="age"
                  placeholder="Enter age"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
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
                  onChange={(e) => setData({ ...data, mobile: e.target.value })}
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
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col>
              <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="number"
                  name="number"
                  placeholder="Enter number"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, mobile: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            {/* <Col>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, address: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  placeholder="Enter salary"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, salary: e.target.value })}
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
                  onChange={(e) => setData({ ...data, doj: e.target.value })}
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
                  onChange={(e) => setData({ ...data, dob: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col>
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  placeholder="Enter salary"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, salary: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            {/* <Col>
              <Form.Group>
                <Form.Label>Date of joining</Form.Label>
                <Form.Control
                  type="date"
                  name="date "
                  placeholder="Enter DOJ"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, doj: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group>
                <Form.Label> Aadhar No</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter Dept Id"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, adhar_no: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Emp Id</Form.Label>
                <Form.Control
                  as="select" // Use <Form.Control> as a select input
                  onChange={(e) => setData({ ...data, emp_id: e.target.value })}
                >
                  <option value="">Select Employee</option>
                  {itememployee.map((d) => (
                    <option key={d.emp_id} value={d.emp_id}>
                      {d.emp_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col>
              <Form.Group>
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="Enter Dob"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, dob: e.target.value })}
                />
              </Form.Group>
            </Col> */}
            {/* <Col>
              <Form.Group>
                <Form.Label> Aadhar No</Form.Label>
                <Form.Control
                  type="text"
                  name="dept_id"
                  placeholder="Enter Dept Id"
                  autoComplete="off"
                  onChange={(e) => setData({ ...data, adhar_no: e.target.value })}
                />
              </Form.Group>
            </Col> */}
          </Row>
          <Row>
            {/* <Col>
              <Form.Group>
                <Form.Label>Emp Id</Form.Label>
                <Form.Control
              as="select" // Use <Form.Control> as a select input
              onChange={(e) => setData({ ...data, emp_id: e.target.value })}
            >
              <option value="">Select Employee</option>
              {itememployee.map((d) => (
                <option key={d.emp_id} value={d.emp_id}>
                  {d.emp_name}
                </option>
              ))}
            </Form.Control>
              </Form.Group>
              </Col> */}
            {/* <Col>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  autoComplete="off"
                  onChange={(e)=> setData({...data, image:e.target.files[0]})}
                />
              </Form.Group>
            
            </Col> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
