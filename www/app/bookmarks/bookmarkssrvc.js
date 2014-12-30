
angular.module('BookmarksSrvc', [])
.factory('BookmarksService', ['AvatarService', function(AvatarService) {
    var data = null;
    function readBookmarks() {
        console.log('BookmarksService - readBookmarks');
        data = {'bookmarks':null};
        data.bookmarks = [
        'torontoru',
        'toronto-ru',
        'tema',
        'russos',
        'tanyant',
        'leoz-net'
        ];
        preProcessBookmarks();
    };
    readBookmarks();

    function preProcessBookmarks(){
        for (var i = 0; i < data.bookmarks.length; i++) {
            preProcessBookmark(i);
        }
    };

    function preProcessBookmark(i){
        data.bookmarks[i] = {'username':data.bookmarks[i]};
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
        data.bookmarks.push(journalName);
        preProcessBookmark(data.bookmarks.length - 1);
    };

    function deleteJournal(journal){
        data.bookmarks.splice(data.bookmarks.indexOf(journal), 1);
    };

    function getBookmarks(){
        return data.bookmarks;
    };

    return{
        has_journals: hasJournals,
        has_journal: hasJournal,
        add_journal: addJournal,
        delete_journal: deleteJournal,
        get_bookmarks: getBookmarks
    }
}]);
