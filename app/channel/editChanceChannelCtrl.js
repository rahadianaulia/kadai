(function(){
    angular.module('mainApp')
    .controller('editChanceChannelCtrl', function($scope, $http, $stateParams, $state, baseUrl, website, Upload, chanceChannelSrv, toaster){
        var idChance = $stateParams.idchance;
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

        var getDetailChance = function(){
            $http.get(baseUrl + "/api/chance_channel/chancebyid/idchance/" + idChance).then(
                function(result){
                    $scope.picture = website + '/chance/' + result.data[0].pict;
                    $scope.chance = {
                        deskripsi : result.data[0].description,
                        title : result.data[0].title,
                        startdate : new Date(result.data[0].start_date),
                        enddate : new Date(result.data[0].end_date),
                        bonus : result.data[0].bonus,
                        totalbonus : parseInt(result.data[0].total_bonus)
                    };
                },function(error){
                });
        };getDetailChance();

        var clearFields = function(){
            $scope.chance.title = "";
            $scope.chance.startdate = "";
            $scope.chance.enddate = "";
            $scope.chance.bonus = "";
            $scope.chance.totalbonus = "";
            $scope.chance.picture = "";
            $scope.chance.deskripsi = "";
        };

        $scope.updateChance = function(data){
            var dataChance = {
                "idchannel" : $scope.idChannel,
                "idchance" : idChance,
                "title" : data.title,
                "startdate" : data.startdate.getFullYear()+'-'+(data.startdate.getMonth()+1)+'-'+data.startdate.getDate(),
                "enddate" : data.enddate.getFullYear()+'-'+(data.enddate.getMonth()+1)+'-'+data.enddate.getDate(),
                "bonus" : data.bonus,
                "totalbonus" : data.totalbonus,
                "picture" : $scope.fileGambar,
                "deskripsi" : data.deskripsi
            };
            chanceChannelSrv.updateChance(dataChance).
                then(function(){
                    if (chanceChannelSrv.respon[0].status == "200"){
                        clearFields();
                        $state.go("main/channel/chance");
                        toaster.pop("succes", "Success", "Lucky chance berhasil diupdate.");
                    } else{
                        toaster.pop("error", "Failed", "Gagal disimpan.");
                    }
                },function(){
                });
        };
    	
    })
}());