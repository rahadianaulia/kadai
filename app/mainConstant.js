(function () {
    angular.module("mainApp")
        .constant("baseUrl", "http://localhost/cafe/cafeWebApi/index.php")
        .constant("website", "http://localhost/cafe")
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })
        .constant('USER_ROLES', {
            admin: 'admin',
            mitra: 'mitra'
        })

}());