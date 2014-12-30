
angular.module('FriendsCtrl', [])
.controller('FriendsController', function($scope, FriendsService) {
    $scope.service = FriendsService;
});
