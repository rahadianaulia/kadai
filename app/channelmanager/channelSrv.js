(function(){
    var app = angular.module("mainApp");
    app.factory("channelSrv",["$http","$q", "baseUrl",function($http, $q, baseUrl){
        var response=[];
        var listChannel = [];
        var channel = [];
        var deferred = $q.defer();

        var trxRequest = function(methodeParams, url, httpVerb){
            $http({
                url: url,
                method: httpVerb,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data: methodeParams
            })
                .then(function (result){
                    console.log(result.data);
                    angular.copy(result.data, response);
                    deferred.resolve(methodeParams);
                }, function (error) {

                    deferred.reject(methodeParams);
                });
            return deferred.promise;
        };
        var getRequest = function( url){
            $http({
                url: url,
                method: "GET",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then(function (result){
                    angular.copy(result.data, listChannel);
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        var getChannels = function () {
            return getRequest(baseUrl + "/api/channel/getchannel");
        };
        var getChannelById = function(idChannel){
            $http({
                url: baseUrl + "/api/channel/getChannelById?idchannel=" + idChannel,
                method: "GET",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
                .then(function (result){
                    var obj =[];
                    angular.copy(result.data, obj);
                    channel.id_channel = obj[0].id_channel;
                    channel.nama_channel = obj[0].nama_channel;
                    channel.kota = {"id_kota" : obj[0].id_kota, "nama_kota" : obj[0].nama_kota};
                    channel.deskripsi = obj[0].deskripsi;
                    channel.user = obj[0].user;
                    channel.password = obj[0].password;
                    channel.alamat = obj[0].alamat;
                    channel.hp = obj[0].hp;
                    channel.email = obj[0].email;
                    channel.logo = obj[0].logo;

                    deferred.resolve();
                },function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;

        }
        var editChannel = function(params){
            return trxRequest(params, baseUrl + "/api/channel/updateChannel", "PUT")
        }

        var addChannel = function(params){
            return trxRequest(params, baseUrl + "/api/channel/addChannel", "POST")
        }

        var objChannel = function(){
            return channel;
        };
        var listObjChannel = function(){
            return listChannel;
        }

        return {

            response : response,
            getChannel : getChannels,
            addChannel :addChannel,
            getChannelById : getChannelById,
            objChannel:objChannel,
            listObjChannel:listObjChannel,
            editChannel : editChannel
        }

    }]);
}());