(function(){
    angular.module('mainApp')
    .controller('loginCtrl', function($scope, $cookies){
        $scope.login = function(){
        	var username = $scope.username;
        	var password = $scope.pass;
        	$cookies.putObject("userInfo", username+password);
        };
    })
}());