(function(){
    angular.module('mainApp')
    .controller('addChanceChannelCtrl', function($scope, $http, baseUrl, Upload, chanceChannelSrv, toaster){
        $scope.fileGambar = "";
    	$scope.uploadGambar = function(file){
            if ( $scope.chance.picture ) {
                Upload.upload({
                    url: baseUrl + '/api/chance_channel/uploadpictchance',
                    fileFormDataName:"picture",
                    file: file
                }).progress(function (evt) {
                    $scope.p = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.fileGambar = data.file_name;
                    $scope.message = "Upload Successful"
                    // console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                }).error(function (data, status, headers, config) {
                    $scope.message = "Upload Failed";
                    alert("error");
                    // console.log('error status: ' + JSON.stringify(data));
                });
            }
        };

        var clearFields = function(){
            $scope.chance.title = "";
            $scope.chance.startdate = "";
            $scope.chance.enddate = "";
            $scope.chance.bonus = "";
            $scope.chance.totalbonus = "";
            $scope.chance.picture = "";
            $scope.chance.deskripsi = "";
        };

        $scope.simpan = function(data){
            if ($scope.fileGambar != ""){
                var dataChance = {
                    "idchannel" : $scope.idChannel,
                    "title" : data.title,
                    "startdate" : data.startdate.getFullYear()+'-'+(data.startdate.getMonth()+1)+'-'+data.startdate.getDate(),
                    "enddate" : data.enddate.getFullYear()+'-'+(data.enddate.getMonth()+1)+'-'+data.enddate.getDate(),
                    "bonus" : data.bonus,
                    "totalbonus" : data.totalbonus,
                    "picture" : $scope.fileGambar,
                    "deskripsi" : data.deskripsi
                };

                chanceChannelSrv.addChance(dataChance).
                    then(function(){
                        if (chanceChannelSrv.respon[0].status == "200"){
                            clearFields();
                            toaster.pop("succes", "Success", "Lucky chance berhasil ditambah.");
                        } else{
                            toaster.pop("error", "Failed", "Gagal disimpan.");
                        }
                    },function(){
                    });
            } else{
                toaster.pop("error", "Failed", "Gambar gagal di upload.");
            }
        };
    })
}());