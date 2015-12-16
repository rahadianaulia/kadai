(function(){
    angular.module('mainApp')
    .controller('loginCtrl', function($scope,$state, loginSrv, $cookies){
        $scope.login = function(user){
        	loginSrv.login(user).then(
                    function (hasil) {
                        // console.log(hasil.data[0]);
                        if (hasil.data.length > 0){
                            $state.go("main.dashboard", {}, { reload : true});
                            $cookies.putObject("userInfo",hasil.data[0]);
                            // console.log(hasil.data[0].level);
                            $scope.setRoles(hasil.data[0].level);
                            $scope.setIDChannel(hasil.data[0].id_channel);
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        };
    })
}());