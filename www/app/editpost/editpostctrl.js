angular.module('EditPostCtrl', ['ngLogExt'])
.controller('EditPostController', [ '$log', '$scope', '$state', '$ionicModal',
    'ngLJService', 'AuthService', 'AvatarService', function($log, $scope,
    $state, $ionicModal, ngLJService, AuthService, AvatarService) {

    var log = $log.context('EdtPost');

    $scope.newEntry = {
        journal: null,
        subject: null,
        body: null
    };

    $scope.clearEntry = function() {
        log.debug('clearEntry');
        $scope.newEntry.journal = null;
        $scope.newEntry.subject = null;
        $scope.newEntry.body = null;
    };

    $ionicModal.fromTemplateUrl('app/editpost/editpost.html', {
        id: 'edit_post',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.postEdit = modal;
    });

    $scope.openPostEdit = function() {
        log.debug('openPostEdit');
        $scope.newEntry.journal = AuthService.get_username();
        AvatarService.getAvatar($scope.newEntry, $scope.newEntry.journal);
        $scope.postEdit.show();
    };

    $scope.closePostEdit = function() {
        log.debug('closePostEdit');
        $scope.postEdit.hide();
    };

    $scope.postEntry = function() {
        log.debug('postEntry');

        ngLJService.post_event(
            AuthService.get_username(),
            AuthService.get_authdata(),
            $scope.newEntry.journal,
            $scope.newEntry.body,
            $scope.newEntry.subject
        ).then(function(response){
            $scope.error = false;
        }, function(){$scope.error = true;});

        $scope.$emit('blgUpdateJournal',{journalName: $scope.newEntry.journal});
        $state.go('app.journal',{journalName: $scope.newEntry.journal});
        $scope.postEdit.hide();
    };

    $scope.$on('$destroy', function(event, modal) {
        $scope.postEdit.remove();
    });

    $scope.$on('modal.hidden', function(event, modal) {
        $scope.clearEntry();
    });

    $scope.$on('modal.removed', function(event, modal) {
    });
}]);
