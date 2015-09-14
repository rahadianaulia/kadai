(function(){
    angular.module('mainApp')
    .controller('kotaModalCtrl', function($scope, $modalInstance, toaster, kotaSrv){
	    
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};

		var clearField = function(){
			$scope.namakota = "";
		};

		$scope.simpan = function(kota){
			kotaSrv.tambahKota({"namakota":kota}).then(function(){
	                	if (kotaSrv.respon[0].status == "200"){
	                		toaster.pop("succes", "Success", "Kota berhasil ditambah!");
	                		clearField();
                			$modalInstance.close();
	                	} else{
	                		toaster.pop("error", "Fail", "Kota gagal ditambah!");
	                	}
	                },function(){
	                	toaster.pop("error", "Fail", "Kota gagal ditambah!");
	                });
		};
    })
}());