const connection = require("../../Modal/dbConnection");

const view_treatment = (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM tbl_hsptl_treatment";
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

const post_treatment = (req, res) => {
  try {
    const data = {
      p_id: req.body.p_id,
      emp_id: req.body.emp_id,
    };
    const sqlQuery =
      "INSERT INTO tbl_hsptl_treatment (p_id,emp_id) VALUES ($1, $2) RETURNING *";

    connection.query(sqlQuery, [data.p_id, data.emp_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Treatment successfully added",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const update_treatment = (req, res) => {
  try {
    const p_id = req.params.p_id;
    const data = {
      emp_id: req.body.emp_id,
    };
    const sqlQuery = "UPDATE tbl_hsptl_treatment SET emp_id =$1 WHERE p_id =$2";
    connection.query(sqlQuery, [data.emp_id, p_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "treatment successfully updated",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

const viewDoctor = (req, res) => {
  try {
    let sqlQuery = `SELECT e.emp_id, e.emp_name, e.dept_id, e.email
FROM employee e
JOIN tbl_hsptl_role_assign ra ON e.emp_id = ra.emp_id
JOIN tbl_hsptl_role r ON ra.role_id = r.role_id
WHERE r.role_name = 'Doctor'`;

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



module.exports = { view_treatment, post_treatment, update_treatment,viewDoctor };
