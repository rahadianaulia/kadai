var app = angular.module("mainApp");
app.controller("mainCtrl", ["$scope","$state", "$location", "$cookies", "loginSrv", function($scope, $state, $location, $cookies, loginSrv){
    //initial
    $scope.roles = getRoles();
    $scope.idChannel = getIDChannel();

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
    };

    function getIDChannel(){
        var roles = $cookies.getObject("userInfo");
        if (roles != null){
            return roles.id_channel;
        } else {
            return null;
        }
    };

    $scope.setRoles = function(level){
        $scope.roles = level;
    };

    $scope.setIDChannel = function(idchannel){
        $scope.idChannel = idchannel;
    };

}]);