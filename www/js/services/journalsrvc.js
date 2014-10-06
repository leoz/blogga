
angular.module('JournalSrvc', [])
.factory('JournalService', function(StorageService,LJService) {

    var JOURNALS_TAG = 'journals';

    var journals = null;
    
    var cur_journal = 1;

    var def = [
        { title: 'torontoru'  },
        { title: 'toronto-ru' },
        { title: 'tema'       },
        { title: 'russos'     },
        { title: 'tanyant'    },
        { title: 'leoz-net'   }
    ];
    
    //FIXME!
    loadJournals();
        
    function loadJournals() {
    
        console.log('loadJournals');

        journals = StorageService.getObject(JOURNALS_TAG);
        
        //FIXME!

        if (!journals) {
            journals = def;
        }
        
        //FIXME!

        angular.forEach(journals, function(journal) {
            // This is to check the validity of the journal
            console.log('journal: ' + journal.title);
            LJService.get_userpics(journal.title,cbGoodUserpics,cbFailUserpics,journal.title);    
        });    
        
	};    
    
    function cbGoodUserpics(data,title) {
        console.log('cbGoodUserpics for ' + title);
    };
    
    function cbFailUserpics(title) {
        console.log('cbFailUserpics for ' + title);
        deleteJournal(title);
    };
    
    function getJournal(title) {
		for(var i in journals) {			
			if(journals[i].title == title) {
				return i;
			}
		}
		return -1;
	};    
    
    function deleteJournal(title) {
		journals.splice(journals.indexOf(title), 1);
		StorageService.setObject(JOURNALS_TAG, journals);
	};    
    
	return {
	
        get_journal : function(i) {
            return journals[i];
        },
        
        add_journal : function(journal) {
			journals.push(journal);
			StorageService.setObject(JOURNALS_TAG, journals);
        },
        
		delete_journal : deleteJournal,      
        
		load_journals : loadJournals,      

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

