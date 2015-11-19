(function(){
    angular.module("mainApp")
        .factory("loginSrv",["$http","$q","baseUrl",function($http,$q, baseUrl){
            var login = function(user){
                var deferred = $q.defer();
                $http({
                    url: baseUrl + "/api/webuser/login",
                    method:"POST",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data :{
                        "username": user.username,
                        "password" : user.password
                    }
                }).then(function(hasil){
                    //console.log(hasil);
                    deferred.resolve(hasil);
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            };

            var logout = function(){
                var deferred = $q.defer();
                $http({
                    url:baseUrl + "/api/webuser/logout",
                    method : "get"
                }).then(
                    function(hasil){
                        deferred.resolve(hasil.data);
                    },
                    function(err){
                        deferred.reject(err);
                });
                return deferred.promise;
            }

            return{
                login:login,
                logout:logout
            }
        }])
}());