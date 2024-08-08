const connection = require("../../Modal/dbConnection");

const view_profile = (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM emp_profile";
    connection.query(sqlQuery, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        return res.status(500).json({ error: error.sqlMessage });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: error.message });
  }
};


const viewEmpprofile = (req, res) => {
  const emp_id = req.params.emp_id;
    let sqlQuery ="SELECT * FROM employee e JOIN emp_profile p ON e.emp_id = p.emp_id WHERE e.emp_id = $1";
    connection.query(sqlQuery,[emp_id] ,function(error, result)  {
      if (error) {
        console.log("Error", error);
       
      } else {
        return res.json(result.rows);
      }
    });
  
};
// const viewEmpprofile = (req, res) => {
  
//     const emp_id = req.params.emp_id;
//     console.log(emp_id)
//     let sqlQuery =" SELECT  * FROM  employee e  JOIN  emp_profile p ON e.emp_id = p.emp_id WHERE e.emp_id = e.emp_id";
//     connection.query(sqlQuery,[emp_id], function(error, result)  {
//       if (error) {
//         console.log("Error", error);
       
//       } else {
//         return res.json(result.rows);
//       }
//     });
  
// };




const post_profile = (req, res) => {
  try {
    
    let imageData = { image: null }; // Default image data
    // Check if req.file exists before accessing its properties
    console.log(req.body)
    if (req.file && req.file.filename) {
      imageData.image = req.file.filename;
    }
    const data = {
      pro_id: req.body.pro_id,
      pro_name: req.body.pro_name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
      address: req.body.address,
      salary: req.body.salary,
      doj: req.body.doj,
      dob: req.body.dob,
      adhar_no: req.body.adhar_no,
       emp_id: req.body.emp_id,
     ...imageData
    };
    const sqlQuery = `INSERT INTO emp_profile (pro_id,pro_name,age, gender, mobile,address, salary, doj,dob,adhar_no,emp_id,image) 
            VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;

    connection.query(
      sqlQuery,
      [
        data.pro_id,
        data.pro_name,
        data.age,
        data.gender,
        data.mobile,
        data.address,
        data.salary,
        data.doj,
        data.dob,
        data.adhar_no,
        data.emp_id,
        data.image,
      ],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Employee profile successfully added",
            data: result.rows[0],
          });
        }
      }
    );
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const update_profile = (req, res) => {
  console.log(req.body)
  try {
    const pro_id = req.params.pro_id;
    const data = {
      pro_name: req.body.pro_name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
      address: req.body.address,
      salary: req.body.salary,
      doj: req.body.doj,
      dob: req.body.dob,
      adhar_no: req.body.adhar_no,
      // emp_id: req.body.emp_id,
      // image: req.body.image,
    };
    const sqlQuery =
    `UPDATE emp_profile
    SET pro_name = $1, age = $2, gender = $3, mobile = $4, address = $5, salary = $6, doj = $7, dob = $8, adhar_no = $9
    WHERE pro_id = $10
    RETURNING *`;

    connection.query(sqlQuery, [
      
      data.pro_name,
      data.age,
      data.gender,
      data.mobile,
      data.address,
      data.salary,
      data.doj,
      data.dob,
      data.adhar_no,
      pro_id
        // data.emp_id,
        // data.image,
    ], (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Employee_profile successfully updated",
          data: result.rows,
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const delete_emp_profile = (req, res) => {
  try {
    const pro_id = req.params.pro_id;
    const sqlQuery = `DELETE FROM emp_profile where pro_id =$1`;
    connection.query(sqlQuery, [pro_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Employee_profile successfully deleted",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { view_profile, post_profile,update_profile,delete_emp_profile, viewEmpprofile };
