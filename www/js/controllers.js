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
	$scope.history = Global.History;
	$scope.clear = function(){
		while(Global.History.length > 0){
			Global.History.shift();
		}
	}
	$scope.goto = function(id){
		console.log(id);
	}
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
  $scope.selectFav = function(favourite)
  {
    $scope.selectedFav = favourite;
  }
})

.controller('FavouriteCtrl', function($scope, $stateParams) {

})

.service('TrailService', function(){
  this.fullTrailList = null;
  this.currentTrailList = null;
})

.controller('ExploreCtrl', function($scope, $state, $ionicFilterBar, geojsonService, MapService, TrailService) {
	$scope.addhistory = function(name,id){
		Global.History.push({name: name, id: id});
		while(Global.History.length > 100){
			Global.History.shift();
		}
	};
	
  // Fetch for Data source
  MapService.listTrails().done(function(data){

    $scope.dataset = data.features; //get geojson data
    $scope.datas = data.features; //duplicate set of data that is filtered by app

    var segmentSelectedIndex = 3; //stores current segment selection

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

      //refresher function
      $scope.repullData = function() {
        //refilter data depending on what segment button is selected
        $scope.buttonClicked(segmentSelectedIndex);
        //stop from refreshing
        $scope.$broadcast('scroll.refreshComplete');
      };
    }
  });
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

.controller('DetailCtrl', ['$scope', '$stateParams','MapService', 'SHORT_STYLE', 'mapReference', function($scope, $stateParams, MapService, SHORT_STYLE, mapReference) {

	$scope.img = "";			//bg imag, not implemented yet as we have no img references to each layer
	$scope.details = [];	//List of details to display
	$scope.title = ""; 		//Top bar title
	
		var BASE = [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
				})
			}),
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
				})
			})
		];
	
	var id = 1;
	var baselayer = BASE[id];
	$scope.changebase = function(){
		mapReference.map.removeLayer(mapReference.layer);
		mapReference.map.removeLayer(baselayer)
		id++;
		if(id >= BASE.length)
			id = 0;
		baselayer = BASE[id];

		mapReference.map.addLayer(baselayer);
		mapReference.map.addLayer(mapReference.layer);
	}

		MapService.getTrail($stateParams.mapId).done(function(data){
		//Cleanup map
		if(mapReference.map != null){
			mapReference.map.setTarget(null);													//Clear map render target
			var node = document.getElementById('cartodbMap');					//Clear viewport from DOM
			while(node.firstChild){node.removeChild(node.firstChild);}
			mapReference.map.setTarget('cartodbMap');									//Set new render target
			mapReference.map.updateSize();
		}else{
			mapReference.map = new ol.Map({
				controls:[],
				view: new ol.View({
					center:[0,0], zoom: 1
				}),
				layers:[baselayer]
			});
			mapReference.map.setTarget('cartodbMap');			
		}
		
		//Load GeoJSON
		data.crs = {'type': 'name', 'properties':{'name':'EPSG:4326'}};
		mapReference.map.removeLayer(mapReference.layer);
		mapReference.layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: (new ol.format.GeoJSON()).readFeatures(data, {
					featureProjection: mapReference.map.getView().getProjection()
				})
			})
		});
		mapReference.map.addLayer(mapReference.layer);
		
		//Load Trail Details
		var lst = [];
		if(data.features.length >0 && data.features[0].properties){
			lst.push({name: "Name", value: data.features[0].properties.name});
			$scope.title = (""+lst[0].value).replace(/\s*/g,"");
			lst.push({name: "Difficulty", value: data.features[0].properties.difficulty});
			lst.push({name: "Length (m)", value: data.features[0].properties.length});
		}
		$scope.details = lst;

		//ZoomToExtent...
		mapReference.layer.once('postcompose', function(evt){
			console.log("zoom");
			mapReference.map.getView().fit(mapReference.layer.getSource().getExtent(), mapReference.map.getSize());
		});
		
	});
	
	$scope.locate = function(){

      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords);
          var latLng = [position.coords.latitude, position.coords.longitude];
          //Look at latlon point
					mapReference.map.getView().setCenter(ol.proj.transform(latLng, 'EPSG:4326', mapReference.map.getView().getProjection()));
					
					mapReference.currentLocation = latLng;
          
        }, function(err) {
          // error
          console.log("Location error!");
          console.log(err);
        });
    };
}]);