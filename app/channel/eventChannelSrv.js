(function(){
    angular.module("mainApp")
        .factory("eventChannelSrv",["$http","$q", "baseUrl" ,function($http, $q, baseUrl){

            var events = [];

            var reqEvents = function(){
                // var deferred = $q.defer();
                // $http({
                //     url:baseUrl + "/api/event/getEventsChannel/idchannel/" + $scope.idChannel ,
                //     method : "GET",
                //     headers :{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                // }).then(function(hasil){
                //     angular.copy(hasil.data,events);
                //     deferred.resolve();
                // }, function(error){
                //     deferred.reject(error);
                // });
                // return deferred.promise;
            };

            var trxReq = function(url, reqMethode, params){
                var deferred = $q.defer();
                $http({
                    url: baseUrl + url,
                    method : reqMethode,
                    headers :{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data : params
                }).then(function(result){
                    deferred.resolve(result);
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
                return trxReq("/api/event/addeventchannel", "POST", params);
            };
            var editEvent = function(params){
                return trxReq("/api/event/editevent", "PUT", params);
            };
            var deleteEvent = function (params) {
                return trxReq("/api/event/deleteEvent", "DELETE", params);
            };

            return{
                reqEvents: reqEvents,
                getEvents : getEvents,
                addEvent:addEvent,
                editEvent:editEvent,
                deleteEvent:deleteEvent
            }
        }]);
}());
