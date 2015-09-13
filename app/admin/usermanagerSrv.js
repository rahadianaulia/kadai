(function(){
    angular.module("mainApp")
        .factory("usermanagerSrv", ["$http", "$q", "baseUrl",function($http, $q, baseUrl){
            var deferred = $q.defer();
            var users = [];
            var user = [];

            var getUserList = function(){
                $http({
                    url : baseUrl + "/api/userinfo/listuser",
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(hasil){
                    angular.copy(hasil.data, users);
                    deferred.resolve();
                }, function(error){
                    deferred.reject(error);
                })
                return deferred.promise;
            };
            var getUserByUsername = function(params){
                $http({
                    url : baseUrl + "/api/userinfo/userprofile/username/" + params,
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(hasil){
                    angular.copy(hasil.data, user);
                    //console.log(user);
                    deferred.resolve();
                }, function(error){
                    deferred.reject(error);
                })
                return deferred.promise;
            };
            var getUsers = function(){
                return users;
            };
            var getUser = function(){
                return user;
            }

            return {
                getUsers : getUsers,
                getUser : getUser,
                getUserByUsername :getUserByUsername,
                getUserList:getUserList
            }

        }]);
}());