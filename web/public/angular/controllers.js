(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$location', 'studentsApi', function($location, api) {        
        
        var model = this;
        model.students = [];
        
        model.getAll = function(){
            api.getAll(function(data){
                model.students = data;
            });
        };        
        
        model.delete = function(id) {
            api.delete(id, function() {
                $location.path('/');
            });
        };
        
        model.getAll();
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('NuevoController', ['$location', 'studentsApi', function($location, api) {
        var model = this;
        model.name = '';
        model.age = '';
      
        model.save = function() {           
            api.save(model, function(){
                $location.path('/');
            });
        };
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('EditarController', ['studentsApi', '$location', '$routeParams', function(api, $location, $params) {
        var model = this;
        model.name = '';
        model.age = '';
        model.id = 0;        
      
        model.load = function() {   
            api.getOne($params.id, function(data) {
                model.name = data.name;
                model.age = data.age;
                model.id = data._id;
            });
        };
        
        model.update = function() {      
            api.update(model, function(data) {
                $location.path('/');
            });
        };
        
        model.load();
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('VerController', ['studentsApi', '$routeParams', function(api, $params) {
        var model = this;
        model.name = '';
        model.age = '';
        model.id = 0;        
      
        model.load = function() {    
            api.getOne($params.id, function(data) {
                model.name = data.name;
                model.age = data.age;
                model.id = data._id;
            });        
        };
        
        model.load();
    }]);
})();