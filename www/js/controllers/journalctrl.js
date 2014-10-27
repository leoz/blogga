
angular.module('JournalCtrl', [])
.controller('JournalController', function($scope, $stateParams, $sce,
                                           JournalService, PostService,
                                           AvatarService, ngLJService) {
    
    $scope.journalData = JournalService;
    $scope.postData = PostService;
    $scope.avatarData = AvatarService;

    $scope.journalName = $stateParams.journalName;
    
    $scope.journalData.set_current($scope.journalName);
    
    $scope.titles    = [];
    $scope.contents  = [];
        
    $scope.refresh_posts = function() {
    	$scope.postData.reset_posts();
    	$scope.postData.set_title($scope.journalName);
    	$scope.postData.load_posts(cbLoadPosts);
    };
    
    $scope.load_posts = function() {
    	$scope.postData.load_posts(cbLoadPosts);
    };
    
    $scope.can_load_posts = function() {
    	return $scope.postData.can_load_more();
    };
        
    cbLoadPosts = function() {
        $scope.$broadcast('scroll.refreshComplete');
    	$scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (fromParams && fromParams.journalName &&
            toParams && toParams.journalName &&
            toParams.journalName == fromParams.journalName) {
            // DO NOTHING
		}
		else {
		    $scope.load_posts();
		}
	});

    $scope.get_title = function(i,id) {
		if (!$scope.titles.hasOwnProperty(id)) {		    
		    ngLJService.array_buffer_to_string($scope.postData.posts[i].subject).then(
		        function (v) {
		            $scope.titles[id] = v;
		        });
        }
    };
    
    $scope.get_content = function(content,id) {
		if (!$scope.contents.hasOwnProperty(id)) {		    
		    ngLJService.array_buffer_to_string(content).then(
		        function (v) {
		            $scope.contents[id] = $sce.trustAsHtml(v);
		        });    
        }
    };

    $scope.toggle_show = function(i) {
        console.log(i + ' toggle_show');
        $scope.postData.posts[i].m_show = !$scope.postData.posts[i].m_show;
    };
    
})
.directive('stopEvent', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.bind(attr.stopEvent, function (e) {
				e.stopPropagation();
			});
		}
	};
});

