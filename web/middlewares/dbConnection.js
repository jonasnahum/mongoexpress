var mongoose = require('mongoose'); 

var DbConnection = function() {
    
}

DbConnection.prototype.connect = function(connStr) {        
    mongoose.connect(connStr);        
    var db = mongoose.connection;

    db.on('error', function(err){
        throw err;
    });
    
    db.once('open', function (callback) {
        console.log('Open ' + connStr);
    });
}

module.exports = function(connStr) {
    return new DbConnection();
};