
angular.module('AppCtrl', [])
.controller('AppController', function($scope, $ionicModal, AuthService, FriendsService, GroupsService) {

    $scope.loggedIn = false;
    $scope.activeList = 'bookmarks';
    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
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
});
