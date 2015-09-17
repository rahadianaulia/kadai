(function () {
    angular.module("mainApp")
        .controller("eventCtrl", ["$scope", "eventSrv","$modal","toaster",
            function ($scope, eventSrv, $modal,toaster) {
                $scope.judul = "Event";
                $scope.events = eventSrv;

                var init = function () {
                    eventSrv.reqEvents().then(
                        function () {
                        },
                        function (error) {
                            console.log(error);
                        }
                    )
                };
                init();

                $scope.addEvent = function(){
                    var viewAddEvent = $modal.open({
                        templateUrl:"templates/admin/eventAddModal.html",
                        controller : "eventAddCtrl",
                        size:"lg",
                        backdrop : false
                    });
                    viewAddEvent.result.then( function(){
                        init();
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
                    eventSrv.deleteEvent(obj).then(
                        function(result){
                            if(result.status=="200"){
                                toaster.pop("succes", "Success", "Data telah dihapus");
                                init();
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