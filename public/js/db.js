var mysql = require('mysql2');

var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Marcelo83',
    database : 'teste1'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Database conectada');
})


module.exports = {db}