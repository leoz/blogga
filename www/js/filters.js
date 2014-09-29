
angular.module('DateFormatFilter', []).filter('dateFormat', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input), 'dd MMM yyyy');
	};
});

angular.module('TimeFormatFilter', []).filter('timeFormat', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input), 'hh:mm a');
	};
});

angular.module('UnixFormatFilter', []).filter('unixFormat', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input*1000), 'dd MMM yyyy, hh:mm a');
	};
});

