angular.module('EditPostCtrl', [])
.controller('EditPostController', function($scope, $ionicModal) {

    $scope.newEntry = {
        journal: null,
        subject: null,
        body: null
    };

    $scope.clearEntry = function() {
        console.log('clearEntry');
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
        console.log('openPostEdit');
        $scope.postEdit.show();
    };

    $scope.closePostEdit = function() {
        console.log('closePostEdit');
        $scope.postEdit.hide();
    };

    $scope.$on('$destroy', function(event, modal) {
        console.log('Modal ' + modal.id + ' is destroyed!');
        $scope.postEdit.remove();
    });

    $scope.$on('modal.hidden', function(event, modal) {
        console.log('Modal ' + modal.id + ' is hidden!');
    });

    $scope.$on('modal.removed', function(event, modal) {
        console.log('Modal ' + modal.id + ' is removed!');
    });
});
