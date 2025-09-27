import { Input } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

function Treatment() {
  const [items, setItems] = useState([])

  const viewPrescription = () => {
    axios
      .get('http://localhost:5003/view_patientPrescription')
      .then((res) => {
        console.log(res.data.rows)
        setItems(res.data.rows)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    viewPrescription()
  }, [])

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
    },
    {
      name: 'Prescription Date',
      selector: (row) => moment(row.pre_date).format('DD-MM-YYYY'),
    },
    {
      name: 'Medicine',
      selector: (row) => row.medicine,
    },
    {
      name: 'Dose',
      selector: (row) => row.dose,
    },
    {
      name: 'Frequency',
      selector: (row) => row.frequency,
    },
    {
      name: 'Employee Id',
      selector: (row) => row.emp_id,
    },
  ]

  const customStyles = {
    rows: {
      style: {
        color: 'black',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: 'black',
        backgroundColor: '#50DEC2',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="d-flex justify-content-center mb-3">
            <h3>Prescription List</h3>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex flex-grow-1 justify-content-end">
              <Input
                type="text"
                placeholder="Search by Name"
                className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>
        </Col>
        <Col xs={12}>
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
        </Col>
      </Row>
    </Container>
  )
}

export default Treatment
