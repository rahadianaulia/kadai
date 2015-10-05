(function(){
    angular.module('mainApp')
    .controller('descriptionEventCtrl', function($scope, $modalInstance, Description){
        $scope.description = Description;

        $scope.close = function(){
            $modalInstance.dismiss("cancel");
        };
    })
}());