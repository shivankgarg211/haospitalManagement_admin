const connection = require('../../Modal/dbConnection')

const view_lab = (req, res) => {
        try {
          let sqlQuery = "SELECT * FROM tbl_hsptl_lab";
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

      const post_lab = (req, res) => {
        try {
          const data = {
                lab_no: req.body.lab_no,
                lab_name: req.body.lab_name,
                room_id: req.body.room_id,
                dept_id: req.body.dept_id,
            
          };
          const sqlQuery =
            "INSERT INTO tbl_hsptl_lab (lab_no, lab_name,room_id,dept_id) VALUES ($1, $2,$3,$4) RETURNING *";
      
          connection.query(
            sqlQuery,
            [data.lab_no, data.lab_name, data.room_id, data.dept_id],
            (error, result) => {
              if (error) {
                console.log("Error", error.message);
                res.status(500).json({ error: error.message });
              } else {
                res.json({
                  message: "lab successfully added",
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

      const update_lab = (req, res) => {
        try {
          const lab_no = req.params.lab_no;
          const data = {
            lab_name: req.body.lab_name,
            room_id: req.body.room_id,
            dept_id: req.body.dept_id,
           
          };
          const sqlQuery =
            'UPDATE tbl_hsptl_lab SET  lab_name = $1, room_id=$2, dept_id = $3 WHERE lab_no = $4';
          connection.query(
            sqlQuery,
            [data.lab_name, data.room_id, data.dept_id, lab_no],
            (error, result) => {
              if (error) {
                console.log("Error", error.message);
                res.status(500).json({ error: error.message });
              } else {
                res.json({
                  message: "lab successfully updated",
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

      const lab_delete = (req, res) => {
        try {
          const lab_no = req.params.lab_no;
          const sqlQuery = `DELETE FROM  tbl_hsptl_lab where lab_no =$1`;
          connection.query(sqlQuery, [lab_no], (error, result) => {
            if (error) {
              console.log("Error", error.message);
              res.status(500).json({ error: error.message });
            } else {
              res.json({
                message: "Lab successfully deleted",
                data: result.rows[0],
              });
            }
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

module.exports = {view_lab,post_lab,update_lab,lab_delete}