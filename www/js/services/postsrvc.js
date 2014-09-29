
angular.module('PostSrvc', [])
.factory('PostService', function() {
    
    var posts = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
    
    var title = null;
        
    function loadPosts(t) {
    
        if (title != t) {
            title = t;
            console.log('Load posts for ' + title);
        }
        else {
            console.log('Posts are already loaded for ' + title);
        }

	};    

	return {
				
        get_post : function(id) {
            return posts[id-1];
        },
        
	    load_posts : loadPosts,
	    posts : posts
	    
	};
	
});

