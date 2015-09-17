(function(){
    angular.module('mainApp')
    .controller('promoAdminCtrl', function($scope, $http, $modal, baseUrl, website, toaster){
    	//initial
    	$scope.website = website;

    	//get all promo
    	var getPromo = function(){
    		$http.get(baseUrl + "/api/promo_admin/listpromo")
    		.then(function(result){
    			$scope.items = result.data;
    		}, function(error){

    		});
    	}; getPromo();

        $scope.deletePromo = function(data){
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
                        return 'Hapus Promo "' + data.nama_promo + '" ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                if (hasil == "ok"){
                    $http.get(baseUrl + "/api/promo_admin/deletepromo/idpromo/" + data.id_promo).then(
                    function(result){
                        toaster.pop("succes", "Success", "Promo berhasil di hapus!");
                        getPromo();
                    },function(error){
                        toaster.pop("error", "Fail", "Promo gagal di hapus!");
                    });
                }
            },function(){});
        }
    })
}());