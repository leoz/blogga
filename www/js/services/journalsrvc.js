
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
    
    if (!journals) {
        journals = def;
    }
    
    function setUserpicsData(data,id) {
        console.log('setUserpicsData ' + data[0].defaultpicurl);
    };
    
    if (true) {
        LJService.get_userpics('toronto-ru',setUserpicsData,0);    
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

