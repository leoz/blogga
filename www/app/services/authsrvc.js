
angular.module('AuthSrvc', ['ngLogExt'])
.factory('AuthService', ['$log', function($log) {

    var log = $log.context('Auth');

    var loggedin = false;
    var username = null;
    var authdata = null;

    function getLoggedIn() {
        return loggedin;
    };

    function setLoggedIn(s) {
        loggedin = s;
    };

    function getUsername() {
        return username;
    };

    function getAuthdata() {
        return authdata;
    };

    function setCredentials(u,p) {
        log.debug('setCredentials');
        loggedin = false;
        username = u;
        authdata = p;
    };

    function clearCredentials() {
        log.debug('clearCredentials');
        loggedin = false;
        username = null;
        authdata = null;
    };

    function readCredentials() {
        log.debug('readCredentials');
        setCredentials(null,null);
    };
    readCredentials();

    return{
        get_logged_in: getLoggedIn,
        set_logged_in: setLoggedIn,
        get_username: getUsername,
        get_authdata: getAuthdata,
        set_credentials: setCredentials,
        clear_credentials: clearCredentials,
        hasCredentials: function(){
            return (username != null);
        }
    }
}]);
