import React, {  useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateRoom({ props }) {
  const room_id = props.room_id;
  const room_name = props.room_name;
 

 
  const [showupdate, setShowupdate] = useState(false);
   
  const handleClose1 = () => setShowupdate(false);
  const handleShow1 = () => setShowupdate(true);

  const [updatedRoomName, setUpdatedRoomName] = useState(room_name);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5003/api/hospital/update_room/${room_id}`, {
        room_name: updatedRoomName,
      })
      .then((res) => {
        console.log(res);
        handleClose1();
        window.location.reload();
        toast.success("Updated Notification !", {
          position: "top-center"
        });
      })
      .catch((err) => console.log(err));
  };


// delete

  const handledelete = (room_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      handleChange(room_id);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChange = (room_id) => {
    console.log(room_id);
    axios
      .delete(`http://localhost:5003/api/hospital/delete_room/${room_id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  

  return (
    <>
      <div className="d-flex justify-content-beetween">
        <Button
          className="btn btn-info"
          onClick={handleShow1}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
          }}
        >
          <ModeEditOutlineIcon fontSize="small" />
        </Button>
        <Button
          className="btn btn-info"
          onClick={() => handledelete(room_id)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #50DEC2",
            marginLeft: "5px",
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>

      {/* { edit } */}
      <Modal
        show={showupdate}
        onHide={handleClose1}
        style={{ marginTop: "8vh" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              name="room_name"
              placeholder={room_name}
              autoComplete="off"
              onChange={(e) => setUpdatedRoomName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
             update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}

export default UpdateRoom;
