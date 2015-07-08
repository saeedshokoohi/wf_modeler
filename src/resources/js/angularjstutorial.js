/* use strict */
var app = angular.module('MyApp', []);
app.controller("MainCtrl", function ($scope)
{
	$scope.data = {
		label: "My Button 2 d",
		name :"Saeed"
	};
   $scope.refreshData=function()
	{
        alert($scope.data.name);
		$scope.data.label='My button Refreshed...';
		$scope.data.name='Shokoohi';
	};

});
app.directive('saeedSh',function(){
	return{
		restrict:"E",
		transclude:true,
		template:"<h1>Yes this is saeed directive</h1>"
	}

});

/* use strict */
var app = angular.module('MyApp2', []);
app.controller("MainCtrl2", function ($scope)
{
	$scope.data = {
		label: "My Button 2 sd",
		name :"Saeed"
	};
});