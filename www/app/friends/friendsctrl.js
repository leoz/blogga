
angular.module('FriendsCtrl', [])
.controller('FriendsController', [ '$scope', 'FriendsService',
    function($scope, FriendsService) {
    $scope.service = FriendsService;
}]);
