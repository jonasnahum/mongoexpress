(function() {
    var app = angular.module('app');
    
    app.controller('StudentsController', ['$http', function($http) {
        var model = this;
        model.students = [];
                
        $http.get('/api/students').success(function(data){
            model.students = data;
            console.dir(data);
        });
        
    }]);
})();