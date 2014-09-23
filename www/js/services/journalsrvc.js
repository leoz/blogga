
angular.module('JournalSrvc', []).factory('JournalService', function() {

    var journals = [
        { title: 'Journal A'   },
        { title: 'Journal B'   },
        { title: 'Journal XX'  },
        { title: 'Journal XXX' },
        { title: 'Some other'  },
        { title: 'Last'        }
    ];
    
    var cur_journal = 4;
    
	return {
	
        get_journal : function(i) {
            return journals[i];
        },
        
        add_journal : function(journal) {
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

