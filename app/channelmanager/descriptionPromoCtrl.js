(function(){
    angular.module('mainApp')
    .controller('descriptionPromoCtrl', function($scope, $modalInstance, shortDesc, longDesc){
        $scope.shortDesc = shortDesc;
        $scope.longDesc = longDesc;

        $scope.close = function(){
            $modalInstance.dismiss("cancel");
        };
    })
}());