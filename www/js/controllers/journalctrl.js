
angular.module('JournalCtrl', []).controller('JournalController', function($scope, $stateParams, Data) {

    $scope.journalId = $stateParams.journalId;
    
    $scope.data = Data;
});

