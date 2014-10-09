
angular.module('PostCtrl', [])
.controller('PostController', function($scope, $stateParams, $sce,
                                        PostService,
                                        AvatarService, LJService) {

    $scope.postData = PostService;
    $scope.avatarData = AvatarService;

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
    
        $scope.post = $scope.postData.get_post($scope.postId);
        
	    LJService.array_buffer_to_string($scope.post.subject).then(
	        function (v) {
	            $scope.title = v;
	        });
	    LJService.array_buffer_to_string($scope.post.event).then(
	        function (v) {
	            $scope.content = $sce.trustAsHtml(v);
	        });
	                
    };   
    
    $scope.get_post_comments = function() {
    
        console.log('get_post_comments');
       
        LJService.get_comments($scope.post.itemid,
                               $scope.post.anum,
                               $scope.journalName,
                               cbGoodComments,cbFailComments,$scope.post.poster);
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
		    LJService.array_buffer_to_string(content).then(
		        function (v) {
//		            console.log('test: ' + v);
		            $scope.contents[id] = $sce.trustAsHtml(v);
		        });    
        }
    };    
});

