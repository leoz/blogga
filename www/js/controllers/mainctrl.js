
angular.module('MainCtrl', []).controller('MainController', function($scope, $ionicSideMenuDelegate, $ionicModal, $timeout, Data) {

    $scope.data = Data;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
	$scope.journal = {};
	$scope.submit = function() {
		if(!$scope.journal.title) {
			alert('Info required');
			return;
		}
		var j = {};
		j.title = $scope.journal.title;
		$scope.data.add_journal(j);
		$scope.journal = {};
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

});

