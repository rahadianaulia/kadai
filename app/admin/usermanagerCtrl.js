(function(){
    var app = angular.module("mainApp");
    app.controller("usermanagerCtrl",["$scope","usermanagerSrv","$state", function($scope,usermanagerSrv, $state){
        $scope.judul="User Manager";
        $scope.usermanager = usermanagerSrv;

        var getDataUsers = function(){
            usermanagerSrv.getUserList().then(
                function(){
                    //console.log(usermanagerSrv.getData());
                },function(error){
                    console.log(error);
                }
            );
        };

        getDataUsers();
        $scope.detail = function(username){
            $state.go("main.usermanagerdetail",{username:username});
        };
    }]);
}());