(function() {
angular.module('furniture2', ['ngRoute', 'ngFileUpload'])
angular.module('furniture2')
	.controller('mainController', ['$scope', '$http', 'Upload', function($scope, $http, Upload) {
		$scope.loggedIn = undefined;
		var itemsArray = [];
		var authCheck = function() {
			$http.get('/api/me').then(function(returnData) {
				$scope.user = returnData.data;
				console.log(returnData.data);
				if(returnData.data !== "") {
					$scope.loggedIn = true;
				}
				else {
					$scope.loggedIn = false;
				}
				if($scope.loggedIn === true) {
					$scope.auth = "A D M I N";
				}
				if($scope.loggedIn === false) {
					$scope.auth = "R | F";
				}
				console.log($scope.loggedIn);
				console.log($scope.auth);
			});
		};
		authCheck();
	$scope.$watch(function() {
		return $scope.file
	}, function() {
		$scope.upload($scope.file);
	});

	$scope.upload = function(file) {
		$scope.loggedIn = true;
		if(file) {
			file.upload = Upload.upload({
				url: '/api/profile/editPhoto',
				method: 'POST',
				data: {file: file, userId: $scope.user._id}
			});
			file.upload.then(function(response) {
				file.result = response.data;
			});
		};	
	};
	var refresh = function(id) {
		var data = {}
		$http.get('/api/items/get', data).success(function(response) {
			$scope.itemsArray = response;
			$scope.item = "";
			$scope.count = $scope.itemsArray.length.toString();
			$scope.user.image = $scope.user.image || 'https://s-media-cache-ak0.pinimg.com/236x/8e/29/f2/8e29f2925bc2e7d5a05fa21f369ab80f.jpg';
		});
	};
	refresh();
		$scope.addDining = function() {
			var itemsArray = [];
			var request = {
				name: $scope.item.name,
				type: 'dining',
				length: $scope.item.length,
				width: $scope.item.width,
				height: $scope.item.height,
				price: $scope.item.price,
				location: $scope.item.location,
				description: $scope.item.description,
				image: $scope.item.image
			}
			$http.post('/api/items/post', request).success(function(response) {
				$scope.itemsArray.push(response);
				refresh();
			}).error(function(error) {
				console.log(error);
			});
		};
		$scope.addLiving = function() {
			var itemsArray = [];
			var request = {
				name: $scope.item.name,
				type: 'living',
				length: $scope.item.length,
				width: $scope.item.width,
				height: $scope.item.height,
				price: $scope.item.price,
				location: $scope.item.location,
				description: $scope.item.description,
				image: $scope.item.image
			}
			$http.post('/api/items/post', request).success(function(response) {
				$scope.itemsArray.push(response);
				refresh();
			}).error(function(error) {
				console.log(error);
			});
		};
		$scope.addOffice = function() {
			var itemsArray = [];
			var request = {
				name: $scope.item.name,
				type: 'office',
				length: $scope.item.length,
				width: $scope.item.width,
				height: $scope.item.height,
				price: $scope.item.price,
				location: $scope.item.location,
				description: $scope.item.description,
				image: $scope.item.image
			}
			$http.post('/api/items/post', request).success(function(response) {
				$scope.itemsArray.push(response);
				refresh();
			}).error(function(error) {
				console.log(error);
			});
		};
		$scope.addBedroom = function() {
			var itemsArray = [];
			var request = {
				name: $scope.item.name,
				type: 'bedroom',
				length: $scope.item.length,
				width: $scope.item.width,
				height: $scope.item.height,
				price: $scope.item.price,
				location: $scope.item.location,
				description: $scope.item.description,
				image: $scope.item.image
			}
			$http.post('/api/items/post', request).success(function(response) {
				$scope.itemsArray.push(response);
				refresh();
			}).error(function(error) {
				console.log(error);
			});
		};
	$scope.delete = function(id) {
		$http.delete('/api/items/delete/' + id).success(function(response) {
			refresh();
		});	
	};
}]);
angular.module('furniture2')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/main', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/home', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/dining', {
			templateUrl: '/html/dining.html', 
			controller: 'mainController'
		})
		.when('/living', {
			templateUrl: '/html/living.html', 
			controller: 'mainController'
		})
		.when('/office', {
			templateUrl: '/html/office.html', 
			controller: 'mainController'
		})
		.when('/bedroom', {
			templateUrl: '/html/bedroom.html', 
			controller: 'mainController'
		})
		.when('/seeAll', {
			templateUrl: '/html/seeAll.html', 
			controller: 'mainController'
		})		
	}]);
}());