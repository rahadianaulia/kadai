(function(){
    angular.module('mainApp')
    .controller('promoChannelManagerCtrl', function($scope, $http, $modal, baseUrl, website){
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

        $scope.promoByChannel = function(idchannel){
            if (idchannel == null){
                getListPromo();
            } else{
                $http.get(baseUrl + "/api/promo_channel_manager/promobychannel/idchannel/" + idchannel)
                .then(function(result){
                    $scope.promo = result.data;
                }, function(){

                });
            }
        };

        $scope.viewDescription = function(shortDesc, longDesc){
            $modal.open({
                templateUrl:"templates/channelmanager/descriptionPromoModal.html",
                controller : "descriptionPromoCtrl",
                backdrop : false,
                resolve: {
                    shortDesc : function(){
                        return shortDesc;
                    },
                    longDesc : function(){
                        return longDesc;
                    }
                }
            });
        };
    })
}());