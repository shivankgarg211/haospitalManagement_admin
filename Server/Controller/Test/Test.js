const connection = require("../../Modal/dbConnection");

const addTest = (req, res) => {
  try {
    const { test_id, test_name, test_price, lab_no } = req.body;
    const psqlQuery = `
      INSERT INTO test_rate (test_id, test_name, test_price, lab_no) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    
    connection.query(psqlQuery, [test_id, test_name, test_price, lab_no], (error, result) => {
      if (error) {
        console.error("Error executing query", error.message);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.status(201).json({ message: "Test added successfully", test: result.rows[0] });
    });
  } catch (error) {
    console.error("Server error", error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const viewTest = (req, res) => {
  try {
    const psqlQuery = "SELECT * FROM test_rate";
    connection.query(psqlQuery, (error, result) => {
      if (error) {
        console.error("Error executing query", error.message);
        return res.status(500).json({ error: 'Database query error' });
      }
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No test records found' });
      }
      
      res.json(result.rows); // Return all test records
    });
  } catch (error) {
    console.error("Server error", error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const view_lab = (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM tbl_hsptl_lab";
    connection.query(sqlQuery, (error, result) => {
      if (error) {
        console.error("Error executing query", error.message);
        return res.status(500).json({ error: 'Database query failed' });
      }
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No lab records found' });
      }

      res.json(result.rows); // Return all lab records
    });
  } catch (error) {
    console.error("Server error", error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addTest, viewTest, view_lab };
