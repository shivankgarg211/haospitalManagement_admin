import React, { useEffect, useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function Editemployee({ props }) {
  const emp_id = props.emp_id;
  const emp_name = props.emp_name;
  const dept_id = props.dept_id;
  const email = props.email;
  const password = props.password;

  const [viewdept, setViewdept] = useState([]);
  const [updateemp, setUpdateEmp] = useState({
    emp_name: emp_name,
    dept_id: dept_id,
    email: email,
    password: password,
  });
  const [showupdate, setShowupdate] = useState(false);

  const handleClose1 = () => setShowupdate(false);
  const handleShow1 = () => setShowupdate(true);

  const viewDepartment = () => {
    axios
      .get("http://localhost:5003/api/hospital/get_department")
      .then((res) => {
        setViewdept(res.data.rows);
      });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5003/api/hospital/edit_employee/${emp_id}`,
        updateemp
      )
      .then((res) => {
        console.log(res);
        handleClose1();
        alert("Successfuly updated");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    viewDepartment();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    viewDepartment();
  }, []);

  //   delete

  const handledelete = (emp_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      handleChangeDelete(emp_id);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChangeDelete = (emp_id) => {
    console.log(emp_id);
    axios
      .delete(`http://localhost:5003/api/hospital/delete_employee/${emp_id}`)
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
          className="btn btn-info "
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
            marginLeft: "5px",
          }}
          onClick={handleShow1}
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
          onClick={() => handledelete(emp_id)}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>
      <Modal
        show={showupdate}
        onHide={handleClose1}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Emp Name</Form.Label>
            <Form.Control
              type="text"
              name="emp_name"
              placeholder={emp_name}
              autoComplete="off"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dept Id</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Department"
              onChange={handleChange}
            >
              {viewdept.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>
                  {d.dept_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder={email}
              autoComplete="off"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Passwords</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Edit Emp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Editemployee;
