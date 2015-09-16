(function(){
    angular.module("mainApp")
        .factory("eventSrv",["$http","$q", "baseUrl",function($http, $q, baseUrl){

            var events = [];
            var trxResponse = [];
            var reqEvents = function(){
                var deferred = $q.defer();
                $http({
                    url:baseUrl + "/api/event/getEvents",
                    method : "GET",
                    headers :{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(hasil){
                    angular.copy(hasil.data,events);
                    deferred.resolve();
                }, function(error){
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            var trxReq = function(url, reqMethode, params){
                var deferred = $q.defer();
                $http({
                    url: baseUrl + url,
                    method : reqMethode,
                    headers :{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data : params
                }).then(function(hasil){
                    //console.log("Params : " +  JSON.stringify(params));
                    angular.copy(hasil.data,trxResponse);
                    console.log(trxResponse);

                    deferred.resolve();
                }, function(error){
                    console.log("SRV Error : " + JSON.stringify(error));
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            var getEvents = function(){
                return events;
            };
            var addEvent = function(params){
                return trxReq("/api/event/addevent", "POST", params);
            };
            var editEvent = function(params){
                return trxReq("/api/event/editevent", "PUT", params);
            };
            return{
                reqEvents: reqEvents,
                trxResponse:trxResponse,
                getEvents : getEvents,
                addEvent:addEvent,
                editEvent:editEvent
            }
        }]);
}());
