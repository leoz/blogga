
angular.module('BookmarksCtrl', [])
.controller('BookmarksController', ['$scope', '$location', '$state',
    'BookmarksService', function($scope, $location, $state, BookmarksService) {

    $scope.service = BookmarksService;

    $scope.canDelete = false;

    $scope.data = { name: null };

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

    $scope.loadJournal = function(journalName) {
        $state.go('app.journal',{journalName:journalName});
    };
}]);
