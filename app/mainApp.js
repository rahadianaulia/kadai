var main = angular.module("mainApp", ["ui.router","myDirective","textAngular","ui.bootstrap","toaster","ngFileUpload",
    "mgcrea.ngStrap.datepicker","ngCookies"]);
main.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/main/dashboard");
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
        .state("main.usermanager",{
            url : "/usermanager",
            templateUrl :"templates/admin/userManager.html",
            controller : "usermanagerCtrl",
            data : {
                "roles" : "admin"
            }
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

        // .state("channelmanager",{
        //         url:"/channelmanager",
        //         abstract : true,
        //         template : "<ui-view/>"
        // })
        .state("/main/channelmanager/kota", {
            url: "/channelmanager/kota",
            parent:"main",
            templateUrl: "templates/channelmanager/kota.html",
            controller: "kotaCtrl"
        })
        .state("/main/channelmanager/channel", {
            url : "/channelmanager/channel",
            parent: "main",
            templateUrl : "templates/channelmanager/channel.html",
            controller : "channelCtrl"
        })
        .state("/main/channelmanager/promo", {
            url : "/channelmanager/promo",
            parent: "main",
            templateUrl : "templates/channelmanager/promo.html",
            controller : "promoChannelManagerCtrl"
        })
        .state("/main/channelmanager/event", {
            url : "/channelmanager/event",
            parent: "main",
            templateUrl : "templates/channelmanager/eventChannelManager.html",
            controller : "eventChannelManagerCtrl"
        })
        .state("/main/channelmanager/channel/add", {
            url: "/channelmanager/channel/add",
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
        .state("/main/admin/chance", {
            url : "/admin/chance",
            parent:"main",
            templateUrl : "templates/admin/chance.html",
            controller : "chanceCtrl"
        })
        .state("main/admin/chance/add", {
            url : "/admin/chance/add",
            parent:"main",
            templateUrl : "templates/admin/addChance.html",
            controller : "addChanceCtrl"
        })
        .state("main/admin/chance/edit", {
            url : "/admin/chance/edit/:idchance",
            templateUrl : "templates/admin/editChance.html",
            controller : "editChanceCtrl"
        })
        .state("main/admin/promo", {
            url : "/admin/promo",
            parent:"main",
            templateUrl : "templates/admin/promo.html",
            controller : "promoAdminCtrl"
        })
        .state("main/admin/promo/edit", {
            url : "/admin/promo/edit/:idpromo",
            parent: "main",
            templateUrl : "templates/admin/editPromo.html",
            controller : "editPromoAdminCtrl"
        })
        .state("main/admin/promo/add", {
            url : "/admin/promo/add",
            parent: "main",
            templateUrl : "templates/admin/addPromo.html",
            controller : "addPromoAdminCtrl"
        })
        .state("main/admin/event",{
            url : "/admin/event",
            parent: "main",
            templateUrl : "templates/admin/event.html",
            controller : "eventCtrl"
        })
}]);

main.run(["$rootScope","$window","$cookies","$state", "$location", function($rootScope, $window, $cookies, $state, $location){
    $rootScope.$on('$locationChangeSuccess', function(e, newURL, OldURL){     
        // if (newURL != OldURL){
        //     e.preventDefault();
        //     $window.location.reload();
        // }
        // $route.reload();
    });

    // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    //     var role = toState.data;
    //     console.log(role);
    //     var userInfo = $cookies.getObject("userInfo");
    //     if (userInfo != null){
    //         console.log(userInfo);
    //         if (role != userInfo.level){
    //             // event.preventDefault();
    //             alert("you not have access to this app");
    //             $state.go("login");
    //         }
    //     }
    // });

    // $rootScope.$on('$locationChangeStart', function (event, next, current, toState){
    //     var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    //     var loggedIn = $cookies.getObject("userInfo");
    //     if (restrictedPage && !loggedIn){
    //         $state.go("login");
    //     }
    // });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $cookies.getObject("userInfo");
        if (restrictedPage && !loggedIn){
            event.preventDefault();
            $state.go("login");
        }
      });
}]);

main.constant("baseUrl", "http://localhost/cafe/cafeWebApi/index.php");
main.constant("website", "http://localhost/cafe");

