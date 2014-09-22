
angular.module('JournalCtrl', []).controller('JournalController', function($scope, $stateParams, Data) {
    
    $scope.data = Data;

    $scope.journalId = $stateParams.journalId;
    
    $scope.get_title = function() {
        return $scope.data.get_journal($scope.journalId).title;
    };    
});

