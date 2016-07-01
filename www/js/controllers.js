//These will be later stored in seperate json files once being able to load and read from them is susccessful
const Global = {

  AppPrefs: {
    TopRateNum: 4 //number of top rated trails to show on top rated page. (number plus 1!)
  },

  //the current dummy top rated list this will later have to be loaded from a content server
  toplist: [{
    id: 1,
    name: 'park1',
    description: "garbly 1",
    rating: 1,
    images: [
      "img/trail1.jpg",
      "img/trail2.jpg"
    ]
  }, {
    id: 2,
    name: 'park2',
    description: "garbly 2",
    rating: 2,
    images: [
      "img/trail2.jpg"
    ]
  }, {
    id: 3,
    name: 'park3',
    description: "garbly 3",
    rating: 3,
    images: [
      "img/trail3.jpg"
    ]
  }, {
    id: 4,
    name: 'park4',
    description: "garbly 4",
    rating: 4,
    images: [
      "img/trail4.jpg"
    ]
  }, {
    id: 5,
    name: 'park5',
    description: "garbly 5",
    rating: 5,
    images: [
      "img/trail5.jpg"
    ]
  }, {
    id: 6,
    name: 'park6',
    description: "garbly 6",
    rating: 6,
    images: [
      "img/trail6.jpg"
    ]
  }]
};

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

.controller('FavouritesCtrl', function($scope)
{
  $scope.favourites = [
    { name: 'Something Trail1', location: 'Something Park1', img: 'img/ionic.png', id: 1 },
    { name: 'Something Trail2', location: 'Something Park2', img: 'img/ionic.png', id: 2 },
    { name: 'Something Trail3', location: 'Something Park3', img: 'img/ionic.png', id: 3 },
    { name: 'Something Trail4', location: 'Something Park4', img: 'img/ionic.png', id: 4 },
    { name: 'Something Trail5', location: 'Something Park5', img: 'img/ionic.png', id: 5 },
    { name: 'Something Trail6', location: 'Something Park6', img: 'img/ionic.png', id: 6 },
    { name: 'Something Trail7', location: 'Something Park7', img: 'img/ionic.png', id: 7 },
    { name: 'Something Trail8', location: 'Something Park8', img: 'img/ionic.png', id: 8 }
  ];
  $scope.selectFav = function(favourite)
  {
    $scope.selectedFav = favourite;
  }
})

.controller('FavouriteCtrl', function($scope, $stateParams) {

})

  .controller('TopRatedCtrl', function ($scope) {
      $scope.TopParks = Global.toplist;
      $scope.prefs = Global.AppPrefs;
    }
  )



;