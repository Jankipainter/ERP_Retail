var mysql      = require('mysql'); // Import mysql package

// Connection to mysql of fts_erp system
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fts_erp_testing'
});
connection.connect(function(err){
if(!err) {
    console.log("erp Database is connected");
} else {
    console.log("Error while connecting with database");
}
});

// Connection to mysql of fts_user system
var connection1 = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fts_user_db'
});
connection1.connect(function(err){
if(!err) {
    console.log("user Database is connected");
} else {
    console.log("Error while connecting with database");
}
});

// Export module to use it whenever database required(mostly used in data_access for any route file)
module.exports ={ connection , connection1};