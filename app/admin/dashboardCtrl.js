(function () {
    angular.module('mainApp')
        .controller('dashboardCtrl', ["$scope", "Upload", "baseUrl", "$http", function ($scope, Upload, baseUrl, $http) {
            $scope.judul = "Dashboard";

            var getTotalUser = function() {
                $http.get(baseUrl + "/api/dashboard/totaluser").then(
                function(result){
                    $scope.totalUser = result.data[0].total_user;
                },function(error){
                });
            }; getTotalUser();

            var getTotalChannel = function(){
                $http.get(baseUrl + "/api/dashboard/totalchannel").then(
                    function(result){
                        $scope.totalChannel = result.data[0].total_channel;
                    }, function(error){

                    });
            }; getTotalChannel();

            $scope.view = function (tanggal) {
                console.log(tanggal.getDate() + '-' + tanggal.getMonth() + '-' + tanggal.getFullYear());
            };

            $scope.submit = function () {
                if ($scope.myForm.file.$valid && $scope.file && !$scope.file.$error) {
                    $scope.upload($scope.file);
                } else {

                }
            };
            $scope.status = {
                opened: false
            };
            $scope.upload = function (file) {
                Upload.upload({
                    url: baseUrl + '/api/channel/uploadlogo',
                    fileFormDataName: "logochannel",
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
                    alert("OK");
                }).error(function (data, status, headers, config) {
                    alert("error");
                    console.log('error status: ' + JSON.stringify(data));
                })
            };

            $scope.open = function ($event) {
                $scope.status.opened = true;
            };
            $scope.formats = ['dd MMMM yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        }])
}());