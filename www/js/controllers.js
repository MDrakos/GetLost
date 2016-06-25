//INITIALIZE GLOBAL PREFERENCES ----------------------------------------
const Global = {
	
	Favorites: [
		{ name: 'Something Trail1', location: 'Something Park1', img: 'img/ionic.png', id: 1 }
	],
	
	AppPrefs: {
		uselocation: true,
		notifications: {news: true},
		history: ["location 1", "location 2"]
	},
	
	Private:{},
	
	saveTo: function(name, data){
		let storage = new Storage(SqlStorage, {
			name: 'getlost',
			existingDatabase: true
		});
		storage.set(name, data);
	},
	
	loadFrom: function(name){
		let storage = new Storage(SqlStorage, {
			name: 'getlost',
			existingDatabase: true
		});
		return storage.get("global");
	},
	
	serialize: function(){
		//Serialize Global to string
		var serialize = {};
		for(var field in this){
			if(field.startsWith("[private]") || field == "Private" || typeof this[field] === "function")
				continue;
			
			serialize[field] = this[field];
		}
		var str = JSON.stringify(serialize);

		this.saveTo("global", str);
	},
	
	deserialize: function(){
		var me = this;
		this.loadFrom("global").then((global) => {
			var deserialize = JSON.parse(global);
				
			for(var field in deserialize){
				me[field] = deserialize[field];
			}
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
	$scope.prefs = Global.AppPrefs;
})

.controller('HistoryCtrl', function($scope, $stateParams){
	//Functions for history
	$scope.history = Global.AppPrefs.history;
})

.controller('ContactCtrl', function($scope, $stateParams){
	$scope.phones = [
		{number: "+1-250-000-000", purpose: "company"},
		{number: "+1-250-000-001", purpose: "private"}
	];
	$scope.emails = [
		{address: "something@something.ca", purpose: "company"}
	];
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
  
.controller('FavouritesCtrl', function($scope){
	$scope.favourites = Global.Favorites;
  $scope.selectFav = function(favourite)
  {
    $scope.selectedFav = favourite;
  }
})

.controller('FavouriteCtrl', function($scope){
	
});