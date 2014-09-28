
angular.module('JournalSrvc', [])
.factory('JournalService', function(StorageService,LJService) {

    var JOURNALS_TAG = 'journals';

    var journals = StorageService.getObject(JOURNALS_TAG);

    var def = [
        { title: 'torontoru'  },
        { title: 'toronto-ru' },
        { title: 'tema'       },
        { title: 'russos'     },
        { title: 'tanyat'     },
        { title: 'leoz-net'   }
    ];
    
    //FIXME!
    
    if (!journals) {
        journals = def;
    }
    
    function cbGoodUserpics(data,title) {
        console.log('cbGoodUserpics for ' + title + ' ' + data[0].defaultpicurl);
        var i = getJournal(title);
        if (i != -1) {
            journals[i].$$avatar = data[0].defaultpicurl;
        }
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
    
    //FIXME!

    angular.forEach(journals, function(journal) {
        console.log('journal: ' + journal.title);
        journal['$$avatar'] = 'img/ios7-person.png';
        LJService.get_userpics(journal.title,cbGoodUserpics,cbFailUserpics,journal.title);    
    });    
    
    var cur_journal = 1;
    
	return {
	
        get_journal : function(i) {
            return journals[i];
        },
        
        add_journal : function(journal) {
			journals.push(journal);
			StorageService.setObject(JOURNALS_TAG, journals);
        },
        
		delete_journal : deleteJournal,      
        
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

