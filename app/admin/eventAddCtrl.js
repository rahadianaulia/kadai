(function(){
    angular.module("mainApp")
        .controller("eventAddCtrl", ["$scope","$modalInstance",function($scope, $modalInstance){
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
                $scope.open = function($event) {
                    alert("test");
                    $scope.status.opened = true;
                };
            };
        }]);
}());