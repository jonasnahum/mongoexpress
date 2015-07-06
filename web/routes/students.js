var express = require('express');
var router = express.Router();
var alumnos = require('../models/alumno');
var dbname = 'mongodb://localhost/alumnos';
var mongoose = require('mongoose'); 
mongoose.connect(dbname);        
var db = mongoose.connection;

db.once('open', function (callback) {
    
});

router.get('/', function(req, res, next) {
    var Alumno = mongoose.model('Alumno');
    
    Alumno.find(function (err, alumnos) {
        if (err) return next(err);
        res.json(alumnos);
    }); 
});

router.post('/', function(req, res, next) {
    
    var alumno = alumnos({ 
        name: req.body.name, 
        age: parseInt(req.body.age, 10) 
    });    
    
    alumno.save(function (err, data) {
        if (err) return next(err);
        res.json({ success: true });
    });            
});

router.get('/:id', function(req, res, next) {
    var Alumno = mongoose.model('Alumno');
    
    Alumno.findById(req.params.id, function (err, alumno) {
        if (err) return next(err);
        res.json(alumno);
    });
});

router.put('/', function(req, res, next) {
    var Alumno = mongoose.model('Alumno');
    
    Alumno.findById(req.body.id, function (err, alumno) {
        if (err) return next(err);

        alumno.name = req.body.name;
        alumno.age = parseInt(req.body.age, 10);  
        
        alumno.save(function (err, data) {
            if (err) return next(err);
            res.json({success: true});
        }); 
    });   
});

router.delete('/:id', function(req, res, next) {
    var Alumno = mongoose.model('Alumno');
    
    Alumno.remove({ _id: req.params.id }, function (err) {
        if (err) return next(err);
        
        res.json({ success: true });
    });
});


module.exports = router;
