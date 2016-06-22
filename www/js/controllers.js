//INITIALIZE GLOBAL PREFERENCES ----------------------------------------
const Global = {
	
	Favorites: [],
	
	AppPrefs: {
		uselocation: true,
		notifications: {news: true},
		history: ["location 1", "location 2"]
	},
	
	Serialize: function(){
		//Serialize Global to string
		var serialize = {};
		for(var field in this){
			if(typeof this[field] === "function"){
				continue;
			}
			
			serialize[field] = this[field];
		}
		var str = JSON.stringify(serialize);
		
		//Write string to file
		 $cordovaFile.writeFile(cordova.file.dataDirectory,"userprefs.pref", str, true).then(function(result) {
					// Success! 
					console.log("Saved file.");
			}, function(err) {
					// An error occured. Show a message to the user
					console.log("Cannot write file.");
			});
	},
	
	Deserialize: function(){
		var me = this;
		//Read in file
		$cordovaFile.readAsText(cordova.file.dataDirectory, "userprefs.pref")
      .then(function (success) {
        // success
				var deserialize = JSON.parse();
				
				for(var field in deserialize){
					me[field] = deserialize[field];
				}
				
      }, function (error) {
        // error
				console.log("Cannot read file.");
      });

	}
}

//INITIALIZE ANGULAR MODULE --------------------------------------------

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SettingsCtrl', function($scope, $stateParams){
	//Functions for settings menu
	$scope.uselocation = Global.AppPrefs.uselocation;
	$scope.notifications = Global.AppPrefs.notifications;
})

.controller('HistoryCtrl', function($scope, $stateParams){
	//Functions for history
	$scope.history = Global.AppPrefs.history;
})

.controller('StartCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  $scope.photos = [
    { icon: 'img/trail1.jpg', id: 1 },
    { icon: 'img/trail2.jpg', id: 2 },
    { icon: 'img/trail3.jpg', id: 3 },
    { icon: 'img/trail4.jpg', id: 4 },
    { icon: 'img/trail5.jpg', id: 5 },
    { icon: 'img/trail6.jpg', id: 6 },
    { icon: 'img/trail7.jpg', id: 7 },
    { icon: 'img/trail8.jpg', id: 8 }
  ];
  $scope.startApp = function() {
    $state.go('app');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

