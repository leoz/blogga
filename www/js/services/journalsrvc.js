
angular.module('JournalSrvc', []).factory('JournalService', function() {

    var journals = [
        { title: 'Journal A'  , id: 1 },
        { title: 'Journal B'  , id: 2 },
        { title: 'Journal XX' , id: 3 },
        { title: 'Journal XXX', id: 4 },
        { title: 'Some other' , id: 5 },
        { title: 'Last'       , id: 6 }
    ];
    
    var last_journal = 6;
    
    var cur_journal = 4;
    
	return {
	
        get_journal : function(id) {
            return journals[id-1];
        },
        
        add_journal : function(journal) {
        	if (!journal.id) {
        		last_journal++;
        		journal.id = last_journal;
        	}
			journals.push(journal);
        },
        
		delete_journal : function(journal) {
			journals.splice(journals.indexOf(journal), 1);
		},      
        
		has_journal : function(title) {
			for(var i in journals) {			
				if(journals[i].title == title) {
					return true;
				}
			}
			return false;
		},        
        
		has_journals : function(title) {
			return (journals.length > 0);
		},
				
	    journals : journals,
	    cur_journal : cur_journal
	    
	};
	
});

