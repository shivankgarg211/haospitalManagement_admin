import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UpdateRole from "./UpdateRole";

function Role() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [item, setItem] = useState([]);
  const [inputdata, setInputData] = useState({
    role_id: "",
    role_name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5003/api/hospital/post_role", inputdata)
      .then((res) => {
        setInputData(res.data);
        alert("Role successfully Added");
        ViewRole();
        handleClose();
      });
  };

  const ViewRole = () => {
    axios.get("http://localhost:5003/api/hospital/view_role").then((res) => {
      setItem(res.data.rows);
      setFilteredData(res.data.rows);
    });
  };

  useEffect(() => {
    ViewRole();
  }, []);

  const columns = [
    {
      name: "Role Id",
      selector: (row) => row.role_id,
    },
    {
      name: "Role Name",
      selector: (row) => row.role_name,
    },
    {
      name: "Action",
      cell: (row) => <UpdateRole props={row} />,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "2px",
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
      row.role_name.toLowerCase().includes(value)
    );
    setItem(newData);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <div className="d-flex justify-content-center mb-3">
              <h3>Role List</h3>
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
                Add Role
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
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Role Id</Form.Label>
              <Form.Control
                type="text"
                name="role_id"
                placeholder="Enter Role Id"
                autoComplete="off"
                value={inputdata.role_id}
                onChange={(e) =>
                  setInputData({ ...inputdata, role_id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                name="role_name"
                placeholder="Enter Role Name"
                autoComplete="off"
                value={inputdata.role_name}
                onChange={(e) =>
                  setInputData({ ...inputdata, role_name: e.target.value })
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Role
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Role;
