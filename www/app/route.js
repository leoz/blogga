
angular.module('MainRoute', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app/main/app.html",
        controller: 'AppController'
    })

    .state('app.journal', {
        url: '/journal/:journalName',
        views: {
            'app-content': {
                templateUrl: 'app/journal/journal.html',
                controller: 'JournalController'
            }
        }
    })
    .state('app.post', {
        url: '/journal/:journalName/:postId',
        views: {
            'app-content': {
                templateUrl: 'app/post/post.html',
                controller: 'PostController'
            }
        }
    });

    $urlRouterProvider.otherwise(function($injector, $location) {
        var active = 'leoz-net';
        var bmksrvc = $injector.get('BookmarksService');
        if (bmksrvc) {
            bmksrvc.read_active_journal();
            active = bmksrvc.get_active_journal();
        }
        $location.path('/app/journal/' + active);
    });
}]);
