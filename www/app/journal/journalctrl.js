
angular.module('JournalCtrl', [])
.controller('JournalController', function($scope, $state, $stateParams, ngLJService, AuthService, TextService, AvatarService) {

    $scope.journal = $stateParams.journalName;

    $scope.posts = null;
    $scope.error = false;

    var last_date = null;
    var load_more = true;
    var count = 20; // Maybe should be 10

    $scope.update = function() {
        console.log('JournalCtrl - update');
        last_date = null;
        load_more = true;
        ngLJService.get_events(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,count,last_date).then(function(response){
            $scope.error = false;
            $scope.preProcessPosts(response[0].events);
            $scope.posts = response[0].events;
            $scope.$broadcast('scroll.refreshComplete');
        }, function(){$scope.error = true;});
    };

    $scope.update();

    $scope.loadMore = function() {
        console.log('JournalCtrl - loadMore');
        if($scope.posts && $scope.posts.length) {
            last_date = $scope.posts[$scope.posts.length - 1].eventtime;
        }
        ngLJService.get_events(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,count,last_date).then(function(response){
            $scope.error = false;

            if (!response[0].events.length) {
                load_more = false;
            }

            $scope.preProcessPosts(response[0].events);
            if ($scope.posts) {
                for (var i = 0; i < response[0].events.length; i++) {
                    $scope.posts.push(response[0].events[i]);
                }
            }
            else {
                $scope.posts = response[0].events;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function(){$scope.error = true;});
    };


    $scope.canLoadMore = function() {
        return load_more;
    };

    $scope.preProcessPosts = function(posts) {
        for (var i = 0; i < posts.length; i++) {
            if(!posts[i]['poster']) {
                posts[i]['poster'] = $scope.journal;
            }
            TextService.convert(posts[i], 'subject');
            AvatarService.getAvatar(posts[i], posts[i].poster);
        }
    };

    $scope.loadPost = function(journalName,postId) {
        $state.go('app.post',{journalName:journalName,postId:postId});
    };

    $scope.loadJournal = function(journalName) {
        $state.go('app.journal',{journalName:journalName});
    };
})
.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});
