
angular.module('FriendsSrvc', [])
.factory('FriendsService', ['ngLJService', 'AuthService', 'TextService',
    'AvatarService', function(ngLJService, AuthService, TextService,
    AvatarService) {

    var data = null;
    var error = false;

    function readFriends() {
        console.log('FriendsService - readFriends');
        if (data) {
            data = null;
        }
        ngLJService.get_friends(AuthService.get_username(),AuthService.get_authdata()).then(function(response){
            error = false;
            preProcessFriends(response[0].friends);
            data = response[0];
        }, function(){error = true;});
    };

    function preProcessFriends(friends){
        for (var i = 0; i < friends.length; i++) {
            TextService.convert(friends[i], 'fullname');
            AvatarService.getAvatar(friends[i], friends[i].username);
        }
    };

    function getFriends(){
        return data ? data.friends : null;
    };

    return{
        read_friends: readFriends,
        get_friends: getFriends
    }
}]);
