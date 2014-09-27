
angular.module('JournalCtrl', [])
.controller('JournalController', function($scope, $stateParams, JournalService, PostService) {
    
    $scope.journalData = JournalService;
    $scope.postData = PostService;

    $scope.journalId = $stateParams.journalId;
    
    $scope.get_title = function() {
        return $scope.journalData.get_journal($scope.journalId).title;
    };    
});

