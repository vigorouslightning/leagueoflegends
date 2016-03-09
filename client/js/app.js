/*global angular*/

var app = angular.module("lolApp", ['ngRoute']);
            
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'client/views/home.html',
            controller  : 'lolController'
        })
        .when('/champion/:champID', {
            templateUrl : 'client/views/champDetail.html',
            controller  : 'champController'
        })
        .when('/summoner/:summonerName', {
            templateUrl : 'client/views/summonerDetail.html',
            controller  : 'summonerController'
        })
        .otherwise({
            redirectTo: '/404'
        });
        
        $locationProvider.html5Mode(true);
});

app.factory('dataCache', function($cacheFactory) {
    return $cacheFactory('data');    
});