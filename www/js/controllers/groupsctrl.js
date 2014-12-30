
angular.module('GroupsCtrl', [])
.controller('GroupsController', function($scope, GroupsService) {
    $scope.service = GroupsService;
});
