const connection = require("../../Modal/dbConnection");

const viewPrescription = (req, res) => {
  const sqlQuery = "SELECT * FROM prescription";
  
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing query:", error.sqlMessage || error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No prescriptions found" });
    }
    return res.status(200).json(results);
  });
};


module.exports = { viewPrescription };