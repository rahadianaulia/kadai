var app = angular.module("mainApp");
app.controller("mainCtrl", ["$scope","$state", "$location", "$cookies", "loginSrv", function($scope, $state, $location, $cookies, loginSrv){

$scope.test = function(){
    //console.log($state.current.name);
    console.log($location.path());
};
    $scope.isActive = function(lokasi){
        return $state.current.name.startsWith(lokasi);
    };

    $scope.logout = function(){
    	 loginSrv.logout().then(
                function (hasil) {
                    if(hasil.status==true){
                        $cookies.remove("userInfo");
                        $location.path('/login', {}, { reload: true });
                    }
                },
                function (err) {
                    console.log(err);
                }
            )
    };

    function getRoles(){
    	var roles = $cookies.getObject("userInfo");
    	if (roles != null){
    		return roles.level;
    	} else {
    		return null;
    	}
    }

    $scope.roles = getRoles();

    $scope.setRoles = function(level){
        $scope.roles = level;
    };

}]);