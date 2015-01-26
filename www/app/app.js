//
// Blogga LiveJournal client
//

angular.module('blogga', ['ionic', 'ngMessages', 'ngLiveJournal',
    'MainRoute', 'AppFilters',
    'AppCtrl', 'PostCtrl', 'JournalCtrl', 'GroupsCtrl', 'FriendsCtrl',
    'BookmarksCtrl', 'EditPostCtrl', 'EditCommentCtrl',
    'AvatarSrvc', 'AuthSrvc', 'StorageSrvc',
    'BookmarksSrvc', 'FriendsSrvc', 'GroupsSrvc', 'TextSrvc'])

.run(function($ionicPlatform, ngLJService) {
    $ionicPlatform.ready(function() {

        // Check if Cordova is presented
        var useProxy = true; // !window.cordova
        ngLJService.set_config(useProxy);

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});
