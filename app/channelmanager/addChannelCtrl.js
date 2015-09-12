(function () {
    angular.module('mainApp')
        .controller('addChannelCtrl', ["$scope", "baseUrl", "website", "channelSrv", "Upload","kotaSrv","optKota",
            function ($scope, baseUrl, website, channelSrv, Upload,kotaSrv, optKota) {
                $scope.channelFact = channelSrv;
                $scope.kotas = optKota;
                $scope.channel = {
                    "logo":"noimage.png",
                    "deskripsi" : ""
                };
                $scope.progressPercentage = 0;
                $scope.saveLogo = function() {
                    if ( $scope.form.file.$valid && $scope.file && !$scope.file.$error) {
                        $scope.upload($scope.file);
                    } else{

                    }
                };

                $scope.upload = function (file) {
                    Upload.upload({
                        url: baseUrl + '/api/channel/uploadlogo',
                        fileFormDataName:"logochannel",
                        file: file
                    }).progress(function (evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        //console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                        //console.log(data.file_name);
                        $scope.channel.logo = data.file_name;
                    }).error(function (data, status, headers, config) {

                        //alert("error");
                        //console.log('error status: ' + JSON.stringify(data));
                    })
                };
                $scope.simpan = function(obj){
                    if($scope.form.$valid){
                        channelSrv.addChannel(obj).then(function(hasil){
                            console.log(hasil);
                        }, function(error){
                            console.log(error);
                        });
                        //console.log(obj);
                    }

                }
            }])
}());