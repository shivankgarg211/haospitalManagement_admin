const connection = require("../../Modal/dbConnection");

const get_roleAssign = (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM tbl_hsptl_role_assign";
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

const post_roleAssign = (req, res) => {
  try {
    const data = {
      role_id: req.body.role_id,
      emp_id: req.body.emp_id,
    };
    const sqlQuery =
      "INSERT INTO tbl_hsptl_role_assign (role_id,emp_id) VALUES ($1, $2) RETURNING *";

    connection.query(sqlQuery, [data.role_id, data.emp_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Role Assign successfully added",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const update_roleAssign = (req, res) => {
  try {
    const role_id = req.params.role_id;
    const data = {
      emp_id: req.body.emp_id,
    };
    const sqlQuery =
      "UPDATE tbl_hsptl_role_assign SET emp_id = $1 WHERE role_id = $2";
    connection.query(sqlQuery, [data.emp_id, role_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Assign role successfully updated",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const get_emp_roleAssign = (req, res) => {
  try {
    let sqlQuery = "SELECT employee.emp_id, tbl_hsptl_role_assign.role_id, tbl_hsptl_role.role_name FROM employee INNER JOIN tbl_hsptl_role_assign ON employee.emp_id = tbl_hsptl_role_assign.emp_id INNER JOIN tbl_hsptl_role ON tbl_hsptl_role_assign.role_id = tbl_hsptl_role.role_id";
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


module.exports = { get_roleAssign, post_roleAssign, update_roleAssign, get_emp_roleAssign };
