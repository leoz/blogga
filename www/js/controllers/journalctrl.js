
angular.module('JournalCtrl', []).controller('JournalController', function($scope, $stateParams) {

    $scope.journalId = $stateParams.journalId;
    
    $scope.posts = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];

});

