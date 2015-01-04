//
// Blogga LiveJournal client
//

angular.module('blogga', ['ionic', 'ngMessages', 'ngLiveJournal', 'MainRoute',
    'AppCtrl', 'PostCtrl', 'JournalCtrl', 'GroupsCtrl', 'FriendsCtrl', 'BookmarksCtrl',
    'blogga.filters',
    'AvatarSrvc', 'AuthSrvc', 'StorageSrvc', 'BookmarksSrvc', 'FriendsSrvc', 'GroupsSrvc', 'TextSrvc'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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
