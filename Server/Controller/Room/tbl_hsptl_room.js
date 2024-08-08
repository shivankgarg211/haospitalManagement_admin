const connection = require("../../Modal/dbConnection");
// const room = require("../../Route/Room_Route/tbl_room_route");

const view_room = async (req, res) => {
  try {
    let sqlQuery = "Select * FROM tbl_hsptl_room";

    await connection.query(sqlQuery, function (error, result) {
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

const post_room = (req, res) => {
        try {
          const data = {
            room_id: req.body.room_id,
            room_name: req.body.room_name,
          };
          const sqlQuery = "INSERT INTO tbl_hsptl_room (room_id, room_name) VALUES ($1, $2) RETURNING *";
      
          connection.query(sqlQuery, [data.room_id, data.room_name], (error, result) => {
            if (error) {
              console.log("Error", error.message);
              res.status(500).json({ error: error.message });
            } else {
              res.json({ message: 'Room successfully added', data: result.rows[0] });
            }
          });
        } catch (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        }
      };
      

const update_room = (req, res) => {
        try {
          console.log(req.body)
          const room_id = req.params.room_id;
          const room_name = req.body.room_name;
          console.log(req.body)
          const query = 'UPDATE tbl_hsptl_room SET room_name = $1 WHERE room_id = $2 ';  // Added RETURNING * to get the updated row
      
          connection.query(query, [room_name, room_id], (error, result) => {
            if (error) {
              console.log("Error", error.message);
              res.status(500).json({ error: error.message });
            } else {
              res.json(result.rows[0]);  // Return the updated row
            }
          });
        } catch (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        }
      };

   const delete_room = (req,res)=>{
        try{
           const room_id = req.params.room_id;
           const sqlQuery = `DELETE FROM tbl_hsptl_room WHERE room_id=$1`
           connection.query(sqlQuery,[room_id],(error,result)=>{
                if (error) {
                        console.log("Error", error.sqlMessage);
                        res.status(500).json({ error: error.sqlMessage });
                      } else {
                        res.json({ message: 'Room successfully deleted', data: result.rows[0] });  
                      }
                    });
                  } catch (error) {
                    console.log("Error", error.sqlMessage);
                    res.status(500).json({ error: error.sqlMessage });
                  }
   }   
      

module.exports = { view_room, post_room,update_room,delete_room };
