(function () {
    var app = angular.module("mainApp");
    app.factory("kotaSrv", ["$http", "$q", "baseUrl",
        function ($http, $q, baseUrl) {
            var respon = [];
            var getResponse = [];
            var deferred = $q.defer();
            var trxRequest = function (methodeParams, url, httpVerb) {
                $http({
                    url: url,
                    method: httpVerb,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data: methodeParams
                })
                    .then(function (result) {

                        console.log(result.data);
                        angular.copy(result.data, respon);

                        deferred.resolve(methodeParams);
                    }, function (error) {
                        angular.copy(error.data, respon);
                        deferred.reject(methodeParams);
                    });
                return deferred.promise;
            };
            var getRequest = function (url) {
                $http({
                    url: url,
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                })
                    .then(function (result) {
                        angular.copy(result.data, getResponse);
                        deferred.resolve();
                    }, function (error) {
                        //angular.copy(error.data, getResponse);
                        deferred.reject(error);
                    });
                return deferred.promise;
            };


            var getKota = function () {
                return getRequest(baseUrl + "/api/channel/getKota");
            };
            var tambahKota = function (params) {
                return trxRequest(params, baseUrl + "/api/channel/addcity", "POST");
            };

            var editKota = function (params) {
                return trxRequest(params, baseUrl + "/api/channel/editcity", "POST");
            };
            var getData = function () {
                return getResponse;
            };
            return {
                tambahKota: tambahKota,
                editKota: editKota,
                getKota: getKota,
                respon: respon,
                getData:getData


            }
        }])
}());