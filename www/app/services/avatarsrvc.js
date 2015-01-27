
angular.module('AvatarSrvc', [])
.factory('AvatarService', ['ngLJService','StorageService','AuthService',function(ngLJService,StorageService,AuthService) {

    var defUserPic = 'img/ios7-person.png';
    var tmp = '$$userpic';

    function getUserPic(obj,user) {
        if(!setUserPicFromPost(obj)) {
            var key = 'userpic/' + user;
            var data = null;
            data = StorageService.getCache(key);
            if (data) {
                setUserPicFromData(obj,data);
//                console.log('### User Pic: Got cached data for ' + user);
            }
            else {
//                console.log('### User Pic: NO cached data for ' + user);
                ngLJService.get_userpics(AuthService.get_username(),AuthService.get_authdata(),user).then(function(response){
                    data = response[0];
                    setUserPicKeywords(data);
                    StorageService.setCache(key,data);
                    setUserPicFromData(obj,data);
//                    console.log('userPic: Got data for ' + user);
                }, function(){ setUrl(obj,null);});
            }
        }
    };

    function setUserPicKeywords(data) {
//        console.log('### User Pic: setUserPicKeywords');
        if (data & data.pickws) {
            for (var i = 0; i < data.pickws.length; i++) {
                data.pickws[i] = ngLJService.decode_array_buffer(data.pickws[i]);
            }
        }
    };

    function setUserPicFromPost(obj) {
//        console.log('### User Pic: setUserPicFromPost');
        if (obj && obj.poster_userpic_url) {
            setUrl(obj,obj.poster_userpic_url);
            return true;
        }
        return false;
    };

    function setUserPicFromData(obj,data) {
//        console.log('### User Pic: setUserPicFromData');
        if (obj.props && obj.props.picture_keyword) {
//            console.log('### User Pic: has keyword!');
            if(data.pickws) {
                obj.props.picture_keyword = ngLJService.decode_array_buffer(obj.props.picture_keyword);
                for (var i = 0; i < data.pickws.length; i++) {
                    if (data.pickws[i] == obj.props.picture_keyword) {
                        setUrl(obj,data.pickwurls[i]);
//                        console.log('### User Pic: pic by keyword is set!');
                        return true;
                    }
                }
            }

        }
        setUrl(obj,data.defaultpicurl);
        return false;
    };

    function setUrl(obj,url) {
        obj[tmp] = url ? url : defUserPic;
    };

    return{
        defaultAvatar: defUserPic,
        getAvatar: function(obj,user){
//            console.log('userPic: Call for ' + user);
            if (obj && !obj[tmp]) {
                getUserPic(obj,user);
            }
            return obj ? obj[tmp] : null;
        }
    }
}]);
