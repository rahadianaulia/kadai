(function () {
    angular.module("mainApp")
        .controller("loginCtrl", ["$scope", "$state", "loginSrv","$cookies", function ($scope, $state, loginSrv, $cookies) {
            $scope.login = function (user) {
                loginSrv.login(user).then(
                    function (hasil) {
                        console.log(hasil.data[0]);
                        $cookies.putObject("userInfo",hasil.data[0]);
                        $state.go("main.dashboard");
                    },
                    function (err) {
                        console.log(err);
                    }
                );

            }

        }]);
}());