
angular.module('PostCtrl', []).controller('PostController', function($scope, $stateParams, Data) {

    $scope.journalId = $stateParams.journalId;
    
    $scope.postId = $stateParams.postId;

    $scope.data = Data;
    
    $scope.get_journal_title = function() {
        return $scope.data.get_journal($scope.journalId).title;
    };    
    
    $scope.get_post_title = function() {
        return $scope.data.get_post($scope.postId).title;
    };    
    
});

