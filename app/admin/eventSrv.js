(function(){
    angular.module("mainApp")
        .factory("eventSrv",["$http","$q", "baseUrl",function($http, $q, baseUrl){
            var deferred = $q.defer();
            var events = [];
            var reqEvents = function(){
                $http({
                    url:baseUrl + "/api/event/getEvents",
                    methode : "GET",
                    header :{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(hasil){
                    angular.copy(hasil.data,events);
                    deferred.resolve();
                }, function(error){
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            var getEvents = function(){
                return events;
            };
            return{
                reqEvents: reqEvents,
                getEvents : getEvents
            }
        }]);
}());
