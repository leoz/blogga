
angular.module('JournalSrvc', [])
.factory('JournalService', function(StorageService) {

    var JOURNALS_TAG = 'journals';

    var journals = StorageService.getObject(JOURNALS_TAG);

    var def = [
        { title: 'Journal A'   },
        { title: 'Journal B'   },
        { title: 'Journal XX'  },
        { title: 'Journal XXX' },
        { title: 'Some other'  },
        { title: 'Last'        }
    ];
    
    if (!journals) {
        journals = def;
    }
    
    var cur_journal = 1;
    
	return {
	
        get_journal : function(i) {
            return journals[i];
        },
        
        add_journal : function(journal) {
			journals.push(journal);
			StorageService.setObject(JOURNALS_TAG, journals);
        },
        
		delete_journal : function(journal) {
			journals.splice(journals.indexOf(journal), 1);
			StorageService.setObject(JOURNALS_TAG, journals);
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

