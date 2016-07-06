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
    $state.go('app.explore');
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
  
.controller('ExploreCtrl', function($scope, $ionicFilterBar, geojsonService) {
  $scope.dataset           = geojsonService.getData(); //get geojson data
  $scope.datas             = $scope.dataset;           //duplicate set of data that is filtered by app
  var segmentSelectedIndex = 3;                        //stores current segment selection

  //filter bar control
  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      //items to be filtered
      items: $scope.datas,
      //update function
      update: function (filteredItems) {
        $scope.datas = filteredItems;
      },
      filterProperties: 'name'  //filter by name
    });
  };

  //segment bar control
  $scope.buttonClicked = function (index) {
    segmentSelectedIndex = index; //store current index
    //find the wanted difficulty based on index
    var diff = 'all';
    if (index === 0)   { diff = 'green';  }
    if (index === 1)   { diff = 'blue';   }
    if (index === 2)   { diff = 'black';  }
    if (index === 3)   { diff = 'all';    }
    $scope.datas = $scope.dataset; //reload full data
    //if the 'all' is selected, do nothing. Else filter by difficulty
    if (diff !== 'all') {
      $scope.datas = $scope.datas.filter( function(data) {
        return data.difficulty === diff;
      })
    }
  };
  
  //refresher function
  $scope.repullData = function() {
    //repull geojson data
    $scope.dataset = geojsonService.getData();
    //refilter data depending on what segment button is selected
    $scope.buttonClicked(segmentSelectedIndex);
    //stop from refreshing
    $scope.$broadcast('scroll.refreshComplete');
  };
})

;