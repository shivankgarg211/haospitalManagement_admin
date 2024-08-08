const connection = require("../../Modal/dbConnection");


const view_role = (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM tbl_hsptl_role`;
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json(result);
        console.log(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
};

const post_role = (req, res) => {
  try {
    const { role_id, role_name } = req.body;
    const sqlQuery = `INSERT INTO tbl_hsptl_role (role_id,role_name) VALUES($1,$2)`;
    connection.query(sqlQuery, [role_id, role_name], (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json({
          message: "Role successfully added",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
};


const update_role = (req, res) => {
  try {
    const role_id = req.params.role_id;
    const role_name = req.body.role_name;
    const sqlQuery = `UPDATE tbl_hsptl_role SET role_name = $1 WHERE role_id = $2 RETURNING * `;
    connection.query(sqlQuery, [role_name,role_id], (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json({
          message: "Role successfully updated",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
}


  const delete_role = (req, res) => {
    try {
      const role_id = req.params.role_id;
      const sqlQuery = `DELETE FROM tbl_hsptl_role where role_id =$1 `;
      connection.query(sqlQuery, [role_id], (error, result) => {
        if (error) {
          console.log("Error", error.sqlMessage);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Role Deleted successfuly ",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.sqlMessage);
      res.status(500).json({ error: error.sqlMessage });
    }
  };


module.exports = { view_role, post_role, update_role, delete_role };
