
angular.module('PostCtrl', [])
.controller('PostController', function($scope, $state, $stateParams, $ionicScrollDelegate, ngLJService, AuthService, TextService, AvatarService) {

    $scope.journal = $stateParams.journalName;
    $scope.postId = $stateParams.postId;

    $scope.error = false;
    $scope.loading = true;
    $scope.post = null;
    $scope.child = {};

    $scope.getPost = function(){
        console.log('PostController - getPost');
        ngLJService.get_event(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,$scope.postId).then(function(response){
            $scope.error = false;
            $scope.preProcessPost(response[0].events[0]);
            $scope.post = response[0].events[0];
        }, function(){$scope.error = true;});
    };

    $scope.preProcessPost = function(post){
        if(!post['poster']) {
            post['poster'] = $scope.journal;
        }
        TextService.convert(post, 'subject');
        AvatarService.getAvatar(post, post.poster);
        TextService.convert(post, 'event', true);
    };

    $scope.getComments = function(){
        console.log('PostController - getComments');
        ngLJService.get_comments(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,$scope.postId).then(function(response){
            $scope.loading = false;
            $scope.error = false;
            $scope.child.children = response[0].comments;
        }, function(){$scope.error = true;});
    };

    $scope.preProcessComments = function(comments){
        for (var i = 0; i < comments.length; i++) {
            TextService.convert(comments[i], 'body');
            AvatarService.getAvatar(comments[i], comments[i].postername);
        }
    };

    $scope.update = function(){
        console.log('PostController - update');
        $scope.getPost();
        $scope.getComments();
    };

    $scope.update();

    $scope.toggleComment = function(child) {
        child.$$show = !child.$$show;
        $ionicScrollDelegate.resize();
    };

    $scope.loadJournal = function(journalName){
        $state.go('app.journal',{journalName:journalName});
    };
});
