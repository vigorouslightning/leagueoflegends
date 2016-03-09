/*global app*/

app.controller("lolController", ['$scope', '$http', 'dataCache',function($scope, $http, dataCache) {
    $scope.datadragonURL = '';
    
    var cache = dataCache.get('data');
    
    if (cache) {
        $scope.champJson = cache;
    }
    else {
        $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
		    $scope.champJson = response;
		    dataCache.put('data', response);
	    });
    }
				
	$http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/realm?api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
	    $scope.realm = response; 
	});
}]);

app.controller("summonerController", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.summonerName = $routeParams.summonerName;
    
    $http.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + $scope.summonerName +'?api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function (response) {
        $scope.summonerID = response.ID;
    });
    
    $http.get('https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/25395431/summary?season=SEASON2015&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function (response) {
        $scope.summonerData = response;
    });
}]);

app.controller("champController", ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
    $scope.champID = $routeParams.champID;
    $scope.splashURL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    $scope.spellURL = 'http://ddragon.leagueoflegends.com/cdn/5.18.1/img/spell/';

    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + $scope.champID + '?champData=all&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
	    $scope.champInfo = response;
	    angular.forEach($scope.champInfo.spells, function(val, key) {
	        //$scope.champInfo.spells[key].tooltip = $scope.champInfo.spells[key].tooltip.replace(/e1/g, "effect[1]");
	        val.tooltip = val.tooltip.replace(/{{ e1 }}/g, val.effect[1].join("/"))
	                        .replace(/{{ e2 }}/g, val.effect[2].join("/"))
	                        .replace(/{{ e3 }}/g, val.effect[3].join("/"))
	                        //.replace(/{{ e4 }}/g, val.effect[4].join("/"));
	        console.log(val.tooltip);
	        console.log("This is $scope" + $scope.champInfo.spells[key].tooltip);
	    });
	});
}]);

app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text.replace(/class=\"color/g, "style=\"color: #"));
    };
}]);

/*
app.directive("spelltip", function($compile) {
  return {
    scope: true,
    restrict: 'E',
    template: '<div style=\"border: 1px solid red;\"><div ng-bind-html=\"spell.tooltip | to_trusted\"</div></div>',
    link: function(scope, element, attrs) {
        
    }
  };
});
*/