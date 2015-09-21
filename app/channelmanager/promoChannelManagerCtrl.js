(function(){
    angular.module('mainApp')
    .controller('promoChannelManagerCtrl', function($scope, $http, baseUrl, website){
        //initial
        $scope.website = website;

        //get list promo
        var getListPromo = function(){
            $http.get(baseUrl + "/api/promo_channel_manager/listpromo")
            .then(function(result){
                $scope.promo = result.data;
            }, function(){

            });
        }; getListPromo();

        var getAllChannel = function(){
            $http.get(baseUrl + "/api/promo_channel_manager/getallchannel")
            .then(function(result){
                $scope.channels = result.data;
            }, function(){

            });
        }; getAllChannel();
    })
}());