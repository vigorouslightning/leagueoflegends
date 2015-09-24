app.controller("lolController", function($scope, $http) {
    $scope.datadragonURL = '';
                
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
		$scope.champJson = response;
	});
				
	$http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/realm?api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
	    $scope.realm = response; 
	});
});

app.controller("champController", function($scope, $http, $routeParams, $sce) {
    $scope.champID = $routeParams.champID;
    $scope.splashURL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    $scope.spellURL = 'http://ddragon.leagueoflegends.com/cdn/5.18.1/img/spell/';
    $scope.trust = $sce.trustAsHtml;
    
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + $scope.champID + '?champData=all&api_key=b322dc6d-0fcf-4484-9fc3-a9a902a32274').success(function(response){
	    $scope.champInfo = response;
	});
});