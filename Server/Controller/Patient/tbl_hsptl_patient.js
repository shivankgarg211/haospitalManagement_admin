const connection = require("../../Modal/dbConnection");

const view_patient = (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM tbl_hsptl_patient";
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

const post_patient = (req, res) => {
  try {
    const data = {
      p_id: req.body.p_id,
      p_name: req.body.p_name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
      city: req.body.city,
      symptoms: req.body.symptoms,
    };
    const sqlQuery =
      "INSERT INTO tbl_hsptl_patient (p_id,p_name,age,gender,mobile,city,symptoms) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *";

    connection.query(
      sqlQuery,
      [
        data.p_id,
        data.p_name,
        data.age,
        data.gender,
        data.mobile,
        data.city,
        data.symptoms,
      ],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "patient successfully added",
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

const update_patient = (req, res) => {
  try {
    const p_id = req.params.p_id;
    const data = {
      p_name: req.body.p_name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile,
      city: req.body.city,
      symptoms: req.body.symptoms,
    };
    const sqlQuery =
      "UPDATE  tbl_hsptl_patient SET p_name = $1, age=$2, gender = $3, mobile=$4,city=$5,symptoms=$6 WHERE p_id = $7 RETURNING *";
    connection.query(
      sqlQuery,
      [
        data.p_name,
        data.age,
        data.gender,
        data.mobile,
        data.city,
        data.symptoms,
        p_id,
      ],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "patient successfully updated",
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

const delete_patient = (req, res) => {
  try {
    const p_id = req.params.p_id;
    const sqlQuery = `DELETE FROM tbl_hsptl_patient where p_id =$1`;
    connection.query(sqlQuery, [p_id], (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Patient successfully deleted",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { view_patient, post_patient, update_patient, delete_patient };
