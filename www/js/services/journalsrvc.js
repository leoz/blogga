
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
			mJournals.push('torontoru');
			mJournals.push('toronto-ru');
			mJournals.push('tema');
			mJournals.push('russos');
			mJournals.push('tanyant');
			mJournals.push('leoz-net');
        }
        
        //FIXME!
        
        if (!mCurrent && hasJournals()) {
        	setCurrent(mJournals[0]);
		}
		                
        //FIXME!

        angular.forEach(mJournals, function(journal) {
            // This is to check the validity of the journal
            console.log('journal: ' + journal);
            var o = {poster:journal};
            AvatarService.load_avatar(o,cbFailUserpics);    
        });    
        
	};    
    
    function cbFailUserpics(name) {
        console.log('cbFailUserpics for ' + name);
        deleteJournal(name);
    };
    
    function addJournal(journal) {
		mJournals.push(journal);
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
		StorageService.setObject(CURRENT_TAG, mCurrent);
	};
	
    function hasJournal(name) {
		for(var i in mJournals) {			
			if(mJournals[i] == name) {
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

