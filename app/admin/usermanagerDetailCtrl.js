(function () {
    angular.module("mainApp")
        .controller("usermanagerDetailCtrl", ["$scope", "usermanagerSrv", "$stateParams","user", "pointSrv",
            function ($scope, usermanagerSrv, $stateParams,user, pointSrv) {
                $scope.pointHistory = pointSrv;
                $scope.usermanager = usermanagerSrv;
                $scope.user = user;

                $scope.showPointHistories = function(){
                    pointSrv.getHistory($stateParams.username).then(
                        function(){
                            console.log($stateParams.username);
                            console.log(pointSrv.getPointHistories());
                        },
                        function(err){
                            console.log(err);
                        }
                    )
                };
                //console.log($scope.user);
            }]);
}());
