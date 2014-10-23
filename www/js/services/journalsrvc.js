
angular.module('JournalSrvc', [])
.factory('JournalService', function(StorageService,AvatarService) {

    var JOURNALS_TAG = 'blogga.journals';
    var CURRENT_TAG  = 'blogga.current';
    
    var def_url = '/app/browse';
    var def_prefix = '/app/journal/';

    var mJournals = null;
    var mCurrent  = null;
    
    //FIXME!
    loadJournals();
        
    function loadJournals() {
    
        console.log('loadJournals');

        mJournals = StorageService.getObject(JOURNALS_TAG);
        mCurrent  = StorageService.getObject(CURRENT_TAG);
        
        //FIXME!

        if (!mJournals) {
            mJournals = [];
			addJournal('torontoru');
			addJournal('toronto-ru');
			addJournal('tema');
			addJournal('russos');
			addJournal('tanyant');
			addJournal('leoz-net');
        }
        
        //FIXME!
        
        if (!mCurrent && hasJournals()) {
        	setCurrent(mJournals[0].username);
		}
		                
        //FIXME!

        angular.forEach(mJournals, function(journal) {
            // This is to check the validity of the journal
            console.log('journal: ' + journal.username);
            AvatarService.load_avatar(journal,cbFailUserpics);    
        });    
        
	};    
    
    function cbFailUserpics(name) {
        console.log('cbFailUserpics for ' + name);
        deleteJournal(name);
    };
    
    function addJournal(name) {
    	var o = {
    		username : name,
    		$$active : false
    	};
    	
		mJournals.push(o);
		StorageService.setObject(JOURNALS_TAG, mJournals);
    };
    
    function deleteJournal(name) {
		mJournals.splice(mJournals.indexOf(name), 1);
		StorageService.setObject(JOURNALS_TAG, mJournals);
	};    
    
    function getCurrentURL() {
    	if (mCurrent) {
	    	return def_prefix + mCurrent;
    	}
    	return def_url;
	};
    
    function setCurrent(name) {
    	mCurrent = name;
    	
		// This is to set active journal
        angular.forEach(mJournals, function(journal) {
			journal.$$active = (journal.username == name);
        });    	
    	
		StorageService.setObject(CURRENT_TAG, mCurrent);
	};
	
    function hasJournal(name) {
		for(var i in mJournals) {			
			if(mJournals[i].username == name) {
				return true;
			}
		}
		return false;
	};    
        
    function hasJournals() {
		return (mJournals.length > 0);
	};    
    
	return {
	
        add_journal     : addJournal,
		delete_journal  : deleteJournal,
		has_journal     : hasJournal,        
		has_journals    : hasJournals,
		load_journals   : loadJournals,
		set_current     : setCurrent,
		get_current_url : getCurrentURL,
	    journals        : mJournals
	    
	};
	
});

