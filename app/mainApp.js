var main = angular.module("mainApp", ["ui.router","myDirective","textAngular","ui.bootstrap","toaster","ngFileUpload",
    "mgcrea.ngStrap.datepicker","ngCookies"]);
main.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state("main",{
            url:"/main",
            abstract: true,
            templateUrl : "templates/main.html"
        })
        .state("main.dashboard", {
            url : "/dashboard",
            templateUrl : "templates/dashboard.html",
            controller : "dashboardCtrl"
        })
        .state("login", {
            url : "/login",
            templateUrl : "templates/login.html",
            controller : "loginCtrl"
        })
        .state("usermanager",{
            url : "/usermanager",
            templateUrl :"templates/admin/userManager.html",
            controller : "usermanagerCtrl"
        })
        .state("usermanagerdetail",{
            url : "/usermanager/:username",
            templateUrl :"templates/admin/userManagerDetail.html",
            controller : "usermanagerDetailCtrl",
            resolve : {
                user : function($stateParams, usermanagerSrv){
                    usermanagerSrv.getUserByUsername($stateParams.username).then(
                        function () {
                            //console.log(usermanagerSrv.getUser());
                        },
                        function () {
                        }
                    )
                    return usermanagerSrv.getUser();
                }

            }
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
        .state("channelmanager.promo", {
            url : "/promo",
            templateUrl : "templates/channelmanager/promo.html",
            controller : "promoChannelManagerCtrl"
        })
        .state("channelmanager.event", {
            url : "/event",
            templateUrl : "templates/channelmanager/eventChannelManager.html",
            controller : "eventChannelManagerCtrl"
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
        .state("/admin/promo", {
            url : "/admin/promo",
            templateUrl : "templates/admin/promo.html",
            controller : "promoAdminCtrl"
        })
        .state("/admin/promo/edit", {
            url : "/admin/promo/edit/:idpromo",
            templateUrl : "templates/admin/editPromo.html",
            controller : "editPromoAdminCtrl"
        })
        .state("/admin/promo/add", {
            url : "/admin/promo/add",
            templateUrl : "templates/admin/addPromo.html",
            controller : "addPromoAdminCtrl"
        })
        .state("/admin/event",{
            url : "/admin/event",
            templateUrl : "templates/admin/event.html",
            controller : "eventCtrl"
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

main.constant("baseUrl", "http://localhost/cafe/cafeWebApi/index.php");
main.constant("website", "http://localhost/cafe");

