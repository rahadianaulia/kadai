(function () {
    angular.module('mainApp')
        .controller('channelCtrl', ["$scope", "$http", "baseUrl", "website", "channelSrv", "$state","toaster",
            function ($scope, $http, baseUrl, website, channelSrv, $state, toaster) {
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
                $state.transitionTo("main.channelmanager.detail",{'idChannel': idChannel});
            }

            $scope.delete = function(obj){
                //console.log(obj);
                channelSrv.deleteChannel(obj).then(
                    function(result){

                        if(result.status=="200"){
                            toaster.pop("succes", "Success", "Data telah dihapus");
                            getChannels();
                        }else{
                            toaster.pop("error", "Fail", "Event gagal dihapus!");
                        }
                    }, function(error){}
                )
            }
        }])
}());