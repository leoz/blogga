
angular.module('BookmarksSrvc', [])
.factory('BookmarksService', ['AvatarService', 'StorageService',
    function(AvatarService, StorageService) {

    var data = null;
    var key = 'bookmarks';
    var adata = null;
    var akey = 'active';

    function readData() {
        console.log('BookmarksService - readData');
        if (!adata) {
            readActiveJournal();
        }
        if (!data) {
            readBookmarks();
        }
    };

    function readBookmarks() {
        console.log('BookmarksService - readBookmarks');
        data = StorageService.getCache(key);
        console.log(data);
        if (!data || !data.bookmarks || !data.bookmarks.length) {
            setDefaultBookmarks();
        }
        preProcessBookmarks();
    };

    function setDefaultBookmarks(){
        data = {'bookmarks':null};
        data.bookmarks = [
            {'username':'torontoru'},
            {'username':'toronto-ru'},
            {'username':'tema'},
            {'username':'russos'},
            {'username':'tanyant'},
            {'username':'leoz-net'}
        ];
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
        return data.bookmarks;
    };

    /**/

    function readActiveJournal() {
        console.log('BookmarksService - readActiveJournal');
        adata = StorageService.getCache(akey);
        console.log(adata);
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
