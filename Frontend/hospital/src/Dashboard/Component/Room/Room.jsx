import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import {Button, Container,Form,Row} from  'react-bootstrap';
import { Input } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import './room.css'
import UpdateRoom from './UpdateRoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Room() {
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.post("http://localhost:5003/api/hospital/verifytoken")
      .then(res => {
        const roles = res.data.roles;
        if (roles.includes('Admin')) {
          alert("Hello Admin");
        } else {
          alert("Not authorized");
          navigate('/dashboard');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);
  
  const [data,setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputData, setInputData] = useState({         
  room_id:"",
  room_name:""
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


// get 
const getRoom =()=>{
  axios.get('http://localhost:5003/api/hospital/view_room')
  .then((res)=>{
  setData(res.data.rows)
  setFilteredData(res.data.rows);

})
.catch((error) => {
  console.error("There was an error fetching the room data!", error);
});
}
// post
const handleSubmit = (e) => {
  e.preventDefault();
  
  axios.post("http://localhost:5003/api/hospital/post_room", inputData)
    .then((res) => {
      setInputData(res.data);
      handleClose();
      getRoom();
      // toast.success("Success Notification !", {
      //   position: "top-center"
      // });
      alert("data successfuly added")
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
};


useEffect(()=>{
 getRoom()
},[])

const handleSearch = (event) => {
  const value = event.target.value.toLowerCase();
  const newData = filteredData.filter(row => 
    row.room_name.toLowerCase().includes(value)
  );
  setData(newData);
};

  const columns =[
    {
      name:'Room Id',
      selector:row=> row.room_id,
    },
    {
      name:'Room Name',
      selector:row =>row.room_name
    },
    {
      name:'Action',
      cell: row =>(
        <div className="d-flex justify-content-beetween">
       <UpdateRoom props={row}
             /> 
       {/* <Button className="btn btn-info" onClick={() => handledelete(room_id)}style={{backgroundColor:'transparent', border:'1px solid #50DEC2', marginLeft:'5px'}}>
       <DeleteOutlineIcon  fontSize="small" />
     </Button>  */}
     </div>
      )
    }
  ]
  const customStyles ={
    rows:{
      style :{
        minHeight:'2px',
        // height:"2.5vw",
        color:'black'
      },
    },
    headCells :{
      style:{
        fontWeight:'bold',
        fontSize:'15px',
        color:'black',
        backgroundColor:'#50DEC2'
      },
    },
   cells: {
       style:{
        fontSize:'15px'
       }
    }
  }

  return (
    <>
    <Container fluid>
      <Row>
    <div className="d-flex justify-content-center">
      <h3>Room List</h3>
    </div>
    <div className="d-flex justify-content-between mb-2" >
      <Button color="#50DEC2" onClick={handleShow}style={{background:'transparent',color:'black', border:"2px solid #50DEC2" }} >
        Add Room
      </Button>
      <div className="d-flex ">
        <Input
          type="text"
          placeholder="Search by Name"
          onChange={handleSearch}
          className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>
    </div>
    
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          paginationPerPage={10}
          fixedHeader
          highlightOnHover
          responsive
        />
      </Row>
    </Container>


  {/* post */}

  <Modal show={show} onHide={handleClose} style={{marginTop:'8vh'}} >
        <Modal.Header closeButton>
          <Modal.Title>Add room</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form.Group>
            <Form.Label>Room Id</Form.Label>  
            <Form.Control
              type="text"
              name="room_id"
              placeholder="Enter Room Id"
              autoComplete="off"
              value={inputData.room_id}
              onChange={(e)=>setInputData({...inputData,room_id: e.target.value})}
            />
          </Form.Group>
        <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              name="room_name"
              placeholder="Enter Room Name"
              autoComplete="off"
              value={inputData.room_name}
              onChange={(e)=>setInputData({...inputData,room_name: e.target.value})}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Room
          </Button>
        </Modal.Footer>
      </Modal>
 <ToastContainer/>

</>
  )
}

export default Room
