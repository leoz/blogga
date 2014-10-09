
angular.module('JournalSrvc', [])
.factory('JournalService', function(StorageService,AvatarService) {

    var JOURNALS_TAG = 'journals';

    var journals = null;
    
    //FIXME!
    loadJournals();
        
    function loadJournals() {
    
        console.log('loadJournals');

        journals = StorageService.getObject(JOURNALS_TAG);
        
        //FIXME!

        if (!journals) {
            journals = [];
			journals.push('torontoru');
			journals.push('toronto-ru');
			journals.push('tema');
			journals.push('russos');
			journals.push('tanyant');
			journals.push('leoz-net');
        }
        
        //FIXME!

        angular.forEach(journals, function(journal) {
            // This is to check the validity of the journal
            console.log('journal: ' + journal);
            AvatarService.load_avatar(journal,cbFailUserpics);    
        });    
        
	};    
    
    function cbFailUserpics(name) {
        console.log('cbFailUserpics for ' + name);
        deleteJournal(name);
    };   
    
    function deleteJournal(name) {
		journals.splice(journals.indexOf(name), 1);
		StorageService.setObject(JOURNALS_TAG, journals);
	};    
    
	return {
	
        add_journal : function(journal) {
			journals.push(journal);
			StorageService.setObject(JOURNALS_TAG, journals);
        },
        
		delete_journal : deleteJournal,

		has_journal : function(name) {
			for(var i in journals) {			
				if(journals[i] == name) {
					return true;
				}
			}
			return false;
		},        
        
		has_journals : function() {
			return (journals.length > 0);
		},
				
	    journals : journals
	    
	};
	
});

