
angular.module('PostSrvc', [])
.factory('PostService', function(LJService) {
    
    var posts = [];
    
    var title = null;
    var count = 7; // Minimum count is 4 (seems to be a bug in LJ)
    var load_more = true;
    
    function setTitle(t) {
    	title = t;
    	posts.length = 0;    
    	load_more = true;
        console.log('Load posts for ' + title);
	};
	
    function canLoadMore() {
    	return load_more;
	};
	
    function loadPosts(callback) {
    
    	var last_date = '';
    	
		if(posts.length) {
			last_date = posts[posts.length - 1].eventtime;
		}
		
        LJService.get_events(count,title,last_date,cbGoodEvents,cbFailEvents,callback);
	};
	
    function cbGoodEvents(data,callback) {
    
        console.log('cbGoodEvents: ' + data[0].events.length);
        
        if (!data[0].events.length) {
        	load_more = false;
        }
        
        for (var i = 0; i < data[0].events.length; i++) {
			posts.push(data[0].events[i]);
        }
        
        if (callback) {
        	callback();
        }
        
    };
    
    function cbFailEvents(callback) {
    
        console.log('cbFailEvents');
        
        if (callback) {
        	callback();
        }
        
    };	   

	return {
				
        get_post : function(id) {
			for(var i in posts) {			
				if(posts[i].itemid == id) {
					return posts[i];
				}
			}
			return null;
        },
        
	    set_title : setTitle,
	    load_posts : loadPosts,
	    can_load_more : canLoadMore,
	    posts : posts
	};
	
});

