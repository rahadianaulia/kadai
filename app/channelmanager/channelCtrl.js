(function () {
    angular.module('mainApp')
        .controller('channelCtrl', function ($scope, $http, baseUrl, website, channelSrv, $state) {
            //initial
            $scope.channelFact = channelSrv;
            $scope.website = website;

            //get channels
            var getChannels = function () {
                channelSrv.getChannel().then(function(){
                    $scope.listChannel = channelSrv.listObjChannel();
                }, function(){});
            };
            getChannels();


            $scope.detail = function(idChannel){
                //$state.go("profile",{'idChannel': idChannel},{reload: true});
                $state.transitionTo("channelmanager.channel.detail",{'idChannel': idChannel},{reload: true, notify:true});
                //alert(idChannel);
            };
        })
}());