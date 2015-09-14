(function(){
    angular.module('mainApp')
    .controller('promoAdminCtrl', function($scope, $http, baseUrl, website){
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
    })
}());