
angular.module('MainCtrl', [])
.controller('MainController', function($scope, $ionicSideMenuDelegate,
                                        $ionicModal, $timeout, $state,
                                        JournalService, AvatarService, LoginService, ngLJService) {

    $scope.journalData = JournalService;
    $scope.avatarData = AvatarService;
    $scope.loginData = LoginService;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.load_journal = function(name) {
    	$state.go('app.journal', {journalName:name});
    }    
    
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
    $scope.loginState = {
		username : null,
		password : null
	};

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
        console.log('Doing login', $scope.loginState);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
        	$scope.loginData.do_login($scope.loginState.username,
                                      $scope.loginState.password);
            $scope.closeLogin();
        }, 1000);
    };

    $scope.logout = function() {
		// Simulate logout
        $timeout(function() {
        	$scope.loginData.do_logout();
        }, 1000);
    };
    
    $scope.profile = function() {
        //$scope.modal.show();
    };
    
    $scope.loggedin = function() {
		return $scope.loginData.get_loggedin();
        //$scope.modal.show();
    };
    
    $scope.get_fullname = function(friend) {
		if (!friend.$$fullname) {		    
		    ngLJService.array_buffer_to_string(friend.fullname).then(
		        function (v) {
		            friend.$$fullname = v;
		        });    
        }
    };
});

