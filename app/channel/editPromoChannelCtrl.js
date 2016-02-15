(function(){
    angular.module('mainApp')
    .controller('editPromoChannelCtrl', function($scope, $http, $stateParams, $state, baseUrl, website, promoChannelSrv, toaster, Upload){
    	var idPromo = $stateParams.idpromo;
        $scope.fileGambar = "";

        var getDetail = function(){
            $http.get(baseUrl + "/api/promo_channel/getpromobyid/idpromo/" + idPromo + "/idchannel/" + $scope.idChannel)
            .then(function(result){
                $scope.picture = website + '/promo_channel/' + result.data[0].pict;
                $scope.promo = {
                    nama : result.data[0].nama_promo,
                    startdate : new Date(result.data[0].awal_promo),
                    enddate : new Date(result.data[0].akhir_promo),
                    shortdesc : result.data[0].short_desc,
                    deskripsi : result.data[0].content
                };
            }, function(error){

            });
        }; getDetail();

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

        $scope.updatePromo = function(promo){
            var dataPromo = {
                "idchannel" : $scope.idChannel,
                "idpromo" : idPromo,
                "namapromo" : promo.nama,
                "awalpromo" : promo.startdate.getFullYear()+'-'+(promo.startdate.getMonth()+1)+'-'+promo.startdate.getDate(),
                "akhirpromo" : promo.enddate.getFullYear()+'-'+(promo.enddate.getMonth()+1)+'-'+promo.enddate.getDate(),
                "pict" : $scope.fileGambar,
                "content" : promo.deskripsi,
                "shortdesc" : promo.shortdesc
            };
            
            promoChannelSrv.updatePromo(dataPromo).
            then(function(){
                if (promoChannelSrv.respon[0].status == "200"){
                    toaster.pop("succes", "Success", "Promo berhasil diupdate.");
                    $state.go("main/channel/promo");
                } else{
                    toaster.pop("error", "Failed", "Gagal disimpan.");
                }
            }, function(){
                toaster.pop("error", "Failed", "Gagal disimpan.");
            })
        };
    })
}());