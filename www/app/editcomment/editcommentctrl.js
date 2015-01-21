angular.module('EditCommentCtrl', [])
.controller('EditCommentController', function($scope, $state, $ionicModal,
    ngLJService, AuthService, AvatarService) {

    $scope.postData = {
        journal: null,
        ditemid: 0
    };

    $scope.newComment = {
        poster: null,
        parent: 0,
        subject: null,
        body: null
    };

    $scope.canPostComment = function() {
        console.log('EditCommentCtrl - canPostComment');
        return AuthService.get_logged_in();
    };

    $scope.clearComment = function() {
        console.log('EditCommentCtrl - clearComment');
        $scope.newComment.poster = null;
        $scope.newComment.parent = 0;
        $scope.newComment.subject = null;
        $scope.newComment.body = null;
    };

    $scope.setPostData = function(journal,ditemid) {
        console.log('EditCommentCtrl - setPostData: ' + journal + ' ' + ditemid);
        $scope.postData.journal = journal;
        $scope.postData.ditemid = ditemid;
    };

    $ionicModal.fromTemplateUrl('app/editcomment/editcomment.html', {
        id: 'edit_comment',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.commentEdit = modal;
    });

    $scope.openCommentEdit = function(journal,ditemid,child) {
        console.log('EditCommentCtrl - openCommentEdit');
        $scope.setPostData(journal,ditemid);
        $scope.newComment.poster = AuthService.get_username();
        if (child) {
            $scope.newComment.parent = child.dtalkid;
        }
        AvatarService.getAvatar($scope.newComment, $scope.newComment.poster);
        $scope.commentEdit.show();
    };

    $scope.closeCommentEdit = function() {
        console.log('EditCommentCtrl - closeCommentEdit');
        $scope.commentEdit.hide();
    };

    $scope.addComment = function() {
        console.log('EditCommentCtrl - addComment');

        ngLJService.add_comment(
            AuthService.get_username(),
            AuthService.get_authdata(),
            $scope.postData.journal,
            $scope.postData.ditemid,
            $scope.newComment.parent,
            $scope.newComment.body,
            $scope.newComment.subject
        ).then(function(response){
            $scope.error = false;
        }, function(){$scope.error = true;});

        $scope.$emit('blgNewComment');
        $scope.commentEdit.hide();
    };

    $scope.$on('$destroy', function(event, modal) {
        console.log('EditCommentCtrl - Modal ' + modal.id + ' is destroyed!');
        $scope.commentEdit.remove();
    });

    $scope.$on('modal.hidden', function(event, modal) {
        console.log('EditCommentCtrl - Modal ' + modal.id + ' is hidden!');
        $scope.clearComment();
    });

    $scope.$on('modal.removed', function(event, modal) {
        console.log('EditCommentCtrl - Modal ' + modal.id + ' is removed!');
    });
});
