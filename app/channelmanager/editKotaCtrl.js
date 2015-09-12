(function(){
    angular.module('mainApp')
    .controller('editKotaCtrl', function($scope, $modalInstance, channelSrv, dataKota, toaster){
    	$scope.kota = {
    		idKota : dataKota.id_kota,
    		namaKota : dataKota.nama_kota
    	};

	    $scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};

		$scope.updateKota = function(kota){
			channelSrv.editKota(JSON.stringify(kota)).
	                then(function(){
	                	if (channelSrv.respon[0].status == "200"){
	                		toaster.pop("succes", "Success", "Kota berhasil di update!");
                			$modalInstance.close();
	                	} else{
	                		toaster.pop("error", "Fail", "Kota gagal di update!");
	                	}
	                },function(){
	                	toaster.pop("error", "Fail", "Kota gagal di update!");
	                });
		};
    })
}());