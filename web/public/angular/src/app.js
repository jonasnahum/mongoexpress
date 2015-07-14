(function () {
    var app = angular.module('app', ['ngRoute']);


    app.config(["$routeProvider", function ($router) {        
        $router.when("/", { templateUrl: "angular/views/index.html" })
        .when("/nuevo", { templateUrl: "angular/views/nuevo.html" })
        .when("/editar/:id", { templateUrl: "angular/views/editar.html" })
        .when("/ver/:id", { templateUrl: "angular/views/ver.html" })
        .otherwise({ redirectTo: "/" });        
    }]);
    
})();