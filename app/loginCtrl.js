(function(){
    angular.module('mainApp')
    .controller('loginCtrl', function($scope, $http, baseUrl, $modal, toaster){
        $scope.login = function(){
        	var username = $scope.username;
        	var password = $scope.pass;
        	
        };
    })
}());