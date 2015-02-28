
angular.module('GroupsSrvc', ['ngLogExt'])
.factory('GroupsService', [ '$log', 'ngLJService', 'AuthService',
    'AvatarService',
    function($log, ngLJService, AuthService, AvatarService) {

    var log = $log.context('GrpServ');

    var data = null;
    var error = false;

    function readGroups(cb_ok,cb_failed) {
        log.debug('readGroups');
        if (data) {
            data = null;
        }
        ngLJService.do_login(AuthService.get_username(),AuthService.get_authdata()).then(function(response){
            error = false;
            preProcessGroups(response[0].usejournals);
            data = response[0];
            cb_ok();
        }, function(reason){
            cb_failed(reason);
            error = true;
        });
    };

    function preProcessGroups(groups){
        for (var i = 0; i < groups.length; i++) {
            groups[i] = {'username':groups[i]};
            //            TextService.convert(friends[i], 'fullname');
            AvatarService.getAvatar(groups[i], groups[i].username);
        }
    };

    function getGroups(){
        return data ? data.usejournals : null;
    };

    return{
        read_groups: readGroups,
        get_groups: getGroups
    }
}]);
