
angular.module('PostSrvc', [])
.factory('PostService', function(LJService) {
    
    var posts = [];
    
    var title = null;
    var count = 10;
    var last_date = null;
        
    function loadPosts(t) {
    
        if (title != t) {
            title = t;
            console.log('Load posts for ' + title);
            getPosts();
        }
        else {
            console.log('Posts are already loaded for ' + title);
        }

	};
	  
    function getPosts() {
        posts.length = 0;        
        LJService.get_events(count,title,last_date,cbGoodEvents,cbFailEvents,title);    
	};
	
    function cbGoodEvents(data,title) {
        console.log('cbGoodEvents for ' + title);
        
        for (var i = 0; i < data[0].events.length; i++) {
            posts.push(data[0].events[i]);
            console.log(data[0].events[i]);
        }        
    };
    
    function cbFailEvents(title) {
        console.log('cbFailEvents for ' + title);
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
        
	    load_posts : loadPosts,
	    posts : posts
	    
	};
	
});

