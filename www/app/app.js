//
// Blogga LiveJournal client
//

angular.module('blogga', ['ionic', 'ngMessages', 'ngLiveJournal',
    'MainRoute', 'AppFilters',
    'AppCtrl', 'PostCtrl', 'JournalCtrl', 'GroupsCtrl', 'FriendsCtrl',
    'BookmarksCtrl', 'EditPostCtrl', 'EditCommentCtrl',
    'AvatarSrvc', 'AuthSrvc', 'StorageSrvc',
    'BookmarksSrvc', 'FriendsSrvc', 'GroupsSrvc', 'TextSrvc'])

.run(['$ionicPlatform', '$rootScope', 'ngLJService', function($ionicPlatform, $rootScope, ngLJService) {
    $ionicPlatform.ready(function() {

        $rootScope.appVersion = "0.0.0";

        // Check if Cordova is presented
        var useProxy = !ionic.Platform.isWebView();
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
        if (window.cordova) {
            cordova.getAppVersion(function(version) {
                $rootScope.appVersion = version;
            });
        }
    });
}])
.config(['$compileProvider', '$ionicConfigProvider',
    function ($compileProvider, $ionicConfigProvider) {
    $compileProvider.debugInfoEnabled(false);
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
}]);
