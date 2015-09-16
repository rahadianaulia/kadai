(function () {
    angular.module("mainApp")
        .controller("eventAddCtrl", ["$scope", "$modalInstance","toaster","eventSrv",
            function ($scope, $modalInstance,toaster,eventSrv) {
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.simpan = function(obj){
                eventSrv.addEvent(obj).then(function(){
                    if (eventSrv.trxResponse[0].status == "200"){
                        toaster.pop("succes", "Success", "Kota berhasil ditambah!");
                        $modalInstance.close();
                    } else{
                        toaster.pop("error", "Fail", "Kota gagal ditambah!");
                    }
                }, function(error){
                    console.log("Ctrl Error : " + error);
                });

            }

        }]);
}());