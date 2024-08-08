const pg = require('pg')     
let connection = new pg.Client({
        user:"postgres",
        host:"localhost",
        database:"hospital_management",
        port:process.env.PSQL_PORT,
        password:process.env.PASSWORD
})

connection.connect(function(error,result){
        if(error){
                console.log("Error",error.sqlMessage)
        }
        else{
                console.log("connected to database")
        }
})

module.exports = connection
