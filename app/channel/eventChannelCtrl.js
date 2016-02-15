(function () {
    angular.module("mainApp")
        .controller("eventChannelCtrl", ["$scope", "eventChannelSrv","$modal","toaster", "$http", "baseUrl", 
            function ($scope, eventChannelSrv, $modal,toaster, $http, baseUrl) {
                $scope.judul = "Event";

                var getEvent = function(){
                    $http.get(baseUrl + "/api/event/getEventChannel/idchannel/" + $scope.idChannel)
                    .then(function(result){
                        $scope.events = result.data;
                    }, function(error){

                    });
                }; getEvent();

                $scope.addEvent = function(){
                    var viewAddEvent = $modal.open({
                        templateUrl:"templates/admin/eventAddModal.html",
                        controller : "eventChannelAddCtrl",
                        size:"lg",
                        backdrop : false
                    });
                    viewAddEvent.result.then( function(){
                        getEvent();
                    }, function(){

                    });

                };
                $scope.editEvent = function(){
                    var viewEditEvent = $modal.open({
                        templateUrl:"templates/admin/eventAddModal.html",
                        controller : "eventEditCtrl",
                        size:"lg",
                        backdrop:false
                    });
                };
                $scope.delEvent = function(obj){
                    eventChannelSrv.deleteEvent(obj).then(
                        function(result){
                            if(result.status=="200"){
                                toaster.pop("succes", "Success", "Data telah dihapus");
                                getEvent();
                            }else{
                                toaster.pop("error", "Fail", "Event gagal dihapus!");
                            }
                        },
                        function(error){
                           console.log(error);
                        }
                    );
                }

            }]);
}());