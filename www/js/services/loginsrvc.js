
angular.module('LoginSrvc', [])
.factory('LoginService', function(ngLJService) {

    var mUsername  = null;
    var mPassword  = null;
    var mLoggedin  = false;
    
    function resetData() {
        console.log('doLogout');
		mUsername  = null;
		mPassword  = null;
		mLoggedin  = false;
    };
    
    function getLoggedin() {
        return mLoggedin;
    };
    
    function getUsername() {
        return mUsername;
    };
    
    function getPassword() {
        return mPassword;
    };
        
    function doLogin(username,password) {
        mUsername = username;
        mPassword = password;
        console.log('Doing login for ' + mUsername);
    	ngLJService.do_login(mUsername,
    	                     mPassword,
    	                     cbGoodLogin,cbFailLogin);

    };
        
    function cbGoodLogin(data,response) {
        mLoggedin = true;
        console.log('cbGoodLogin');
    };
    
    function cbFailLogin(err) {
        console.log('cbFailLogin: ' + err);
    };
    
    function doLogout() {
        console.log('doLogout');
    	resetData();
    };
    
    return {
        do_login      : doLogin,
        do_logout     : doLogout,
        get_loggedin  : getLoggedin,
        get_username  : getUsername,
        get_password  : getPassword,
    };
	
});

