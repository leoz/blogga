
angular.module('AuthSrvc', [])
.factory('AuthService', function() {

    var username = null;
    var authdata = null;

    function getUsername() {
        return username;
    };

    function getAuthdata() {
        return authdata;
    };

    function setCredentials(u,p) {
        console.log('AuthService - setCredentials');
        username = u;
        authdata = p;
    };

    function clearCredentials() {
        console.log('AuthService - clearCredentials');
        username = null;
        authdata = null;
    };

    function readCredentials() {
        console.log('AuthService - readCredentials');
        setCredentials(null,null);
    };
    readCredentials();

    return{
        get_username: getUsername,
        get_authdata: getAuthdata,
        set_credentials: setCredentials,
        clear_credentials: clearCredentials,
        hasCredentials: function(){
            return (username != null);
        }
    }
});
