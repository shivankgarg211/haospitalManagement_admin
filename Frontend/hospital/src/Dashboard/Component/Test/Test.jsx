import React, { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Input } from "@mui/material";
import Modal from "react-bootstrap/Modal";

function Test() {
  const [items, setItems] = useState([]); // Updated name for clarity
  const [show, setShow] = useState(false);
  const [viewlab, setViewLab] = useState([]); // Updated name for consistency
  const [inputValue, setInputValue] = useState({
    test_id: "",
    test_name: "",
    test_price: "",
    lab_no: "",
  });

  // Fetch test data
  const viewTest = () => {
    axios
      .get("http://localhost:5003/api/viewpatienttest")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch lab data
  const viewLab = () => {
    axios
      .get("http://localhost:5003/api/viewLab")
      .then((res) => {
        setViewLab(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle form submission for adding a test
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .post("http://localhost:5003/api/addpatienttest", inputValue)
      .then((res) => {
        console.log(res);
        handleClose(); // Close modal
        alert("Test added successfully");
        viewTest(); // Refresh the test list after adding
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    viewLab();
    viewTest();
  }, []);

  // Handle modal show and hide
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setInputValue({
      test_id: "",
      test_name: "",
      test_price: "",
      lab_no: "",
    });
    setShow(true);
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Test Id",
      selector: (row) => row.test_id,
    },
    {
      name: "Test Name",
      selector: (row) => row.test_name,
    },
    {
      name: "Test Price",
      selector: (row) => row.test_price,
    },
    {
      name: "Date",
      selector: (row) => moment(row.updation_date).format("DD-MM-YYYY"),
    },
    {
      name: "Lab No",
      selector: (row) => row.lab_no,
    },
  ];

  // Custom styles for DataTable
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
  };

  return (
    <>
      <Container fluid>
        <Row>
          <div className="d-flex justify-content-center">
            <h3>Test List</h3>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <Button onClick={handleShow}>Add Test</Button>
            <div className="d-flex">
              <Input
                type="text"
                placeholder="Search by Name"
                className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={items}
            customStyles={customStyles}
            pagination
            paginationPerPage={10}
            fixedHeader
            highlightOnHover
            responsive
          />
        </Row>
      </Container>

      {/* Add Test Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Test ID</Form.Label>
              <Form.Control
                type="text"
                name="test_id"
                placeholder="Enter Test ID"
                value={inputValue.test_id}
                onChange={(e) =>
                  setInputValue({ ...inputValue, test_id: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                name="test_name"
                placeholder="Enter Test Name"
                value={inputValue.test_name}
                onChange={(e) =>
                  setInputValue({ ...inputValue, test_name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Test Price</Form.Label>
              <Form.Control
                type="number"
                name="test_price"
                placeholder="Enter Test Price"
                value={inputValue.test_price}
                onChange={(e) =>
                  setInputValue({ ...inputValue, test_price: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lab</Form.Label>
              <Form.Control
                as="select"
                name="lab_no"
                value={inputValue.lab_no}
                onChange={(e) =>
                  setInputValue({ ...inputValue, lab_no: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select Lab
                </option>
                {viewlab.map((lab) => (
                  <option key={lab.lab_no} value={lab.lab_no}>
                    {lab.lab_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Test;
