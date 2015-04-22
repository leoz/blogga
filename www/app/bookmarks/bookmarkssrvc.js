
angular.module('BookmarksSrvc', ['ngLogExt'])
.factory('BookmarksService', ['$log', 'AvatarService', 'StorageService',
    function($log, AvatarService, StorageService) {

    var log = $log.context('BmkServ');

    var data = null;
    var key = 'bookmarks';
    var adata = null;
    var akey = 'active';

    function readData() {
        log.debug('readData');
        if (!adata) {
            readActiveJournal();
        }
        if (!data) {
            readBookmarks();
        }
    };

    function readBookmarks() {
        data = StorageService.getCache(key);
        log.debug('readBookmarks', data);
        if (!data || !data.bookmarks || !data.bookmarks.length) {
            setDefaultBookmarks();
        }
        preProcessBookmarks();
    };

    // English language bookmarks

    var default_bookmarks_eng = [
        {'username':'greatpoets'},
        {'username':'ontd-science'},
        {'username':'doctorwho'},
        {'username':'toronto'},
        {'username':'ohnotheydidnt'},
        {'username':'linguaphiles'},
        {'username':'lolcats'}
    ];

    // Russian language bookmarks

    var default_bookmarks_cyr = [
        {'username':'torontoru'},
        {'username':'toronto-ru'},
        {'username':'tema'},
        {'username':'russos'},
        {'username':'tanyant'},
        {'username':'leoz-net'}
    ];

    function setDefaultBookmarks(){
        data = {'bookmarks':null};
        data.bookmarks = default_bookmarks_eng;
        StorageService.setCache(key,data);
    };

    function preProcessBookmarks(){
        for (var i = 0; i < data.bookmarks.length; i++) {
            preProcessBookmark(i);
        }
    };

    function preProcessBookmark(i){
        //            TextService.convert(friends[i], 'fullname');
        AvatarService.getAvatar(data.bookmarks[i],data.bookmarks[i].username);
    };

    function hasJournals(){
        return (data.bookmarks.length > 0);
    };

    function hasJournal(journalName){
        for (var i = 0; i < data.bookmarks.length; i++) {
            if(data.bookmarks[i].username == journalName) {
                return true;
            }
        }
        return false;
    };

    function addJournal(journalName){
        var o = {'username':journalName};
        data.bookmarks.push(o);
        preProcessBookmark(data.bookmarks.length - 1);
        StorageService.setCache(key,data);
    };

    function deleteJournal(journal){
        data.bookmarks.splice(data.bookmarks.indexOf(journal), 1);
        StorageService.setCache(key,data);
    };

    function deleteJournalbyName(journalName){
        for (var i = 0; i < data.bookmarks.length; i++) {
            if(data.bookmarks[i].username == journalName) {
                data.bookmarks.splice(i, 1);
                break;
            }
        }
    };

    function getBookmarks(){
        log.debug('getBookmarks');
        return data.bookmarks;
    };

    /**/

    function readActiveJournal() {
        adata = StorageService.getCache(akey);
        log.debug('readActiveJournal', adata);
        if (!adata || !adata.active) {
            setDefaultActiveJournal();
        }
    };

    function setDefaultActiveJournal(){
        adata = {'active':null};
        setActiveJournal('torontoru');
    };

    function getActiveJournal(){
        return adata.active;
    };

    function setActiveJournal(journalName){
        adata.active = journalName;
        StorageService.setCache(akey,adata);
    };

    /**/

    return{
        default_avatar: AvatarService.defaultAvatar,
        read_data: readData,
        read_active_journal: readActiveJournal,
        has_journals: hasJournals,
        has_journal: hasJournal,
        add_journal: addJournal,
        delete_journal: deleteJournal,
        delete_journal_by_name: deleteJournalbyName,
        get_bookmarks: getBookmarks,
        get_active_journal: getActiveJournal,
        set_active_journal: setActiveJournal
    }
}]);
