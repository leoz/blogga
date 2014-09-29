
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
    
    $scope.get_journal_title = function() {
        return $scope.journalData.get_journal($scope.journalId).title;
    };    
    
});

