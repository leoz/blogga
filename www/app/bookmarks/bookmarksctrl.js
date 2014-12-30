
angular.module('BookmarksCtrl', [])
.controller('BookmarksController', function($scope, BookmarksService) {

    $scope.service = BookmarksService;

    $scope.canDelete = false;

    $scope.toggleShowDelete = function(){
        $scope.canDelete = !$scope.canDelete;
    };

    $scope.showDelete = function(){
        return $scope.canDelete;
    };

    $scope.addJournal = function(journalName){
        $scope.canDelete = false;
        $scope.service.add_journal(journalName);
    };
});
