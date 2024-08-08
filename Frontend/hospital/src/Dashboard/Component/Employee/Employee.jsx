import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Editemployee from "./Editemployee";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';


function Employee() {
  const [empRole, setEmpRole] = useState([]);
  const [viewRole, setViewRole] = useState([]);
  const [filterData, setFilteredData] = useState([]); //search
  const [item, setItem] = useState([]);
  const [viewdept, setViewdept] = useState([]);
  const [data, setData] = useState({
    emp_id: "",
    emp_name: "",
    dept_id: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewEmployee = () => {
    axios
      .get("http://localhost:5003/api/hospital/view_employee")
      .then((res) => {
        setItem(res.data.rows);
        setFilteredData(res.data.rows);
      }).catch((err)=>{
        console.log(err)
      })
  };

  //   post employee

  // view dept

  const viewDepartment = () => {
    axios
      .get("http://localhost:5003/api/hospital/get_department")
      .then((res) => {
        setViewdept(res.data.rows);
      });
  };

  const handlepostEmp = () => {
    axios
      .post("http://localhost:5003/api/hospital/post_employee", data)
      .then((res) => {
        setData(res.data.rows);
        viewEmployee();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    viewEmployee();
    viewDepartment();
    getempRoleAssign();
  }, []);

  const columns = [
    {
      name: "Emp Id",
      selector: (row) => row.emp_id,
    },
    {
      name: "Emp Name",
      selector: (row) => row.emp_name,
    },
    {
      name: "Dept Id",
      selector: (row) => row.dept_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
   
    
    {
      name: "Role",
      
      cell: (row) => {
        // Initialize an array to store role names for the current row
        const roleNames = [];

        // Iterate through the roleAssign array to find matching roles for the current row
        empRole.forEach((item) => {
          if (row.emp_id === item.emp_id) {
            // Push the role name to the roleNames array
            roleNames.push(item.role_name);
          }
        });

        // Render the role names separately
        return (
          <>
            {roleNames.map((role, index) => (
              <span key={index}>
                {role}
                {/* Add comma and space if it's not the last role */}
                {index !== roleNames.length - 1 && ",  "}
              </span>
            ))}
          </>
        );
      },
    },
    {
      name: "RoleAssign",
      selector: (row) => (
        
        <Form.Control as="select"
        value={row.emp_id}
        onChange={(e) => handleRoleChange(row.emp_id,e.target.value)}

        >
          <option value="">Select Role</option>
          {viewRole.map((role) => (
            <option value={role.role_id}>{role.role_name}</option>
          ))}
        </Form.Control>
      ),
    },
    {
      name: "View Profile",
      cell: (row) => (
        <Link to={`/viewEmp_profile/${row.emp_id}`}
        className="btn btn-info"
        style={{
          backgroundColor: "#50DEC2",
          border: "1px solid #50DEC2",
          marginLeft: "5px",
        }}
      >
        < VisibilityIcon fontSize="small"/>
      </Link>
    
      
      )
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Editemployee props={row} />
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "1px",
        // height: "3.1vw",
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
    const newData = filterData.filter((row) =>
      row.emp_name.toLowerCase().includes(value),
      
    );
    setItem(newData);
   
  };

  // ============== Role Assign =======================

  // ===========view Role

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/hospital/view_role")
      .then((res) => {
        setViewRole(res.data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // get role Assign

  const getempRoleAssign = () => {
    axios
      .get("http://localhost:5003/api/hospital/emp_roleAssign/getEmpRoleAssign")
      .then((res) => {
        
        setEmpRole(res.data.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // post role 

  const handleRoleChange =(emp_id,role_id)=>{
    console.log(emp_id,role_id);
    const updaterole ={emp_id:emp_id,
      role_id:role_id
    }

    axios.post("http://localhost:5003/api/hospital/post_Roleassign",updaterole)
    .then((res)=>{
          console.log(res.data)
          getempRoleAssign()
    }).catch((err)=>{
      console.log(err)
    })
  }

   
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Employee List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Button color="#50DEC2" onClick={handleShow}style={{background:'transparent',color:'black', border:"2px solid #50DEC2" }}>
                Add Emp
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ marginTop: "8vh" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Employee Id</Form.Label>
            <Form.Control
              type="text"
              name="dept_id"
              placeholder="Enter Emp Id"
              autoComplete="off"
              onChange={(e) => setData({ ...data, emp_id: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Employee Name</Form.Label>
            <Form.Control
              type="text"
              name="emp_name"
              placeholder="Enter Emp Name"
              autoComplete="off"
              onChange={(e) => setData({ ...data, emp_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dept Id</Form.Label>
            <Form.Control
              as="select" // Use <Form.Control> as a select input
              onChange={(e) => setData({ ...data,dept_id: e.target.value })}
            >
              <option >Select Dept</option>
              {viewdept.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>
                  {d.dept_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Employee Email</Form.Label>
            <Form.Control
              type="Email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="off"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlepostEmp}>
            Add emp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Employee;
