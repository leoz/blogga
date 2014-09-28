
angular.module('LJSrvc', [])
.factory('LJService', ['$http','$q',function($http,$q) {

    var x2js = new X2JS();

    var URL = 'http://www.livejournal.com/interface/xmlrpc';
    
	return {
	
		post: function(params,callback,context) {
			$http({
				method: 'POST',
				url: URL,
				data: params,
				headers: {
					'Content-Type': 'text/xml'
				}
			}).
			success(function(data, status) {
				console.log('Request succeeded');
				console.log('#1');
				console.log(data);
				var xmlDoc = x2js.parseXmlString(data);
				console.log('#2');
				console.log(xmlDoc);
				var response = XMLRPC.parseDocument(xmlDoc);
				console.log('#3');
				console.log(response);
				callback(response,context);
			}).
			error(function(data, status) {
				console.log('Request failed ' + status);
			});
		},		
		prepare_call: function(method,params) {
			console.log('prepare call');
			var xmlDoc = XMLRPC.document(method, [params]);
            console.log('#A');
            console.log(xmlDoc);
			var data;
			if ("XMLSerializer" in window) {
				data = new window.XMLSerializer().serializeToString(xmlDoc);
			} else {
				// IE does not have XMLSerializer
				data = xmlDoc.xml;
			}
			console.log(data);
			return data;
		},	
		get_userpics: function(user,callback,index) {
			var method = 'LJ.XMLRPC.getuserpics';
			var params = {
				'ver'        : '1',
				'usejournal' : user
			};        
			var param = this.prepare_call(method,params);         
			this.post(param,callback,index);
		}
	
	};
}]);

