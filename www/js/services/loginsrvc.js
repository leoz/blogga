
angular.module('LoginSrvc', [])
.factory('LoginService', function(ngLJService) {

    var mUsername  = null;
    var mPassword  = null;
    var mChallenge = null;
    var mResponse  = null;
    var mLoggedin  = false;
    
    function resetData() {
        console.log('doLogout');
		mUsername  = null;
		mPassword  = null;
		mChallenge = null;
		mResponse  = null;
		mLoggedin  = false;
    };
    
    function getLoggedin() {
        return mLoggedin;
    };
    
    function getUsername() {
        return mUsername;
    };
    
    function getChallenge() {
        return mChallenge;
    };
    
    function getResponse() {
        return mResponse;
    };
        
    function doLogin(username,password) {
        mUsername = username;
        mPassword = password;
        console.log('Doing login for ' + mUsername);
        ngLJService.get_challenge(cbGoodChallenge,cbFailChallenge);
    };
    
    function cbGoodChallenge(data,dummy) {
        console.log('cbGoodChallenge');
        if (data && data[0] && data[0].challenge) {
            mChallenge = data[0].challenge;
        	console.log('The challenge is ' + mChallenge);
        	ngLJService.login(mUsername,
        	                  mPassword,
        	                  mChallenge,
        	                  cbGoodLogin,cbFailLogin);
        }
    };
    
    function cbFailChallenge(dummy) {
        console.log('cbFailChallenge');
    };
    
    function cbGoodLogin(data,response) {
        mResponse = response;
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
        get_challenge : getChallenge,
        get_response  : getResponse,
    };
	
});

