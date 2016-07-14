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

.controller('SettingsCtrl', function($scope, $stateParams){
	//Functions for settings menu
	$scope.prefs = Global.AppPrefs;
	
	$scope.enablegps = function(){
		cordova.dialogGPS();
	}
	
	$scope.serialize = function(){
		Global.serialize(function(output){
			console.log("Serialization successful");
		});
	};
})

.controller('HistoryCtrl', function($scope, $stateParams){
	//Functions for history
	$scope.history = Global.AppPrefs.history;
})

.controller('ContactCtrl', function($scope, $stateParams, $window){
	$scope.phones = [
		{number: "+1-250-960-6490", purpose: "company"},
	];
	$scope.emails = [
		{address: "compnetlab@unbc.ca", purpose: "company"}
	];
	
	$scope.sendmail = function(address){
		Global.getAppInfo(function(appid){
			Global.sendMail({
				to: address,
				subject: "GetLost: feedback",
				body: "<br>---------------------<br>"+appid+"<br>"+Global.getOs()+": "+Global.getVersion()+"<br>"+(new Date()).toDateString(),
				isHtml: true
			});
		});
	}
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
  
.controller('FavouritesCtrl', function($scope){
	$scope.favourites = Global.Favorites;
  $scope.selectFav = function(favourite) {
    $scope.selectedFav = favourite;
  }
})

.controller('ExploreCtrl', function($scope, $state, $ionicFilterBar, geojsonService, MapService, TrailService) {
  // Fetch for Data source
  MapService.listTrails().done(function(data) {
    $scope.maps = data.features;
    $scope.mapProps = [];
    for (var i = 0; i < $scope.maps.length; i++) {
      $scope.mapProps[i] = ($scope.maps[i]["properties"]); //copy the maps properties only
      $scope.mapProps[i]["favButtonColor"] = "white";
      for(var j=0; j < Global.Favorites.length; j++)
        if($scope.mapProps[i]["cartodb_id"] === Global.Favorites[j]["cartodb_id"])
          $scope.mapProps[i]["favButtonColor"] = "yellow";
      $scope.mapProps[i]["img"] = 'img/trail1.jpg';
      $scope.mapProps[i]["location"] = "Otway";
      //change dbl black to dbl_black so as to be able to manipulate it in css
      $scope.mapProps[i]["difficulty"] = $scope.mapProps[i]["difficulty"].replace(" ", "_");
    }
    $scope.filteredMapProps = $scope.mapProps;
  });

  var segmentSelectedIndex = 4; //stores current segment selection
  //filter bar control
  $scope.showFilterBar = function () {
    $ionicFilterBar.show({
      //items to be filtered
      items: $scope.datas,
      //update function
      update: function (filteredItems) {
        $scope.datas = filteredItems;
      },
      filterProperties: 'name'  //filter by name
  })};

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

  //segment bar control
  $scope.buttonClicked = function (index) {
    $scope.segmentSelectedIndex = index; //store current index
    //find the wanted difficulty based on index
    var diff = 'all';
    if (index === 0)   { diff = 'green';        }
    if (index === 1)   { diff = 'blue';         }
    if (index === 2)   { diff = 'black';        }
    if (index === 3)   { diff = 'double_black'; }
    if (index === 4)   { diff = 'all';          }
    $scope.filteredMapProps = $scope.mapProps; //reload full data
    //if the 'all' is selected, do nothing. Else filter by difficulty
    if (diff !== 'all') {
      $scope.filteredMapProps = $scope.filteredMapProps.filter( function(data) {
        return data.difficulty === diff;
      })
    }
  };

  //refresher function
  $scope.repullData = function() {
    //TODO repull map data
    //refilter data depending on what segment button is selected
    $scope.$broadcast('scroll.refreshComplete'); //stops refreshing
  };

  //favourite button click
  $scope.favButtonClick = function(map) {
    //add to favourites
    if(map.favButtonColor === "white") {
      Global.Favorites.push ( map );
      Global.serialize();
      map.favButtonColor = "yellow";
    }
    //remove from favourites
    else if(map.favButtonColor === "yellow") {
      var index = Global.Favorites.indexOf( map );
      if(index > -1) {
        Global.Favorites.splice(index, 1);
        Global.serialize();
      }
      map.favButtonColor = "white";
    }
  };
})

.controller('GalleryCtrl', function($scope, $ionicModal) {
    $scope.gallery = [
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' },
      { 'src' : 'img/ionic.png' }
    ];

    $scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/photo.html');
    };

    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };
})

;