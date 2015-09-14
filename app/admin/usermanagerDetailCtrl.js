(function () {
    angular.module("mainApp")
        .controller("usermanagerDetailCtrl", ["$scope", "usermanagerSrv", "$stateParams","user",
            function ($scope, usermanagerSrv, $stateParams,user) {

                $scope.usermanager = usermanagerSrv;
                $scope.user = user;
                //console.log($scope.user);
            }]);
}());
