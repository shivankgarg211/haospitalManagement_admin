import React from 'react'
import './start.css'


import 'bootstrap/dist/css/bootstrap.min.css';


const Start = () => {
  

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded border loginForm'>
        <h2 className='text-center'>Login As</h2>
        <div className='d-flex justify-content-between mt-5 mb-2'>
          <button
            type='button'
            className='btn btn-primary flex-fill me-2'
          >
            Employee
          </button>
          <button
            type='button'
            className='btn btn-success flex-fill ms-2'
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start
