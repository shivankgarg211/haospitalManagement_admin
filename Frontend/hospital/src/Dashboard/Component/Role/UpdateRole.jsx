import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function UpdateRole({ props }) {
  const role_id = props.role_id;
  const role_name = props.role_name;
  console.log(role_id, role_name);

  const [showupdate, setShowupdate] = useState(false);

  const handleClose1 = () => setShowupdate(false);
  const handleShow1 = () => setShowupdate(true);

  const [updateRoleName, setUpdateRoleName] = useState(role_name);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5003/api/hospital/update_role/${role_id}`, {
        role_name: updateRoleName,
      })

      .then((res) => {
       
        handleClose1();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handledelete = (role_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      handleChange(role_id);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChange = (role_id) => {
    console.log(role_id);
    axios
      .delete(`http://localhost:5003/api/hospital/delete_role/${role_id}`)
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
          onClick={() => handledelete(role_id)}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>

      <Modal
        show={showupdate}
        onHide={handleClose1}
        style={{ marginTop: "8vh" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              name="role_name"
              placeholder={role_name}
              autoComplete="off"
              onChange={(e) => setUpdateRoleName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Add Room
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default UpdateRole;
