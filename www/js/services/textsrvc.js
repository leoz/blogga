
angular.module('TextSrvc', [])
.factory('TextService', ['ngLJService', function(ngLJService) {
    return{
        convert: function(obj,tag){
            var name = '$$' + tag;
            if (obj && !obj[name]) {
                obj[name] = ngLJService.decode_array_buffer(obj[tag]);
            }
            return obj ? obj[name] : null;
        }
    }
}]);
