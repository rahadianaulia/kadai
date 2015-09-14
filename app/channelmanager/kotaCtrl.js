(function(){
    angular.module('mainApp')
    .controller('kotaCtrl', function($scope, $http, $modal, baseUrl, toaster){
	    $scope.cities = [];

	    var getCities = function(){
	        $http.get(baseUrl + "/api/channel/getKota").then(
	            function(result){
	                $scope.cities = result.data;
	            },function(error){
	            });
	    }; getCities();
		
			
		$scope.showCityForm = function(){
	            var viewBarang = $modal.open({
	                templateUrl:"templates/channelmanager/formKotaModal.html",
	                controller : "kotaModalCtrl",
	                backdrop : false
	            });

	            viewBarang.result.then( function(){
	                getCities();
	            }, function(){

	            });
		};

		$scope.showEditCity = function(data){
			var viewBarang = $modal.open({
	                templateUrl:"templates/channelmanager/editKotaModal.html",
	                controller : "editKotaCtrl",
	                backdrop : false,
	                resolve : {
	                	dataKota : function(){
	                		return data;
	                	}
	                }
	            });

	            viewBarang.result.then( function(){
	                getCities();
	            }, function(){
	            });
		};

		$scope.deleteCity = function(data){
			var modalDialog = $modal.open({
                templateUrl : "templates/modaldialog/confirmDialog.html",
                controller : "confirmDialogCtrl",
                size : "sm",
                backdrop : false,
                resolve :{
                    header : function(){
                        return "Konfirmasi";
                    },
                    pesan : function(){
                        return 'Hapus kota "' + data.nama_kota + '" ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                if (hasil == "ok"){
                	$http.get(baseUrl + "/api/channel/deletecity/idkota/" + data.id_kota).then(
		            function(result){
		            	toaster.pop("succes", "Success", "Kota berhasil di hapus!");
		                getCities();
		            },function(error){
		            	toaster.pop("error", "Fail", "Kota gagal di hapus!");
		            });
                }
            },function(){});
		}
    })
}());