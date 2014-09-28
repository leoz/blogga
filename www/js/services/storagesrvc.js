
angular.module('StorageSrvc', [])
.factory('StorageService', ['$window', function($window) {
    
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            console.log('setObject');
            console.log(angular.toJson(value));
            $window.localStorage[key] = angular.toJson(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || null);
        }
    };
	
}]);

