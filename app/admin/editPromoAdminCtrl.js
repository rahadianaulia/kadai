(function(){
    angular.module('mainApp')
    .controller('editPromoAdminCtrl', function($scope, $http, $stateParams, $state, baseUrl, website, promoSrv, toaster, Upload){
    	var idPromo = $stateParams.idpromo;
        $scope.fileGambar = "";

        var getDetail = function(){
            $http.get(baseUrl + "/api/promo_admin/getpromobyid/idpromo/" + idPromo)
            .then(function(result){
                $scope.picture = website + '/promo/' + result.data[0].pict;
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
                    url: baseUrl + '/api/promo_admin/uploadpictpromo',
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
                "idpromo" : idPromo,
                "namapromo" : promo.nama,
                "awalpromo" : promo.startdate.getFullYear()+'-'+(promo.startdate.getMonth()+1)+'-'+promo.startdate.getDate(),
                "akhirpromo" : promo.enddate.getFullYear()+'-'+(promo.enddate.getMonth()+1)+'-'+promo.enddate.getDate(),
                "pict" : $scope.fileGambar,
                "content" : promo.deskripsi,
                "shortdesc" : promo.shortdesc
            };
            
            promoSrv.updatePromo(dataPromo).
            then(function(){
                if (promoSrv.respon[0].status == "200"){
                    toaster.pop("succes", "Success", "Promo berhasil diupdate.");
                    $state.go("/admin/promo");
                } else{
                    toaster.pop("error", "Failed", "Gagal disimpan.");
                }
            }, function(){
                toaster.pop("error", "Failed", "Gagal disimpan.");
            })
        };
    })
}());