const connection = require("../../Modal/dbConnection");

const get_room = (req, res) => {
  try {
    let sqlQuery = "Select * FROM tbl_hsptl_room";

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const get_department = (req, res) => {
  try {
    let sqlQuery = "Select * FROM tbl_hsptl_department";

    connection.query(sqlQuery, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const post_department = (req, res) => {
  try {
    const { dept_id, dept_name, room_id, dept_esta_date } = req.body;
    const sqlQuery = `INSERT INTO tbl_hsptl_department (dept_id, dept_name, room_id,dept_esta_date) VALUES ($1, $2,$3,$4) `;
    connection.query(
      sqlQuery,
      [dept_id, dept_name, room_id, dept_esta_date],
      (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Department successfully added",
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

const update_department = (req, res) => {
        try {
          const dept_id = req.params.dept_id;
          const data = {
            dept_name: req.body.dept_name,
            dept_esta_date: req.body.dept_esta_date,
            room_id: req.body.room_id,
          };
      
          const sqlQuery =
            "UPDATE tbl_hsptl_department SET dept_name = $1, dept_esta_date = $2, room_id = $3 WHERE dept_id = $4 RETURNING *";

          connection.query(sqlQuery, [data.dept_name, data.dept_esta_date, data.room_id, dept_id], (error, result) => {
            if (error) {
              console.log("Error", error.message);
              res.status(500).json({ error: error.message });
            } else {
              res.json({
                message: "Department successfully updated",
                data: result.rows[0],
              });
            }
          });
        } catch (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        }
      };

      const delete_department = (req,res)=>{
        try{
                const dept_id = req.params.dept_id;
                const sqlQuery = `DELETE FROM tbl_hsptl_department where dept_id =$1`;
                connection.query(sqlQuery,[dept_id],(error,result)=>{
                        if (error) {
                                console.log("Error", error.message);
                                res.status(500).json({ error: error.message });
                              } else {
                                res.json({
                                  message: "Department successfully deleted",
                                  data: result.rows[0],
                                });
                              }     
                })
        }catch(error){
                
                res.status(500).json({ error: error.message });
        }
      }
      

module.exports = { get_department, post_department, update_department, delete_department,get_room };
