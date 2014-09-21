angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $timeout) {

    $scope.journals = [
        { title: 'Journal A', id: 1 },
        { title: 'Journal B', id: 2 },
        { title: 'Journal XX', id: 3 },
        { title: 'Journal XXX', id: 4 },
        { title: 'Some other', id: 5 },
        { title: 'Last', id: 6 }
    ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('JournalCtrl', function($scope, $stateParams) {
    $scope.journalId = $stateParams.journalId;
    $scope.posts = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PostCtrl', function($scope, $stateParams) {
    $scope.journalId = $stateParams.journalId;
    $scope.postId = $stateParams.postId;
});


