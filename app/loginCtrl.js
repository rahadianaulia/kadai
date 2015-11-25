(function(){
    angular.module('mainApp')
    .controller('loginCtrl', function($scope,$state, loginSrv, $cookies){
        $scope.login = function(user){
        	loginSrv.login(user).then(
                    function (hasil) {
                        // console.log(hasil.data[0]);
                        if (hasil.data.length > 0){
                            $state.go("main.dashboard");
                            $cookies.putObject("userInfo",hasil.data[0]);
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        };
    })
}());