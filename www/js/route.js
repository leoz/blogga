
angular.module('MainRoute', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
$stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MainController'
    })

    .state('app.search', {
        url: "/search",
        views: {
            'menuContent' :{
                templateUrl: "templates/search.html"
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent' :{
                templateUrl: "templates/browse.html"
            }
        }
    })

    .state('app.about', {
        url: "/about",
        views: {
            'menuContent' :{
                templateUrl: "templates/about.html"
            }
        }
    })
    
    .state('app.journal', {
        url: "/journal/:journalName",
            views: {
            'menuContent' :{
                templateUrl: "templates/journal.html",
                controller: 'JournalController'
            }
        }
    })

    .state('app.single', {
        url: "/journal/:journalName/:postId",
            views: {
            'menuContent' :{
                templateUrl: "templates/post.html",
                controller: 'PostController'
            }
        }
    });
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/about');

}]);

