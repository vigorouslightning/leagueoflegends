var app = angular.module("lolApp", ['ngRoute']);
            
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'lolController'
        })
        .when('/champion/:champID', {
            templateUrl : 'champDetail.html',
            controller  : 'champController'
        })
        .otherwise({
            redirectTo: '/404'
        });
        
        $locationProvider.html5Mode(true);
});
