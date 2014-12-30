
angular.module('BookmarksCtrl', [])
.controller('BookmarksController', function($scope, $location, BookmarksService) {

    $scope.service = BookmarksService;

    $scope.canDelete = false;

    $scope.data = { name: null };

    $scope.isItemActive = function(journalName) {
        var href = "/app/journal/" + journalName;
        var path = $location.path();
        return path.indexOf(href) > -1;
    };

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
