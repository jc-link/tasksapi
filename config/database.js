const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

mysqlConnection.connect((err) => {
    if(err) {
        console.log(err)
        return
    } else {
        console.log('Database MySql is connected..')
    }
})

module.exports = mysqlConnection