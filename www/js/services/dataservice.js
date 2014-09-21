
angular.module('DataService', []).factory('Data', function() {

    var journals = [
        { title: 'Journal A', id: 1 },
        { title: 'Journal B', id: 2 },
        { title: 'Journal XX', id: 3 },
        { title: 'Journal XXX', id: 4 },
        { title: 'Some other', id: 5 },
        { title: 'Last', id: 6 }
    ];
    
    var cur_journal = 4;
    
    var posts = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];    

	return {
	
        get_journal : function(id) {
            return journals[id-1];
        },
	
        get_post : function(id) {
            return posts[id-1];
        },
        
	    journals : journals,
	    cur_journal : cur_journal,
	    posts : posts
	    
	};
	
});

