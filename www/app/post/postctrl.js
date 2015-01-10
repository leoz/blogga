
angular.module('PostCtrl', [])
.controller('PostController', function($scope, $state, $stateParams, $ionicScrollDelegate, ngLJService, AuthService, TextService, AvatarService) {

    $scope.journal = $stateParams.journalName;
    $scope.postId = $stateParams.postId;

    $scope.error = false;
    $scope.loading = true;
    $scope.post = null;
    $scope.child = {};

    $scope.getPost = function() {
        console.log('PostController - getPost');
        ngLJService.get_event(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,$scope.postId).then(function(response){
            $scope.error = false;
            $scope.preProcessPost(response[0].events[0]);
            $scope.post = response[0].events[0];
        }, function(){$scope.error = true;});
    };

    $scope.preProcessPost = function(post) {
        if(!post['poster']) {
            post['poster'] = $scope.journal;
        }
        TextService.convert(post, 'subject');
        AvatarService.getAvatar(post, post.poster);
        TextService.convert(post, 'event', true);
    };

    $scope.getComments = function() {
        console.log('PostController - getComments');
        ngLJService.get_comments(AuthService.get_username(),AuthService.get_authdata(),$scope.journal,$scope.postId).then(function(response){
            $scope.loading = false;
            $scope.error = false;
            $scope.child.children = response[0].comments;
        }, function(){$scope.error = true;});
    };

    $scope.preProcessComments = function(child) {
        $scope.loadComments(child);
        for (var i = 0; i < child.children.length; i++) {
            TextService.convert(child.children[i], 'body');
            AvatarService.getAvatar(child.children[i], child.children[i].postername);
        }
    };

    $scope.loadComments = function(child) {
        if (!child.$$last_index) {
            child.$$last_index = 0;
        }

        var count = 10; // Max number of comments to load

        for (var i = count; child.$$last_index < child.children.length; i--) {
            if (!i) {
                break;
            }
            child.children[child.$$last_index].$$load = true;
            child.$$last_index++;
        }

        if (child.$$last_index < (child.children.length - 1)) {
            child.$$load_more = true;
        }
        else {
            child.$$load_more = false;
        }

        $ionicScrollDelegate.resize();
    };

    $scope.update = function() {
        console.log('PostController - update');
        $scope.getPost();
        $scope.getComments();
    };

    $scope.$on('$ionicView.loaded', function(){
        $scope.update();
    });

    $scope.toggleComment = function(child) {
        child.$$show = !child.$$show;
        $ionicScrollDelegate.resize();
    };

    $scope.loadJournal = function(journalName) {
        $state.go('app.journal',{journalName:journalName});
    };

    $scope.loadPost = function(journalName,postId) {
        $state.go('app.post',{journalName:journalName,postId:postId});
    };

    $scope.loadURL = function(url) {

        // open the page in the inAppBrowser plugin. Falls back to a blank page if the plugin isn't installed
        var params = 'location=no,' +
        'enableViewportScale=yes,' +
        'toolbarposition=top,' +
        'closebuttoncaption=Done';
        var iab = window.open(url,'_blank',params);
        // cordova tends to keep these in memory after they're gone so we'll help it forget
//        iab.addEventListener('exit', function() {
//            iab.removeEventListener('exit', argument.callee);
//            iab.close();
//            iab = null;
//        });
    };

    $scope.processLink = function(e) {
        if(e.toElement.tagName == "A"){
            console.log('processLink: ' + e.toElement.href);
            console.log('hostname: ' + e.toElement.hostname);
            console.log('pathname: ' + e.toElement.pathname);

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            var host = e.toElement.hostname;
            host = host.split('.');

            if (host[1] && host[1] == 'livejournal') {
                if (host[0]) {
                    var post = e.toElement.pathname;
                    post = post.split('/');
                    post = post[1].split('.');
                    if (post[0]) {
                        post[0] = post[0]/256 | 0;
                        console.log('Open journal: ' + host[0] + ' / post: ' + post[0]);
                        $scope.loadPost(host[0],post[0]);
                    }
                }
            }
            else {
                $scope.loadURL(e.toElement.href);
            }
        }
    }
});
