
angular.module('PostCtrl', [])
.controller('PostController', function($scope, $stateParams, $sce, JournalService, PostService, LJService) {

    $scope.journalData = JournalService;
    $scope.postData = PostService;

    $scope.journalId = $stateParams.journalId;
    $scope.postId = $stateParams.postId;
    
    $scope.title = '';
    $scope.content = '';
    $scope.avatar = '';
    
    $scope.post = {};
    
    $scope.child = {
    	children: []
    };    
    
    $scope.avatars  = [];
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
	    
        LJService.get_userpics($scope.post.poster,cbGoodUserpic,cbFailUserpic,null);    
        
    };
    
    $scope.get_avatar = function(name,id) {
		console.log('get_avatar for ' + name);
		if (!$scope.avatars.hasOwnProperty(id)) {		    
            LJService.get_userpics(name,cbGoodUserpic,cbFailUserpic,id);    
        }   
    };    
    
    cbGoodUserpic = function(data,id) {
        console.log('cbGoodUserpic ' + id);
        if (!id) {
            $scope.avatar = data[0].defaultpicurl;
            if (!$scope.avatar) {
            	$scope.avatar = 'img/ios7-person.png';
            }
            console.log('cbGoodUserpic ' + $scope.avatar);
        }
        else {
            $scope.avatars[id] = data[0].defaultpicurl;
            if (!$scope.avatars[id]) {
            	$scope.avatars[id] = 'img/ios7-person.png';
            }
            console.log('cbGoodUserpics ' + $scope.avatars[id]);
        }
    };
    
    cbFailUserpic = function(id) {
        console.log('cbFailUserpics for ' + id);
    };    
    
    $scope.get_journal_title = function() {
        return $scope.journalData.get_journal($scope.journalId).title;
    };    
    
    $scope.get_post_comments = function() {
    
        console.log('get_post_comments');
       
        LJService.get_comments($scope.post.itemid,
                               $scope.post.anum,
                               $scope.get_journal_title(),
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

