(function(){
    angular.module('mainApp')
    .controller('activityChanceCtrl', function($scope, $http, $modalInstance, baseUrl, idchance){
    	
    	var getDetail = function(){
    		$http.get(baseUrl + "/api/chance_admin/detaillogchance/idchance/" + idchance).then(
                function(result){
                	$scope.username = result.data[0].username;
                	$scope.activityDate = result.data[0].activity_date;
                },function(error){
                });
    	}; getDetail();

    	$scope.close = function(){
    		$modalInstance.dismiss('cancel');
    	}
    	
    })
}());