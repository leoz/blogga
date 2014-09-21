
angular.module('PostCtrl', []).controller('PostController', function($scope, $stateParams) {

    $scope.journalId = $stateParams.journalId;
    
    $scope.postId = $stateParams.postId;
    
});

