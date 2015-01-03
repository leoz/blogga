
angular.module('AppCtrl', [])
.controller('AppController', function($scope, $ionicModal, AuthService, AvatarService, FriendsService, GroupsService) {

    $scope.loggedIn = false;
    $scope.activeList = 'bookmarks';
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('app/main/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        AuthService.set_credentials($scope.loginData.username,$scope.loginData.password);
        AvatarService.getAvatar($scope.loginData, $scope.loginData.username);
        FriendsService.read_friends();
        GroupsService.read_groups();
        $scope.loggedIn = true;
        $scope.closeLogin();
    };

    $scope.logout = function() {
        AuthService.clear_credentials();
        $scope.loggedIn = false;
        $scope.activeList = 'bookmarks';
    };

    $scope.isLoggedIn = function() {
        return $scope.loggedIn;
    };

    $scope.getList = function() {
        return $scope.activeList;
    };

    $scope.setList = function(list) {
        return $scope.activeList = list;
    };

    $scope.getTop = function() {
        var offset = ionic.Platform.isIOS() ? 20 : 0;
        return (($scope.isLoggedIn() ? 272 : 134) + offset) + 'px';
    }
});
