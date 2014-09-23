
angular.module('PostCtrl', []).controller('PostController', function($scope, $stateParams, JournalService, PostService) {

    $scope.journalData = JournalService;
    $scope.postData = PostService;

    $scope.journalId = $stateParams.journalId;
    $scope.postId = $stateParams.postId;
    
    $scope.get_journal_title = function() {
        return $scope.journalData.get_journal($scope.journalId).title;
    };    
    
    $scope.get_post_title = function() {
        return $scope.postData.get_post($scope.postId).title;
    };    
    
});

