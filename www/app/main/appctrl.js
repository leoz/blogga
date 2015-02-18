
angular.module('AppCtrl', ['ngLogExt'])
.controller('AppController', ['$log', '$scope', '$ionicModal', 'TextService',
    'AuthService', 'AvatarService', 'FriendsService', 'GroupsService',
    function($log, $scope, $ionicModal, TextService, AuthService, AvatarService,
    FriendsService, GroupsService) {

    var log = $log.context('App');

    $scope.activeList = 'bookmarks';
    $scope.loginData = {};

    $scope.user = {
        loggedIn : false,
        username : '',
        password : ''
    };

    $ionicModal.fromTemplateUrl('app/main/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.closeLogin = function() {
        $scope.modal.hide();
        $scope.loginData.$$error = null;
//        AuthService.clear_credentials();
    };

    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        log.debug('Doing login ', $scope.loginData);
        $scope.loginData.$$error = null;
        AuthService.set_credentials($scope.loginData.username,$scope.loginData.password);
        GroupsService.read_groups($scope.cbLoginOk,$scope.cbLoginFailed);
    };

    $scope.cbLoginOk = function() {
        log.debug('Login OK');
        $scope.user.loggedIn = true;
        $scope.loginData.$$error = null;
        AvatarService.getAvatar($scope.loginData, $scope.loginData.username);
        FriendsService.read_friends();
        AuthService.set_logged_in(true);
        $scope.$emit('blgLoginOk');
        $scope.closeLogin();
    };

    $scope.cbLoginFailed = function(reason) {
        log.debug('Login Failed');
        TextService.convert(reason, 'message');
        log.debug(reason);
        $scope.loginData.$$error = reason;
        AuthService.clear_credentials();
    };

    $scope.logout = function() {
        AuthService.clear_credentials();
        $scope.user.loggedIn = false;
        $scope.$emit('blgLogoutOk');
        $scope.activeList = 'bookmarks';
    };

    $scope.getList = function() {
        return $scope.activeList;
    };

    $scope.setList = function(list) {
        return $scope.activeList = list;
    };

    $scope.getOffset = function() {
        var offset = ionic.Platform.isIOS() ? 20 : 0;
        return (($scope.user.loggedIn ? 365 : 158) + offset);
    };

    $scope.getTop = function() {
        return $scope.getOffset() + 'px';
    };

    $scope.getHeight = function() {
        var offset = ionic.Platform.isIOS() ? 20 : 0;
        return ($scope.getOffset() - 44 - offset) + 'px';
    };
}]);
