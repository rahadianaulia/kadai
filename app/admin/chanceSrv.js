(function(){
    var app = angular.module("mainApp");
    app.factory("chanceSrv",["$http","$q", "baseUrl",function($http, $q, baseUrl){
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

        var addChance = function(params){
          return request(params, baseUrl + "/api/chance_admin/saveChance");
        };

        var updateChance = function(params){
            return request(params, baseUrl + "/api/chance_admin/editchance")
        };

        return {
            addChance : addChance,
            updateChance : updateChance,
            respon : respon
        }

    }]);
}());