var app = angular.module("mainApp");
app.controller("mainCtrl", ["$scope","$state", "$location", function($scope, $state, $location){

$scope.test = function(){
    //console.log($state.current.name);
    console.log($location.path());
};
    $scope.isActive = function(lokasi){

        return $state.current.name.startsWith(lokasi);
    };

}]);