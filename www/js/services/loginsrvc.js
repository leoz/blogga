
angular.module('LoginSrvc', [])
.factory('LoginService', function(ngLJService) {

    var mUsername  = null;
    var mPassword  = null;
    var mData      = null;
    var mGroups    = [];
    var mFriends   = [];
    
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
        
		//FIXME
		for(var i in data[0].usejournals) {
			mGroups.push(data[0].usejournals[i]);
		}
                
        console.log('cbGoodLogin');
        console.log(mData);
        
    	ngLJService.get_friends(mUsername,
    	                        mPassword,
    	                        cbGoodFriends,cbFailFriends);
        
    };
    
    function cbGoodFriends(data,response) {
		//FIXME
		for(var i in data[0].friends) {
			mFriends.push(data[0].friends[i]);
		}

        console.log('cbGoodFriends');
        console.log(data);
    };
    
    function cbFailFriends(err) {
        console.log('cbFailFriends: ' + err);
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
    
    function hasFriends() {
    	return (mFriends.length > 0);
    };
    
    function hasGroups() {
    	return (mGroups.length > 0);
    };
            
    return {
        friends       : mFriends,
        groups        : mGroups,
        data          : mData,
        do_login      : doLogin,
        do_logout     : doLogout,
        get_loggedin  : getLoggedin,
        get_username  : getUsername,
        get_password  : getPassword,
        get_avatar    : getAvatar,
        get_name      : getName,
        has_friends   : hasFriends,
        has_groups    : hasGroups
    };
	
});

