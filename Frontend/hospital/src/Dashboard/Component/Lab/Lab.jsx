import { Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";


function Lab() {
  const [item, setItem] = useState([]);
  const [viewRoom, setViewRoom] = useState([]);
  const [viewDept, setViewdept] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
 const [data,setData]=useState({
    lab_no:"",
    lab_name:"",
    room_id:"",
    dept_id:""
 })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

 const [showupdate, setShowupdate] = useState(false);
 const handleClose1 = () => setShowupdate(false);


//  update

const [selectedlabNo, setSelectedLabNo] = useState(null); //dept_id state
const [updatelab, setUpdatelab] = useState({
  lab_name: "",
  room_id: "",                         // update data state
  dept_id: "",
});

const handleShow1 = (lab_no) => {
  const lab = item.find((d) => d.lab_no === lab_no);
  setUpdatelab({
    lab_name: lab.lab_name,
    room_id: lab.room_id,
    dept_id: lab.dept_id
  });
  setSelectedLabNo(lab_no);
  setShowupdate(true);
};


const handleUpdate = () => {
  axios
    .put(`http://localhost:5003/api/hospital/update_lab/${selectedlabNo}`, {
      lab_name: updatelab.lab_name,
      room_id: updatelab.room_id,
      dept_id: updatelab.dept_id,
    })
    .then((res) => {
      console.log(res);
      
      handleClose1()
      viewLab()
    });
  
};

  const viewLab = () => {
    axios
      .get("http://localhost:5003/api/hospital/lab")
      .then((res) => {
        console.log(res.data.rows);
        setItem(res.data.rows);
        setFilteredData(res.data.rows)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  get room

  const getRoom = () => {
    axios
      .get("http://localhost:5003/api/hospital/view_room")
      .then((res) => {
        console.log(res.data.rows);
        setViewRoom(res.data.rows);
      })
      .catch((error) => {
        console.error("There was an error fetching the room data!", error);
      });
  };
  // viewdept
  const viewdept = () => {
    axios
      .get("http://localhost:5003/api/hospital/get_department")
      .then((res) => {
        console.log(res.data.rows);
        setViewdept(res.data.rows);
      });
  };

  useEffect(() => {
    viewLab();
    getRoom();
    viewdept();
  }, []);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5003/api/hospital/post_lab", data)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        handleClose();
        viewLab()
       
        // toast.success("Added department Notification !", {
        //   position: "top-center"
        // });
      }).catch((err)=>{
        console.log(err)
      })
   
  };

  // delete

  const handledelete = (lab_no) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      handleChange(lab_no);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChange = (lab_no) => {
    console.log(lab_no);
    axios
      .delete(`http://localhost:5003/api/hospital/delete_role/${lab_no}`)
      .then((res) => {
        console.log(res);
        viewLab()
      })
      .catch((err) => console.log(err));
  };


  const columns = [
    {
      name: "Lab No",
      selector: (row) => row.lab_no,
    },
    {
      name: "Lab Name",
      selector: (row) => row.lab_name,
    },
    {
      name: "Room Id",
      selector: (row) => row.room_id,
    },
    {
      name: "Dept Id",
      selector: (row) => row.dept_id,
    },
    {
      name: "Action",
      cell: (row) => ( 
        <div >
        <Button className="btn btn-info" 
        onClick={() => handleShow1(row.lab_no)}
         style={{
          backgroundColor: "transparent",
          border: "1px solid #50DEC2",
          marginLeft: "5px",
        }}>
          <ModeEditOutlineIcon fontSize="small" />
        </Button>
         <Button
         className="btn btn-info"
        onClick={()=>handledelete(row.lab_no)}
         style={{
           backgroundColor: "transparent",
           border: "1px solid #50DEC2",
           marginLeft: "5px",
         }}
       >
         <DeleteOutlineIcon fontSize="small" />
       </Button>
       </div>
      )
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "2px",
        // height: "2.5vw",
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
      row.lab_name.toLowerCase().includes(value)
    );
    setItem(newData);
  };

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <div className="d-flex justify-content-center">
                <h3>Lab List</h3>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <Button
                  color="#50DEC2"
                  onClick={handleShow}
                  style={{
                    background: "transparent",
                    color: "black",
                    border: "2px solid #50DEC2",
                  }}
                >
                  Add Lab
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
      </div>

      {/* // { post} */}

      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Lab Id</Form.Label>
            <Form.Control
              type="text"
              name="Lab_id"
              placeholder="Enter lab Id"
              autoComplete="off"
              onChange={(e) => setData({ ...data, lab_no: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lab Name</Form.Label>
            <Form.Control
              type="text"
              name="lab_name"
              placeholder="Enter Lab Name"
              autoComplete="off"
              onChange={(e) => setData({ ...data, lab_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dept Id</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Department"
              onChange={(e) => setData({ ...data, dept_id: e.target.value })}
            >
              <option value="">Select Dept</option>
              {viewDept.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>
                  {d.dept_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Department"
              onChange={(e) => setData({ ...data, room_id: e.target.value })}
            >
              <option value="">Select Room</option>
              {viewRoom.map((d) => (
                <option key={d.room_id} value={d.room_id}>
                  {d.room_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Lab
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showupdate}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>update lab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Lab Name</Form.Label>
            <Form.Control
              type="text"
              name="lab_name"
              placeholder="Enter Lab Name"
              autoComplete="off"
              value={updatelab.lab_name}
              onChange={(e) =>
                setUpdatelab({ ...updatelab, lab_name: e.target.value })
              } 
             
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dept Id</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Department"
            
              onChange={(e) =>
                setUpdatelab({ ...updatelab, dept_id: e.target.value })
              } 
            >
              <option value="">Select Dept</option>
              {viewDept.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>
                  {d.dept_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Room Id</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Department"
             
              onChange={(e) =>
                setUpdatelab({ ...updatelab, room_id: e.target.value })
              } 
            >
              <option value="">Select Room</option>
              {viewRoom.map((d) => (
                <option key={d.room_id} value={d.room_id}>
                  {d.room_name}
                </option>
              ))}
            </Form.Control>
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
    </>
  );
}

export default Lab;
