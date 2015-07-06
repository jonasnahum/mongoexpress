angular.module('factories').
factory('studentsFactory', function($resource) {
    return $resource('/api/students',  null, {
        change: {method: 'PUT'}
    });
});