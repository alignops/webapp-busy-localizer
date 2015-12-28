/* global angular */

(function () {
    'use strict';

	angular.module('example')
	    .controller([
	        '$scope', 'localize',
	        function ($scope, localize) {
	            $scope.text1 = localize(
	                'Hello {name}!',
	                {name: $scope.user.name}
	            );
	            $scope.text2 = localize('Bananas');
	        }
	    ]);

}());
