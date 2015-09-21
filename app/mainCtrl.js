var app = angular.module("mainApp");
app.controller("mainCtrl", ["$scope", "$state", "$location", "loginSrv","$cookies",
    function ($scope, $state, $location, loginSrv,$cookies) {
        //$scope.isAuthenticate = "karambiacukia";
        $scope.test = function () {
            //console.log($state.current.name);
            console.log($location.path());
        };
        $scope.isActive = function (lokasi) {
            return $state.current.name.startsWith(lokasi);
        };

        $scope.logout = function () {
            loginSrv.logout().then(
                function (hasil) {
                    if(hasil.status==true){
                        $cookies.remove("userInfo");
                        $state.go("login");
                    }
                },
                function (err) {
                    console.log(err);
                }
            )

        };

    }]);