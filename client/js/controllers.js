app.controller("lolController", ['$scope', '$http', 'dataCache',function($scope, $http, dataCache) {
    $scope.datadragonURL = '';
    $scope.splashURL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    
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

app.controller("champController", ['$scope', '$http', '$routeParams', '$sce', '$location', '$window', function($scope, $http, $routeParams, $sce, $location, $window) {
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });
    $scope.champID = $routeParams.champID;
    $scope.splashURL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    $scope.spellURL = 'http://ddragon.leagueoflegends.com/cdn/5.18.1/img/spell/';
    $scope.parsePlaceholders = function(spell) {
        spell.tooltip = spell.tooltip.replace(/{{ e1 }}/, spell.effect[1]);
        return spell.tooltip;
    };

    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + $scope.champID + '?champData=all&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
	    $scope.champInfo = response;
	    angular.forEach($scope.champInfo.spells, function(val, key) {
	        val.tooltip = $scope.parsePlaceholders(val);

	    });
	});
}]);

app.filter('to_trusted', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text.replace(/class=\"color/g, "style=\"color: #"));
    };
}]);