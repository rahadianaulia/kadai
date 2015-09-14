(function(){
    angular.module("mainApp")
        .factory("pointSrv",["$http","$q","baseUrl", function($http, $q, baseUrl){
            var deferred = $q.defer();
            var pointHistories = [];

            var getHistory = function (username) {
                $http({
                    url:baseUrl +  "/api/point/historyPoint/username/" + username,
                    methode : "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(hasil){
                    angular.copy(hasil.data, pointHistories);
                    deferred.resolve();
                }, function(error){
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            var getPointHistories = function(){
                return pointHistories;
            }

            return {
                getPointHistories :getPointHistories,
                getHistory : getHistory
            }
        }])
}());