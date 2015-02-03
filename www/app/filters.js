//
// Blogga Filters
//

angular.module('AppFilters', [])

.filter('dateFormat', [ '$filter', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input.replace(/-/g, '/')), 'dd MMM yyyy, hh:mm a');
	};
}])

.filter('timeFormat', [ '$filter', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input.replace(/-/g, '/')), 'hh:mm a');
	};
}])

.filter('unixFormat', [ '$filter', function($filter) {
	return function(input) {
		if(input == null) {
			return '';
		}
		return $filter('date')(new Date(input*1000), 'dd MMM yyyy, hh:mm a');
	};
}]);
