
angular.module('JournalCtrl', ['ngLogExt'])
.controller('JournalController', [ '$log', '$scope', '$state', '$stateParams',
    '$rootScope', '$timeout', 'ngLJService', 'AuthService', 'TextService',
    'AvatarService', 'BookmarksService', function($log, $scope, $state,
    $stateParams, $rootScope, $timeout, ngLJService, AuthService, TextService,
    AvatarService, BookmarksService) {

    var log = $log.context('Journal');

    $scope.journal = $stateParams.journalName;

    $scope.posts = null;
    $scope.error = false;
    $scope.errorData = null;

    $scope.defaultAvatar = AvatarService.defaultAvatar;

    var read_lock = false;
    var last_date = null;
    var load_more = true;
    var count = 20; // Maybe should be 10

    $scope.readPosts = function(callback) {

        if (read_lock) {
            if(callback) {
                callback();
            }
            return;
        }

        read_lock = true;

        log.debug('readPosts');
        if($scope.posts && $scope.posts.length) {
            var new_date = $scope.posts[$scope.posts.length - 1].logtime;
            if (last_date == new_date) {
                load_more = false;
                read_lock = false;
                return;
            }
            last_date = new_date;
        }
        ngLJService.get_events(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,count,last_date).then(function(response){
            $scope.error = false;
            $scope.errorData = null;

            if (!response[0].events.length) {
                load_more = false;
            }

            $scope.preProcessPosts(response[0].events);

            if ($scope.posts && $scope.posts.length) {

                if ($scope.posts[$scope.posts.length - 1].logtime == response[0].events[response[0].events.length - 1].logtime) {
                    load_more = false;
                    read_lock = false;
                    return;
                }

                for (var i = 0; i < response[0].events.length; i++) {
                    $scope.posts.push(response[0].events[i]);
                }response[0].events
            }
            else {
                $scope.posts = response[0].events;
            }

            if(callback) {
                callback();
            }

            read_lock = false;

        }, function(reason){
            $scope.error = true;
            if (reason) {
                TextService.convert(reason, 'message');
                $scope.errorData = reason;
            }
            read_lock = false;
        });
    };

    $scope.update = function() {
        log.debug('update');

        $scope.posts = null;
        last_date = null;
        load_more = true;

        $scope.readPosts(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.$on('$ionicView.loaded', function(){
        log.debug('$ionicView.loaded');
        BookmarksService.read_data();
    });

    $scope.$on('$ionicView.beforeEnter', function(){
        BookmarksService.set_active_journal($scope.journal);
    });

    $rootScope.$on('blgUpdateJournal', function(event, args) {
        if (args && args.journalName && args.journalName == $scope.journal) {

            $scope.posts = null;

            $timeout(function() {
                $scope.update();
            },600);
        }
    });

    $scope.loadMore = function() {
        log.debug('loadMore');

        $scope.readPosts(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
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

    $scope.loadPost = function(journalName,post) {
        var postId = post.itemid;
        if (post.journalname) {
            journalName = post.journalname;
        }
        $state.go('app.post',{journalName:journalName,postId:postId});
    };

    $scope.loadJournal = function(journalName) {
        $state.go('app.journal',{journalName:journalName});
    };

    $scope.isBookmarked = function(journalName) {
        return BookmarksService.has_journal(journalName);
    };

    $scope.toggleBookmarked = function(journalName) {
        // This code should be optimized and moved to BookmarksService
        if (BookmarksService.has_journal(journalName)) {
            BookmarksService.delete_journal_by_name(journalName);
        }
        else {
            BookmarksService.add_journal(journalName);
        }
    };
}])
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
