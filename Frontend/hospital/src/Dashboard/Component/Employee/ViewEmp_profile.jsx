import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function ViewEmp_profile() {
 
 const {emp_id} = useParams()
 console.log(emp_id)

 const [result,setResult]= useState([]);


 const getprofile=()=>{
    axios.get(`http://localhost:5003/hospital/${emp_id}`)
    .then((res)=>{
        console.log(res.data[0])
        setResult(res.data[0])
        
    })
    .catch((err)=>{
        console.log(err)
    })

 }
 


 useEffect(()=>{
  getprofile()
 
 },[])
 
  
  
  
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center"
                    >
                      <img
                        src={`http://localhost:5003/Image/${result.image}`}
                        alt={result.image}
                        className="rounded-circle img-fluid"
                        style={{ width: "100px" }}
                      />
                      <h5 className="my-2">{result.emp_name}</h5>
                      <p className="text-muted mb-1">{result.pro_name}</p>
                     
                      <p className="text-muted mb-4" style={{marginRight:'8px'}} >
                        Mobile:
                        {result.mobile
                        }
                      </p>
                      {/* <p className="text-muted mb-4">
                       City:
                        {result.address
                        }
                      </p> */}
                      
                      <div className="d-flex justify-content-center mb-2">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary"
                        >
                          Follow
                        </button>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-primary ms-1"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{result.emp_name}</p>
                        </div>
                      </div>
                    <hr/>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{result.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Employee Id</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{result.emp_id}</p>
                        </div>
                      </div>
                      {/* <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{result.mobile}</p>
                        </div>
                      </div> */}
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Aadhar</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                          {result.adhar_no}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Gender</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                          {result.gender}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Date of joining</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                         {moment(result.doj).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Date of Birth</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                          {moment(result.dob).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewEmp_profile;
