var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;


var schema = new Schema({    
    name: String,
    age: Number
});

var Alumno = mongoose.model('Alumno', schema);

module.exports = function(config) {
    return new Alumno(config);
} 
