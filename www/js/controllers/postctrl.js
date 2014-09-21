
angular.module('PostCtrl', []).controller('PostController', function($scope, $stateParams, Data) {

    $scope.journalId = $stateParams.journalId;
    
    $scope.postId = $stateParams.postId;

    $scope.data = Data;
    
});

