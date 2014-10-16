
angular.module('AvatarSrvc', [])
.factory('AvatarService', function(ngLJService) {
    
    var avatars = [];
    var def = 'img/ios7-person.png';
    
    function getPosterName(o) {
    	if (o) {
    		if (o.poster) {
    			return o.poster;
    		}
    		if (o.postername) {
    			return o.postername;
    		}
    	}
    	return null;
    };
    
    function loadAvatar(post,failCallback) {

        if (post && post.poster_userpic_url) {
            post.$$avatar = post.poster_userpic_url;
        }
        else {
		    var n = getPosterName(post);
		    if (n) {
			    var data = getAvatarData(n);
			    if (!data) {
				    if (!failCallback) {
					    failCallback = cbFailUserpics;
				    }
		            ngLJService.get_userpics(n,cbGoodUserpics,failCallback,post);    
		        }
		        else {
		            setAvatar(data,post);
		        }		
		    }
        }    
    };
    
    function setAvatar(data,post) {
		var n = getPosterName(post);
    	if (post) {
    		if (post.props && post.props.picture_keyword) {
    			if (data.pickws) {    			
					ngLJService.array_buffer_to_string(post.props.picture_keyword).then(
						function (v) {
							post.props.picture_keyword = v;							
							for (var i in data.pickws) {
								if (data.pickws[i] == post.props.picture_keyword) {
									post.$$avatar = data.pickwurls[i];
									break;
								}
							}							
						});
    			
    			}
    			else {
    				post.$$avatar = def;
    			}
    		}
    		else if (data.defaultpicurl) {
    			post.$$avatar = data.defaultpicurl;
    		}
    		else {
    			post.$$avatar = def;
    		}
    	}
	};
    
    function cbGoodUserpics(data,post) {
    	if (!data || !data[0]) {
    		throw 'Invalid icon data';
    	}
    	// Store avatar
		var n = getPosterName(post);
		var d = getAvatarData(n);
		if (!d) {
		    var avatar = {
		        name : n,
		        data : data[0]
		    };
		    if (avatar.data.pickws && avatar.data.pickws.length > 0) {
		        for (var i in avatar.data.pickws) {
                    var pos = 0;
				    ngLJService.array_buffer_to_string(avatar.data.pickws[i]).then(
					    function (v) {
						    avatar.data.pickws[pos] = v;
					        pos++;
					        if (pos == avatar.data.pickws.length) {
                            	avatars.push(avatar);
                            	console.log('cbGoodUserpics - cache size ' + avatars.length);
			                    setAvatar(avatar.data,post);
                            }
					    });		    
		        }
		    }
		    else {
            	avatars.push(avatar);
                console.log('cbGoodUserpics - cache size ' + avatars.length);
                setAvatar(avatar.data,post);
		    }
		}
		else {
            setAvatar(d,post);
		}
    };
    
    function cbFailUserpics(post) {
    };     
    
	function getAvatarData(name) {
		for(var i in avatars) {			
			if(avatars[i].name == name) {
				return avatars[i].data;
			}
		}
		return null;
	};       
    
    return {
        avatars     : avatars,
        load_avatar : loadAvatar
    };
	
});


