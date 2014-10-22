
angular.module('LoginSrvc', [])
.factory('LoginService', function(ngLJService) {

    var mUsername  = null;
    var mPassword  = null;
    var mData      = null;
    
    function resetData() {
        console.log('doLogout');
		mUsername  = null;
		mPassword  = null;
		mData      = null;
    };
    
    function getLoggedin() {
        return (mData != null);
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
        mData = data[0];
        console.log('cbGoodLogin');
        console.log(mData);
    };
    
    function cbFailLogin(err) {
        console.log('cbFailLogin: ' + err);
    };
    
    function doLogout() {
        console.log('doLogout');
    	resetData();
    };
    
    function getAvatar() {
    	return mData ? mData.defaultpicurl : '';
    };
    
    function getName() {
    	return mData ? mData.fullname : '';
    };
    
    return {
        data          : mData,
        do_login      : doLogin,
        do_logout     : doLogout,
        get_loggedin  : getLoggedin,
        get_username  : getUsername,
        get_password  : getPassword,
        get_avatar    : getAvatar,
        get_name      : getName
    };
	
});

