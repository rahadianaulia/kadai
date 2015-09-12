(function () {
    var app = angular.module("mainApp");
    app.controller("channelProfileCtrl", ["$scope", "$stateParams", "channelSrv", "website",
        "Upload", "baseUrl", "optKota","channel",
        function ($scope, $stateParams, channelSrv, website, Upload, baseUrl, optKota, channel) {
            $scope.kotas = optKota;
            $scope.objChannel= channel;
            var save = function (obj) {
                console.log(obj);
                var data = {
                "id_channel" : obj.id_channel,
                "nama_channel" : obj.nama_channel,
                "id_kota" : obj.kota.id_kota,
                "deskripsi" : obj.deskripsi,
                "user" : obj.user,
                "password" : obj.password,
                "alamat" : obj.alamat,
                "hp" : obj.hp,
                "email" : obj.email,
                "logo" : obj.logo
                };
                channelSrv.editChannel(data).then(function () {
                }, function () {
                });
            };
            var upload = function (file, obj) {
                Upload.upload({
                    url: baseUrl + '/api/channel/uploadlogo',
                    fileFormDataName: "logochannel",
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    //$channel.getResponse[0].logo = data.file_name;
                    obj.logo = data.file_name;
                    //console.log(obj);
                    save(obj);
                    $scope.file = undefined;
                    //getChannel();

                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    //alert("OK");
                }).error(function (data, status, headers, config) {
                    //alert("error");
                    //console.log('error status: ' + JSON.stringify(data));
                })
            };


            $scope.editMode = false;
            $scope.infoEditMode = false;
            $scope.judul = "Channel Profile";
            $scope.website = website;
            $scope.saveLogo = function (obj) {
                upload($scope.file, obj);
            }

            $scope.editDeskripsi = function () {
                $scope.editMode = true;
            };
            $scope.saveDeskripsi = function (obj) {
                save(obj);
                $scope.editMode = false;
            };
            $scope.editInfo = function () {
                $scope.infoEditMode = true;

            };
            $scope.saveInfo = function (obj) {
                save(obj);
                $scope.infoEditMode = false;
                //getChannel();
            };


        }]);
}());
