
angular.module('JournalCtrl', [])
.controller('JournalController', function($scope, $stateParams, $sce, JournalService, PostService, LJService) {
    
    $scope.journalData = JournalService;
    $scope.postData = PostService;

    $scope.journalId = $stateParams.journalId;
    
    $scope.avatars   = [];
    $scope.titles    = [];
    $scope.contents  = [];    
    
    $scope.load_posts = function() {
        $scope.postData.load_posts($scope.get_journal_title());
    };    
    
    $scope.get_journal_title = function() {
        return $scope.journalData.get_journal($scope.journalId).title;
    };    

    $scope.get_title = function(i,id) {
//        console.log('get_title for ' + i);
		if (!$scope.titles.hasOwnProperty(id)) {		    
		    LJService.array_buffer_to_string($scope.postData.posts[i].subject).then(
		        function (v) {
//		            console.log('get_title: ' + v);
		            $scope.titles[id] = v;
		        });
        }
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

    $scope.get_avatar = function(name,id) {
		console.log('get_avatar for ' + name);
		if (!$scope.avatars.hasOwnProperty(id)) {		    
            LJService.get_userpics(name,cbGoodUserpics,cbFailUserpics,id);    
        }   
    };

    cbGoodUserpics = function(data,id) {
        $scope.avatars[id] = data[0].defaultpicurl;
        if (!$scope.avatars[id]) {
        	$scope.avatars[id] = 'img/ios7-person.png';
        }
        console.log('cbGoodUserpics ' + id);
        console.log('cbGoodUserpics ' + $scope.avatars[id]);
    };
    
    cbFailUserpics = function(id) {
        console.log('cbFailUserpics for ' + id);
    };

    $scope.toggle_show = function(i) {
        console.log(i + ' toggle_show');
        $scope.postData.posts[i].m_show = !$scope.postData.posts[i].m_show;
    };
    
});

