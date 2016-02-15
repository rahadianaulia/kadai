(function () {
    angular.module("mainApp")
        .controller("eventChannelAddCtrl", ["$scope","toaster","eventChannelSrv", "$state",
            function ($scope,toaster,eventChannelSrv, $state) {

            $scope.simpan = function(obj){
                var event = {
                    "idchannel" : $scope.idChannel,
                    "nama_event" : obj.nama_event,
                    "deskripsi" : obj.deskripsi,
                    "akhir_event" : obj.akhir_event,
                    "jumlah_point" : obj.jumlah_point,
                    "jumlah_coupon" : obj.jumlah_coupon
                }
                
                eventChannelSrv.addEvent(event).then(function(result){
                    if (result.status == "200"){
                        toaster.pop("succes", "Success", "Event berhasil ditambah!");
                        $state.go("main/channel/event");
                    } else{
                        toaster.pop("error", "Fail", "Event gagal ditambah!");
                    }
                }, function(error){
                    console.log("Ctrl Error : " + error);
                });

            }

        }]);
}());