function HelloWorldCtrl($scope) {
	// $scope.greeting = "Hello World! (from Angular)";
}

angular.module('helloworld', []).
	directive('greetingModule', function() {
		return {
			restrict: 'E',
			scope: {},
			controller: function(scope, element, attrs) {
				scope.seasonGreeting = attrs.season;
			},
			template: '<div>{{seasonGreeting + ' ' greeting + '!'}}</div>'
		};
	})
