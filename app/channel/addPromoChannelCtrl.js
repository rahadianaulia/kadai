(function(){
    angular.module('mainApp')
    .controller('addPromoChannelCtrl', function($scope, $state, baseUrl, Upload, promoChannelSrv, toaster){
        $scope.fileGambar = "";

    	$scope.uploadGambar = function(file){
            if ( $scope.promo.picture ) {
                Upload.upload({
                    url: baseUrl + '/api/promo_channel/uploadpictpromo',
                    fileFormDataName:"picture",
                    file: file
                }).progress(function (evt) {
                    $scope.p = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.fileGambar = data.file_name;
                    $scope.message = "Upload Successful";
                }).error(function (data, status, headers, config) {
                    $scope.message = "Upload Failed";
                    alert("error");
                });
            }
        };

        $scope.savePromo = function(promo){
            var dataPromo = {
                "idchannel" : $scope.idChannel,
                "namapromo" : promo.nama,
                "awalpromo" : promo.startdate.getFullYear()+'-'+(promo.startdate.getMonth()+1)+'-'+promo.startdate.getDate(),
                "akhirpromo" : promo.enddate.getFullYear()+'-'+(promo.enddate.getMonth()+1)+'-'+promo.enddate.getDate(),
                "pict" : $scope.fileGambar,
                "content" : promo.deskripsi,
                "shortdesc" : promo.shortdesc
            };

            promoChannelSrv.addPromo(dataPromo).
            then(function(){
                if (promoChannelSrv.respon[0].status == "200"){
                    toaster.pop("succes", "Success", "Promo berhasil ditambah.");
                    $state.go("main/channel/promo");
                } else {
                    toaster.pop("error", "Failed", "Gagal disimpan.");
                }
            }, function(){
                toaster.pop("error", "Failed", "Gagal disimpan.");
            });
        }
    })
}());