(function () {
    angular.module("mainApp")
        .controller("eventCtrl", ["$scope", "eventSrv","$modal",
            function ($scope, eventSrv, $modal) {
                $scope.judul = "Event";
                $scope.events = eventSrv;

                var init = function () {
                    eventSrv.reqEvents().then(
                        function () {
                            //console.log(eventSrv.getEvents());
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

            }]);
}());