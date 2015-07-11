(function() {
    var app = angular.module("app");
    
    app.factory("ApiService", ['$http', function($http) {
        var api = { };
        api.url = '/api/students/';
        
        api.error = function(data, status, headers, config, statusText) {
            console.error('%s %s %s', config.method, config.url, status);
        }
        
        api.getAll = function(success) {
            var promise = $http.get(api.url);
            promise.success(success);
            promise.error(api.error);
        }
        
        api.getOne = function(id, success) {            
            var promise = $http.get(api.url + id);
            promise.success(success);
            promise.error(api.error);
        }
        
        api.delete = function(id, success) {
            $http({
                url: api.url + id,
                method: "DELETE",
            }).success(success).error(api.error);
        }
        
        api.save = function(model, success) {            
            $http({
                url: api.url,
                method: "POST",
                data: model,
            }).success(success).error(api.error);
        }
        
        api.update = function(model, success) {            
            $http({
                url: api.url,
                method: "PUT",
                data: model,
            }).success(success).error(api.error);
        }
        
        return api;
        
    }]);
    
})();