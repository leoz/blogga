
angular.module('MainCtrl', [])
.controller('MainController', function($scope, $ionicSideMenuDelegate,
                                        $ionicModal, $timeout,
                                        JournalService, AvatarService) {

    $scope.journalData = JournalService;
    $scope.avatarData = AvatarService;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
	// This is a hack to pass objects
	$scope.menuData = {
		name : null
	};
	
	$scope.submit = function() {
		if(!$scope.menuData.name) {
			alert('Info required');
			return;
		}
		$scope.journalData.add_journal($scope.menuData.name);
		$scope.menuData.name = null;
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

