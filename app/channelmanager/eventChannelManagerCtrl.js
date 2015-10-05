(function(){
    angular.module('mainApp')
    .controller('eventChannelManagerCtrl', function($scope, $http, $modal, baseUrl, website){
        //initial
        $scope.website = website;

        var getListEvent = function(){
            $http.get(baseUrl + "/api/event_channel_manager/listevent")
            .then(function(result){
                $scope.events = result.data;
            }, function(){

            });
        }; getListEvent();

        $scope.showDesc = function(desc){
            $modal.open({
                templateUrl:"templates/channelmanager/descriptionEventModal.html",
                controller: "descriptionEventCtrl",
                backdrop : false,
                resolve: {
                    Description : function(){
                        return desc;
                    }
                }
            });
        };
    })
}());