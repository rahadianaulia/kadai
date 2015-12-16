(function(){
    angular.module('mainApp')
    .controller('chanceChannelCtrl', function($scope, $http, baseUrl, $modal, toaster){
    	$scope.website = baseUrl.website;
    	
    	var getChance = function(){
    		$http.get(baseUrl + "/api/chance_channel/listchance/idchannel/" + $scope.idChannel).then(
	            function(result){
	                $scope.chances = result.data;
	            },function(error){
	            });
    	}; getChance();

        $scope.viewDetail = function(idchance){
            $modal.open({
                templateUrl:"templates/admin/activityChanceModal.html",
                controller : "activityChanceChannelCtrl",
                backdrop : false,
                size: 'sm',
                resolve: {
                    idchance : function(){
                            return idchance;
                        }
                }
            });
        };

        $scope.deleteChance = function(data){
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
                        return 'Hapus Chance "' + data.title + '" ?';
                    }
                }
            });

            modalDialog.result.then(function(hasil){
                if (hasil == "ok"){
                    $http.get(baseUrl + "/api/chance_channel/deletechance/idchance/" + data.id_chance + "/idchannel/" + $scope.idChannel).then(
                    function(result){
                        toaster.pop("succes", "Success", "Chance berhasil di hapus!");
                        getChance();
                    },function(error){
                        toaster.pop("error", "Fail", "Chance gagal di hapus!");
                    });
                }
            },function(){});
        };
    })
}());