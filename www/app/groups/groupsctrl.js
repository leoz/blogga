
angular.module('GroupsCtrl', [])
.controller('GroupsController', [ '$scope', 'GroupsService',
    function($scope, GroupsService) {
    $scope.service = GroupsService;
}]);
