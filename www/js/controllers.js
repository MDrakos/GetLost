//INITIALIZE ANGULAR MODULE --------------------------------------------

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
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
  $scope.selectFav = function(favourite) {
    $scope.selectedFav = favourite;
  };
  //refresher function
  $scope.refresh = function() {
    $scope.$broadcast('scroll.refreshComplete'); //stops refreshing
  };
})

  .controller('NearbyCtrl', function($scope, $state, MapService) {
    var myLocation = null;
    $scope.nearby = [];

    $scope.relocate = function() {
      getLocation();
      $scope.mapInfo.sort(function(a,b) {
        return getDistance(a["coords"]) - getDistance(b["coords"]);
      });
      for(var i = 0; i<10; i++) {
        nearby[i] = $scope.mapInfo[i]["properties"];
      }
      $scope.$broadcast('scroll.refreshComplete');
    };

    MapService.listTrails().done(function(data) {
      $scope.maps = data.features;
      $scope.mapInfo = [];
      for (var i = 0; i < $scope.maps.length; i++) {
        $scope.mapInfo[i] = {properties : $scope.maps[i]["properties"],
                            coords : $scope.maps[i]["geometry"]["coordinates"][0]};
        $scope.mapProps[i]["properties"]["favButtonColor"] = "white";
        for(var j=0; j < Global.Favorites.length; j++)
          if($scope.mapInfo[i]["properties"]["cartodb_id"] === Global.Favorites[j]["properties"]["cartodb_id"])
            $scope.mapInfo[i]["properties"]["favButtonColor"] = "yellow";
        $scope.mapInfo[i]["properties"]["img"] = 'img/trail1.jpg';
        $scope.mapInfo[i]["properties"]["location"] = "Otway";
        //change dbl black to dbl_black so as to be able to manipulate it in css
        $scope.mapInfo[i]["properties"]["difficulty"] = $scope.mapInfo[i]["properties"]["difficulty"].replace(" ", "_");
      }
    });

    function getLocation() {
      navigator.geolocation.getCurrentPosition(function(position) {
        myLocation = [position.longitude, position.latitude];
      }, function(error) {
        $state.go('app.settings');
      })
    }

    function getDistance(location) {
      //both myLocation & the location passed are stored as [longitude, latitude]
      if(myLocation = null) {
        $state.go('app.settings');
      }
      var dx = Math.cos(myLocation[0])*Math.cos(myLocation[1])-Math.cos(location[0])*Math.cos(location[1]);
      var dy = Math.sin(myLocation[0])*Math.cos(myLocation[1])-Math.sin(location[0])*Math.cos(location[1]);
      var dz = Math.sin(myLocation[1])-Math.sin(location[1]);
      return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)+Math.pow(dz,2));
    }
  })

.controller('ExploreCtrl', function($scope, $state, $ionicFilterBar, geojsonService, MapService, TrailService) {
	$scope.addhistory = function(name,id){
		Global.History.push({name: name, id: id});
		while(Global.History.length > 100){
			Global.History.shift();
		}
	};

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
      console.log(Global.Favorites);
      var index = Global.Favorites.indexOf( map );
      if(index > -1) {
        Global.Favorites.splice(index, 1);
        Global.serialize();
      }
      map.favButtonColor = "white";
      console.log(Global.Favorites);
    }
  };
})

.controller('GalleryCtrl', function($scope, $ionicModal) {
  $scope.gallery = [];
  for(var i = 1; i<=8; i++) {
    $scope.gallery.add({src: 'img/trail' + i +'.jpg'});
  }

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

.controller('DetailCtrl', ['$scope', '$state', '$stateParams','MapService', 'SHORT_STYLE', 'mapReference', function($scope, $state, $stateParams, MapService, SHORT_STYLE, mapReference) {

  $scope.myGoBack = function() {
    console.log('Go Back Explore');
    $state.go('app.explore');
  };

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
		mapReference.map.removeLayer(baselayer);
		id++;
		if(id >= BASE.length)
			id = 0;
		baselayer = BASE[id];

		mapReference.map.addLayer(baselayer);
		mapReference.map.addLayer(mapReference.layer);
	};

		MapService.getTrail($stateParams.mapId).done(function(data){
		//Cleanup
		if(mapReference.map){
			mapReference.map.setTarget(null);														//Clear old render target
			var node = document.getElementById('cartodbMap');						//Clear viewport dom
			while(node.firstChild){node.removeChild(node.firstChild);};
			mapReference.map.setTarget('cartodbMap');										//Assign new render target, create new viewport
			mapReference.map.renderSync();															//Force render
		}else{
			mapReference.map = new ol.Map({
				target: 'cartodbMap',
				controls:[],
				view: new ol.View({
					center:[0,0], zoom: 1
				}),
				layers:[baselayer]
			});
		}

		//Load GeoJSON
		data.crs = {'type': 'name', 'properties':{'name':'EPSG:4326'}};
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
			$scope.title = (""+data.features[0].properties.name).replace(/\s*/g,"");
			lst.push({name: "Difficulty", value: data.features[0].properties.difficulty});
			lst.push({name: "Length (m)", value: data.features[0].properties.length});
		}
		$scope.details = lst;

		//ZoomToExtent...
		mapReference.layer.once('postcompose', function(evt){
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