(function(){
    var app = angular.module("mainApp");
    app.factory("promoChannelSrv",["$http","$q", "baseUrl",function($http, $q, baseUrl){
        var respon=[];
        var request = function(methodeParams, url){
            var deferred = $q.defer();
            $http({
                url: url,
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: methodeParams
            })
                .then(function (result){
                    angular.copy(result.data, respon);
                    deferred.resolve();
                }, function (result) {
                    angular.copy(result.data, respon);
                    deferred.reject();
                });
            return deferred.promise;
        };

        var updatePromo = function(params){
          return request(params, baseUrl + "/api/promo_channel/editpromo");
        };

        var addPromo = function(params){
            return request(params, baseUrl + "/api/promo_channel/addpromo")
        }

        return {
            updatePromo : updatePromo,
            addPromo : addPromo,
            respon : respon
        }

    }]);
}());