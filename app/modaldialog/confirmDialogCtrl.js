(function(){
    angular.module('mainApp')
    .controller('confirmDialogCtrl', function($scope, $modalInstance, header, pesan){
        $scope.judul = header;
        $scope.pesan = pesan;

        $scope.ok = function(){
            $modalInstance.close("ok");
        };
        $scope.cancel = function(){
            $modalInstance.dismiss("cancel");
        };
    })
}());