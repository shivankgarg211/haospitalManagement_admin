import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Input } from "@mui/material";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
function Dept() {
  const [showupdate, setShowupdate] = useState(false);

  const handleClose1 = () => setShowupdate(false);
  
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [item, setItem] = useState([]); //get Dept useState
  const [filterData, setFilteredData] = useState([]); //search
  const [room, setRoom] = useState([]); // view room
  const [data, setData] = useState({
    dept_id: "",
    dept_name: "",
    room_id: "",
    dept_esta_date: "",
  });

  //  ===== update

  const [selectedDeptId, setSelectedDeptId] = useState(null); //dept_id state
  const [updatedept, setUpdatedept] = useState({
    dept_name: "",
    room_id: "",                         // update data state
    dept_esta_date: "",
  });
  const handleShow1 = (dept_id) => {
    const dept = item.find((d) => d.dept_id === dept_id);
    setUpdatedept({
      dept_name: dept.dept_name,
      room_id: dept.room_id,
      dept_esta_date: moment(dept.dept_esta_date).format("YYYY-MM-DD"),
    });
    setSelectedDeptId(dept_id);
    setShowupdate(true);
  };
  
  const handleUpdate = () => {
    axios
      .put(`http://localhost:5003/api/hospital/update_department/${selectedDeptId}`, {
        dept_name: updatedept.dept_name,
        room_id: updatedept.room_id,
        dept_esta_date: updatedept.dept_esta_date,
      })
      .then((res) => {
        console.log(res);
      });
      handleClose1()
      viewDept()
  };

  // ========Update===========

  const viewDept = () => {
    axios
      .get("http://localhost:5003/api/hospital/get_department")
      .then((res) => {
        setItem(res.data.rows);
        setFilteredData(res.data.rows);
      });
  };
  useEffect(() => {
    viewDept();
    view_room();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const newData = filterData.filter((row) =>
      row.dept_name.toLowerCase().includes(value)
    );
    setItem(newData);
   
  };

  //  post dept

  // view room
  const view_room = () => {
    axios.get("http://localhost:5003/api/hospital/get_room")
    .then((res) => {
      setRoom(res.data.rows);
    });
  };

  //  post department
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5003/api/hospital/post_department", data)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        viewDept();
        handleClose();
        toast.success("Added department Notification !", {
          position: "top-center"
        });

      }).catch((err)=>{
        console.log(err)
      })
   
  };

  // delete api

  const handledelete = (dept_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      handleChange(dept_id);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          
        });
      }
    });
  };

  const handleChange = (dept_id) => {
    console.log(dept_id);
    axios
      .delete(`http://localhost:5003/api/hospital/delete_department/${dept_id}`)
      .then((res) => {
        
        setData(res.data.rows)
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Dept Id",
      selector: (row) => row.dept_id,
    },
    {
      name: "Dept Name",
      selector: (row) => row.dept_name,
    },
    {
      name: "Room ID",
      selector: (row) => row.room_id,
    },
    {
      name: "Established Date",
      selector: (row) => moment(row.dept_esta_date).format("DD-MM-YYYY"),
    },
    {
      name: "Action",
      cell: (row) => (
        <div >
        <Button className="btn btn-info"  onClick={() => handleShow1(row.dept_id)}
         style={{
          backgroundColor: "transparent",
          border: "1px solid #50DEC2",
          marginLeft: "5px",
        }}>
          <ModeEditOutlineIcon fontSize="small" />
        </Button>
         <Button
         className="btn btn-info"
         onClick={() => handledelete(row.dept_id)}
         style={{
           backgroundColor: "transparent",
           border: "1px solid #50DEC2",
           marginLeft: "5px",
         }}
       >
         <DeleteOutlineIcon fontSize="small" />
       </Button>
       </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "2px",
        // height: "2.3vw",
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
              <h3>Department List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Button color="#50DEC2" onClick={handleShow} style={{background:'transparent',color:'black', border:"2px solid #50DEC2" }}>
                Add dept
              </Button>
              <div className="d-flex ">
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
      {/* post */}

      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh", }}
      >
        <Modal.Header closeButton  >
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Dept Id</Form.Label>
            <Form.Control
              type="text"
              name="dept_id"
              placeholder="Enter Dept Id"
              autoComplete="off"
              value={data.dept_id}
              onChange={(e) => setData({ ...data, dept_id: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dept Name</Form.Label>
            <Form.Control
              type="text"
              name="dept_name"
              placeholder="Enter Dept Name"
              autoComplete="off"
              value={data.dept_name}
              onChange={(e) => setData({ ...data, dept_name: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setData({ ...data, room_id: e.target.value })}
            >
              {room.map((d) => (
                <option value={d.room_id}>{d.room_name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label> Established Date</Form.Label>
            <Form.Control
              type="date"
              name="dept_est_date"
              placeholder="Enter Date"
              autoComplete="off"
              value={data.dept_esta_date}
              onChange={(e) =>
                setData({ ...data, dept_esta_date: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add dept
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update  */}

      <Modal
        show={showupdate}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>update Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form.Group>
            <Form.Label>Dept Name</Form.Label>
            <Form.Control
              type="text"
              name="dept_name"
              placeholder="Enter Dept Name"
              autoComplete="off"
              value={updatedept.dept_name}
              onChange={(e) =>
                setUpdatedept({ ...updatedept, dept_name: e.target.value })
              }            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setUpdatedept({ ...updatedept, room_id: e.target.value })
              }            >
              {room.map((d) => (
                <option value={d.room_id}>{d.room_name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label> Established Date</Form.Label>
            <Form.Control
              type="date"
              name="dept_est_date"
              placeholder="Enter Date"
              autoComplete="off"
              onChange={(e) =>
                setUpdatedept({ ...updatedept, dept_esta_date: e.target.value })
              }            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}

export default Dept;
