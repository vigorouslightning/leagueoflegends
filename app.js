var app = angular.module("lolApp", ['ngRoute']);
            
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'lolController'
        })
        .when('/champion/:champID', {
            templateUrl : 'champDetail.html',
            controller  : 'champController'
        })
        .when('/home', {
            templateUrl : 'home.html',
            controller  : 'lolController'
        })
        .otherwise({
            redirectTo: '/404'
        });
});
