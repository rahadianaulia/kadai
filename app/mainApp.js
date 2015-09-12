var main = angular.module("mainApp", ["ui.router","myDirective","textAngular","ui.bootstrap","toaster","ngFileUpload"]);
main.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state("/dashboard", {
            url : "/dashboard",
            templateUrl : "templates/dashboard.html",
            controller : "dashboardCtrl"
        })
        .state("channelmanager",{
                url:"/channelmanager",
                abstract : true,
                template : "<ui-view/>"
            })
            .state("channelmanager.kota", {
                url: "/kota",
                templateUrl: "templates/channelmanager/kota.html",
                controller: "kotaCtrl"
            })
            .state("channelmanager.channel", {
                url : "/channel",
                templateUrl : "templates/channelmanager/channel.html",
                controller : "channelCtrl"
            })
            .state("channelmanager.channel.add", {
                url: "/channel/add",
                parent:"channelmanager",
                templateUrl: "templates/channelmanager/addChannel2.html",
                controller: "addChannelCtrl",
                resolve: {
                    optKota: function (kotaSrv) {
                        var init = function () {
                            kotaSrv.getKota().then(function () {
                            }, function () {
                            });
                        };
                        init();
                        return kotaSrv.getData();
                    }
                }

            })
            .state("channelmanager.channel.detail", {
                url: "/channel/detail/:idChannel",
                parent : "channelmanager",
                templateUrl: "templates/channelmanager/channelDetail.html",
                controller: "channelProfileCtrl",
                resolve: {
                    optKota: function (kotaSrv) {
                        var init = function () {
                            kotaSrv.getKota().then(function () {
                            }, function () {
                            });
                        };
                        init();
                        return kotaSrv.getData();
                    },
                    channel : function(channelSrv, $stateParams){
                        channelSrv.getChannelById($stateParams.idChannel).then(
                            function(){
                            },function(){}
                        )
                        return channelSrv.objChannel();
                    }
                }
            })
        .state("/event",{
            url : "/event",
            templateUrl : "templates/admin/event.html",
            controller : "eventCtrl"
        })
        .state("userManager", {
            url : "/userManager",
            templateUrl : "templates/admin/userManager.html",
            controller : "userManagerCtrl"
        })
		.state("/kota", {
            url : "/kota",
            templateUrl : "templates/channelmanager/kota.html",
            controller : "kotaCtrl"
        })
        .state("/admin/chance", {
            url : "/admin/chance",
            templateUrl : "templates/admin/chance.html",
            controller : "chanceCtrl"
        })
        .state("/admin/chance/add", {
            url : "/admin/chance/add",
            templateUrl : "templates/admin/addChance.html",
            controller : "addChanceCtrl"
        })
        .state("/admin/chance/edit", {
            url : "/admin/chance/edit/:idchance",
            templateUrl : "templates/admin/editChance.html",
            controller : "editChanceCtrl"
        })
}]);

main.run(["$rootScope","$window", function($rootScope, $window){
    $rootScope.$on('$locationChangeSuccess', function(e, newURL, OldURL){     
        // if (newURL != OldURL){
        //     e.preventDefault();
        //     $window.location.reload();
        // }
        // $route.reload();
    });
}]);

main.constant("baseUrl", "http://localhost:8080/cafe/cafeWebApi/index.php");
main.constant("website", "http://localhost:8080/cafe");

