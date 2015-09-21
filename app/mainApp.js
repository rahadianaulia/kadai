var main = angular.module("mainApp", ["ui.router","myDirective","textAngular","ui.bootstrap","toaster","ngFileUpload",
    "mgcrea.ngStrap.datepicker","ngCookies"]);
main.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/main/dashboard");
    $stateProvider
        .state("login",{
            url:"/login",
            templateUrl:"templates/login.html",
            controller:"loginCtrl"
        })
        .state("main",{
            url:"/main",
            abstract: true,
            templateUrl : "templates/main.html",
            data:{
                "roles" : "mitra"
            }
        })
        .state("main.dashboard", {
            url : "/dashboard",
            templateUrl : "templates/dashboard.html",
            controller : "dashboardCtrl"
        })
        .state("main.usermanager",{
            url : "/usermanager",
            templateUrl :"templates/admin/userManager.html",
            controller : "usermanagerCtrl"
        })
        .state("main.usermanagerdetail",{
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
        .state("main.channelmanager", {
            url : "/channelmanager",
            templateUrl : "templates/channelmanager/channel.html",
            controller : "channelCtrl"
        })
        .state("main.channelmanager.kota", {
            url: "/channelmanager/kota",
            parent:"main",
            templateUrl: "templates/channelmanager/kota.html",
            controller: "kotaCtrl"
        })

        .state("main.channelmanager.add", {
            url: "/channelmanager/add",
            parent:"main",
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
        .state("main.channelmanager.detail", {
            url: "/channelmanager/detail/:idChannel",
            parent : "main",
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
        .state("admin", {
            url : "/admin",
            abstract:true,
            templateUrl : "templates/main.html",
            data : {"roles" : "admin"}
        })
        .state("admin.chance", {
            url : "/chance",
            parent:"admin",
            templateUrl : "templates/admin/chance.html",
            controller : "chanceCtrl",
        })
        .state("admin.chance.add", {
            url : "/chance/add",
            parent:"admin",
            templateUrl : "templates/admin/addChance.html",
            controller : "addChanceCtrl"
        })
        .state("admin.chance.edit", {
            url : "/chance/edit/:idchance",
            parent:"admin",
            templateUrl : "templates/admin/editChance.html",
            controller : "editChanceCtrl"
        })
        .state("admin.promo", {
            url : "/promo",
            templateUrl : "templates/admin/promo.html",
            controller : "promoAdminCtrl"
        })
        .state("admin.promo.edit", {
            url : "/promo/edit/:idpromo",
            parent:"admin",
            templateUrl : "templates/admin/editPromo.html",
            controller : "editPromoAdminCtrl"
        })
        .state("admin.promo.add", {
            url : "/promo/add",
            parent:"admin",
            templateUrl : "templates/admin/addPromo.html",
            controller : "addPromoAdminCtrl"
        })
        .state("admin.event",{
            url : "/event",
            templateUrl : "templates/admin/event.html",
            controller : "eventCtrl"
        })
}]);

main.run(["$rootScope","$window","$cookies","$state", function($rootScope, $window, $cookies,$state){
    $rootScope.$on('$locationChangeSuccess', function(e, newURL, OldURL){

    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        var role = toState.data.roles;
        var userInfo = $cookies.getObject("userInfo");
        if(role != userInfo.level){
            event.preventDefault();
            alert("You not have access to this app");
            $state.go(fromState);

        }
        //console.log(userInfo);
    });
}]);


