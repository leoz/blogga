
angular.module('AvatarSrvc', [])
.factory('AvatarService', function(LJService) {
    
    var avatars = [];
    var def = 'img/ios7-person.png';
    
    function loadAvatar(name,failCallback) {
		console.log('loadAvatar for ' + name);
		
		if (!hasAvatar(name)) {
			if (!failCallback) {
				failCallback = cbFailUserpics;
			}
            LJService.get_userpics(name,cbGoodUserpics,failCallback,name);    
        }
        else {
            console.log('loadAvatar - already found for ' + name);
        }
    };
    
    function cbGoodUserpics(data,name) {
    	if (!data || !data[0] || !data[0].defaultpicurl) {
    		throw 'Invalid icon data';
    	}
        var avatar = {
            name : name,
            url  : def
        };
        if (data[0].defaultpicurl) {
        	avatar.url = data[0].defaultpicurl;
        }
        avatars.push(avatar);
        console.log('cbGoodUserpics for ' + avatar.name + ' ' + avatar.url);
		console.log('cbGoodUserpics cache size ' + avatars.length);
    };
    
    function cbFailUserpics(name) {
        console.log('cbFailUserpics for ' + name);
    };
    
	function hasAvatar(name) {
		for(var i in avatars) {			
			if(avatars[i].name == name) {
				return true;
			}
		}
		return false;
	};       
    
	function getAvatar(name) {
		for(var i in avatars) {			
			if(avatars[i].name == name) {
				return avatars[i].url;
			}
		}
		return def;
	};       
    
    return {
        avatars     : avatars,
        load_avatar : loadAvatar,
        get_avatar  : getAvatar
    };
	
});


