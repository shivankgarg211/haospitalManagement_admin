const { Connection } = require("pg");
const connection = require("../../Modal/dbConnection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const view_employee = (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM employee";
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
  try {
    const emp_id = req.params.emp_id;
    let sqlQuery = `SELECT * FROM emp_profile WHERE emp_id = ?`;
    connection.query(sqlQuery, [emp_id], function (error, result) {
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

const post_employee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const data = {
      emp_id: req.body.emp_id,
      emp_name: req.body.emp_name,
      dept_id: req.body.dept_id,
      email: req.body.email,
      password: hashedPassword,
    };
    const sqlQuery =
      "INSERT INTO employee (emp_id,emp_name,dept_id,email,password) VALUES ($1, $2,$3,$4,$5) RETURNING *";
    connection.query(
      sqlQuery,
      [data.emp_id, data.emp_name, data.dept_id, data.email, data.password],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Employee successfully added",
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

const update_employee = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const emp_id = req.params.emp_id;
    const data = {
      emp_name: req.body.emp_name,
      dept_id: req.body.dept_id,
      email: req.body.email,
      password: hashedPassword
    };
    const sqlQuery =
      "UPDATE employee SET emp_name = $1, dept_id = $2, email = $3, password = $4 WHERE emp_id = $5";
    connection.query(
      sqlQuery,
      [data.emp_name, data.dept_id, data.email, data.password, emp_id],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Employee successfully updated",
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

const delete_employee = (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const sqlQuery = `DELETE FROM employee where emp_id =$1`;
    connection.query(sqlQuery, [emp_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Employee successfully deleted",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const emp_count = (req, res) => {
  try {
    let sqlQuery = `SELECT count(emp_id) as emp_count FROM employee`;
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


// compare password

const employeeLogin = (req, res) => {
  try {
    const psqlQuery = `SELECT e.emp_id, e.emp_name, e.dept_id, e.email, e.password, 
    ARRAY_AGG(r.role_name) AS roles FROM employee e JOIN tbl_hsptl_role_assign ra ON e.emp_id = ra.emp_id JOIN
     tbl_hsptl_role r ON ra.role_id = r.role_id WHERE e.email = $1  GROUP BY e.emp_id, e.emp_name, e.dept_id, e.email, e.password`;
    // console.log("Executing query:", psqlQuery);
    connection.query(psqlQuery, [req.body.email], (error, result) => {
      if (error) {
        // console.error("Query Error:", error);
        return res.json({ loginStatus: false, Error: "Query Error" });
      }

      if (result.rows.length > 0) {
        const user = result.rows[0];
        // console.log("User found:", user);

        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
          if (error) {
            // console.error("Password Compare Error:", error);
            return res.json({ loginStatus: false, Error: "Password Compare Error" });
          } else if (isMatch) {
            const email = user.email;
            const role = user.roles;
            const token = jwt.sign({ roles: role, email: email }, 'jwt_secret_key', { expiresIn: '1d' });
            res.cookie('shivank', token);
            console.log("Login successful, token generated:", token);
            return res.json({ loginStatus: true });
          } else {
            console.log("Invalid password for email:", req.body.email);
            return res.json({ loginStatus: false, Error: "Invalid password" });
          }
        });
      } else {
        console.log("Email not found:", req.body.email);
        return res.json({ loginStatus: false, emp_id: result[0].emp_id, Error: "Email does not exist" });
      }
    });
  } catch (err) {
    console.error("Login error", err);
    return res.json({ loginStatus: false, Error: "Login error in server" });
  }
}


const verifyToken = (req, res, next) => {
  const token = req.cookies.shivank;
  console.log(token)
  if (!token) {
    return res.json({ Error: "You are not authanticated" });
  } else {
    try {
      jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if (err) {
          return res.json({ Error: "token is not okey" });
        } else {
          req.emp_id = decoded.emp_id;
          req.emp_name = decoded.emp_name;
          req.email = decoded.email;
          req.roles = decoded.roles;
          req.dept_id = decoded.dept_id
          next();
        }
      })
    }
    catch (err) {
      console.error("You are not authanticated", err);
      return res.json({ loginStatus: false, Error: "You are not authanticated" });
    }
  }
}

const verifyUser = (req, res) => {
  return res.json({ Status: 'Success', emp_id: req.emp_id, email: req.email, emp_name: req.emp_name, roles: req.roles, dept_id: req.dept_id })
}


module.exports = { view_employee, post_employee, update_employee, delete_employee, emp_count, viewEmpprofile, employeeLogin, verifyToken, verifyUser };
