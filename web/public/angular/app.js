(function () {
    var app = angular.module("app", ["ngRoute"]);//, 'controllers', 'factories']);


    app.config(["$routeProvider", function ($router) {        
        $router.when("/", { templateUrl: "angular/views/index.html" })
        //.when("/match", { templateUrl: "app/views/match-directive.html" })
        .otherwise({ redirectTo: "/" });        
    }]);
    
})();