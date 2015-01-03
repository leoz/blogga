
angular.module('TextSrvc', [])
.factory('TextService', ['$sce', 'ngLJService', function($sce, ngLJService) {
    return{
        convert: function(obj,tag,secure){
            var name = '$$' + tag;
            if (obj && !obj[name]) {
                obj[name] = ngLJService.decode_array_buffer(obj[tag]);
                if(secure) {
                    obj[name] = $sce.trustAsHtml(obj[name]);
                }
            }
            return obj ? obj[name] : null;
        }
    }
}]);
