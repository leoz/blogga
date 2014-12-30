
angular.module('MainRoute', [])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/app.html",
        controller: 'AppController'
    })

    .state('app.journal', {
        url: '/journal/:journalName',
        views: {
            'app-content': {
                templateUrl: 'templates/journal.html',
                controller: 'JournalController'
            }
        }
    })
    .state('app.post', {
        url: '/journal/:journalName/:postId',
        views: {
            'app-content': {
                templateUrl: 'templates/post.html',
                controller: 'PostController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/journal/torontoru');

});
