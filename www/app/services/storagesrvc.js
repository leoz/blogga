
angular.module('StorageSrvc', [])
.factory('StorageService', [function() {
    var cache = null;
    function readCache() {
        //console.log('StorageService - readCache');
        if (typeof localStorage.cache == 'undefined') {
            cache = {};
            //console.log('readCache - no cache avaliable');
        }
        else {
            cache = JSON.parse(localStorage.cache);
            //console.log('readCache - cache found');
        }
    };
    readCache();
    return{
        setCache: function(key,val){
            //console.log('setCache - key is: ' + key);
            cache[key] = val;
            localStorage.cache = JSON.stringify(cache);
        },
        getCache: function(key){
            //console.log('getCache - key is: ' + key);
            return typeof cache[key] === 'undefined' ? null : cache[key];
        }
    }
}]);
