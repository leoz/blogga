
angular.module('PostCtrl', [])
.controller('PostController', function($scope, $stateParams, $sce,
                                        AvatarService, ngLJService, LoginService) {

    $scope.avatarData = AvatarService;
    $scope.loginData = LoginService;

    $scope.journalName = $stateParams.journalName;
    $scope.postId = $stateParams.postId;
    
    $scope.title = '';
    $scope.content = '';
    
    $scope.post = {};
    
    $scope.child = {
    	children: []
    };    
    
    $scope.contents = [];
    
    $scope.load_post = function() {
    
        ngLJService.get_event($scope.journalName,
                              $scope.postId,
                              cbGoodPost,cbFailPost,$scope.postId,
                              $scope.loginData.get_username(),
                              $scope.loginData.get_password());
	                
    };   
    
    cbGoodPost = function(data,id) {
    
        console.log('cbGoodPost for ' + id);
        
        $scope.post = data[0].events[0];
        
	    ngLJService.array_buffer_to_string($scope.post.subject).then(
	        function (v) {
	            $scope.title = v;
	        });
	    ngLJService.array_buffer_to_string($scope.post.event).then(
	        function (v) {
	            $scope.content = $sce.trustAsHtml(v);
	        });
	        
	    $scope.avatarData.load_avatar($scope.post);
	        
	    $scope.get_post_comments();    
        
    };
    
    cbFailPost = function(id) {
        console.log('cbFailPost for ' + id);
    };
        
    $scope.get_post_comments = function() {
    
        console.log('get_post_comments');
       
        ngLJService.get_comments($scope.post.itemid,
                               $scope.post.anum,
                               $scope.journalName,
                               cbGoodComments,cbFailComments,$scope.post.poster,
                               $scope.loginData.get_username(),
                               $scope.loginData.get_password());
    };    
    
    cbGoodComments = function(data,id) {
        console.log('cbGoodComments for ' + id);
        $scope.child.children = data[0].comments;
    };
    
    cbFailComments = function(id) {
        console.log('cbFailComments for ' + id);
    };    

    $scope.get_content = function(content,id) {
//        console.log('get_content for ' + id);
		if (!$scope.contents.hasOwnProperty(id)) {		    
		    ngLJService.array_buffer_to_string(content).then(
		        function (v) {
//		            console.log('test: ' + v);
		            $scope.contents[id] = $sce.trustAsHtml(v);
		        });    
        }
    };    
});

