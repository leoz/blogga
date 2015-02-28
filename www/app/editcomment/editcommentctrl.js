angular.module('EditCommentCtrl', ['ngLogExt'])
.controller('EditCommentController', [ '$log', '$scope', '$rootScope', '$state',
    '$ionicModal', 'ngLJService', 'AuthService', 'AvatarService',
    function($log, $scope, $rootScope, $state, $ionicModal,
    ngLJService, AuthService, AvatarService) {

    var log = $log.context('EdtCom');

    $scope.postData = {
        canComment: false,
        journal: null,
        ditemid: 0
    };

    $scope.postData.canComment = AuthService.get_logged_in();

    $scope.newComment = {
        poster: null,
        parent: 0,
        subject: null,
        body: null
    };

    $scope.clearComment = function() {
        log.debug('clearComment');
        $scope.newComment.poster = null;
        $scope.newComment.parent = 0;
        $scope.newComment.subject = null;
        $scope.newComment.body = null;
    };

    $scope.setPostData = function(journal,ditemid) {
        log.debug('setPostData: ' + journal + ' ' + ditemid);
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
        log.debug('openCommentEdit');
        $scope.setPostData(journal,ditemid);
        $scope.newComment.poster = AuthService.get_username();
        if (child) {
            $scope.newComment.parent = child.dtalkid;
        }
        AvatarService.getAvatar($scope.newComment, $scope.newComment.poster);
        $scope.commentEdit.show();
    };

    $scope.closeCommentEdit = function() {
        log.debug('closeCommentEdit');
        $scope.commentEdit.hide();
    };

    $scope.addComment = function() {
        log.debug('addComment');

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
        $scope.commentEdit.remove();
    });

    $scope.$on('modal.hidden', function(event, modal) {
        $scope.clearComment();
    });

    $scope.$on('modal.removed', function(event, modal) {
    });

    $rootScope.$on('blgLoginOk', function() {
        $scope.postData.canComment = AuthService.get_logged_in();
    });

    $rootScope.$on('blgLogoutOk', function() {
        $scope.postData.canComment = AuthService.get_logged_in();
    });
}]);
