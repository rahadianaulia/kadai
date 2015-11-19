(function(){
    angular.module('mainApp')
    .controller('loginCtrl', function($scope, $cookies, loginSrv){
        $scope.login = function(user){
        	loginSrv.login(user).then(
                    function (hasil) {
                        console.log(hasil.data[0]);
                        $cookies.putObject("userInfo",hasil.data[0]);
                        // $state.go("main.dashboard");
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        	// var username = $scope.username;
        	// var password = $scope.pass;
        	// $cookies.putObject("userInfo", username+password);
        };
    })
}());