
angular.module('AvatarSrvc', [])
.factory('AvatarService', function(ngLJService,LoginService) {
    
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
    		if (o.username) {
    			return o.username;
    		}
    	}
    	return null;
    };
    
    function setUrl(post,url) {
        post.$$avatar = url;
        post.$$avatar_loaded = true;
    };
    
    function loadAvatar(post,failCallback) {

        if (!post.$$avatar_loaded) {
            if (post && post.poster_userpic_url) {
                setUrl(post,post.poster_userpic_url);
            }
            else {
		        var n = getPosterName(post);
		        if (n) {
			        var data = getAvatarData(n);
			        if (!data) {
				        if (!failCallback) {
					        failCallback = cbFailUserpics;
				        }
		                ngLJService.get_userpics(n,cbGoodUserpics,failCallback,post,
											     LoginService.get_username(),
											     LoginService.get_password());    
		            }
		            else {
		                setAvatar(data,post);
		            }		
		        }
            }
        }  
    };
    
    function setAvatar(data,post) {
    	if (post) {
    		if (post.props && post.props.picture_keyword) {
    			if (data.pickws) {    			
					post.props.picture_keyword = ngLJService.decode_array_buffer(post.props.picture_keyword);							
					for (var i in data.pickws) {
						if (data.pickws[i] == post.props.picture_keyword) {
						    setUrl(post,data.pickwurls[i]);
							break;
						}
					}    			
    			}
    			else {
    			    setUrl(post,def);
    			}
    		}
    		else if (data.defaultpicurl) {
    		    setUrl(post, data.defaultpicurl);
    		}
    		else {
                setUrl(post,def);
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
				    avatar.data.pickws[i] = ngLJService.decode_array_buffer(avatar.data.pickws[i]);
		        }
		        
            	avatars.push(avatar);
            	console.log('cbGoodUserpics - cache size ' + avatars.length);
                setAvatar(avatar.data,post);		        
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


