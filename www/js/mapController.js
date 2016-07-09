angular.module('starter.controllers')

  .constant('SHORT_STYLE', {"color": "#FFE403", "weight": 5, "opacity": 0.65})

  // Angular service to persist the map and layer between page loads.
  .service('mapReference', function () {
    this.map = null;
    this.layer = null;
  })

  .controller('ExploreCtrl', function ($scope, $ionicFilterBar, MapService) {
    MapService.listTrails().done(function(data){
      $scope.maps = data.features;
      $scope.mapProps = [];
      for(var i=0; i<$scope.maps.length; i++) {
        $scope.mapProps[i] = ($scope.maps[i]["properties"]);
        $scope.mapProps[i]["favButtonColor"] = "white";
      }
      $scope.filteredMapProps = $scope.mapProps;
    });

    $scope.segmentSelectedIndex = 3; //stores current segment selection
    //filter bar control
    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        //items to be filtered
        items: $scope.filteredMapProps,
        //update function
        update: function (filteredItems) {
          $scope.filteredMapProps = filteredItems;
        },
        filterProperties: 'name'  //filter by name
      });
    };

    //segment bar control
    $scope.buttonClicked = function (index) {
      $scope.segmentSelectedIndex = index; //store current index
      //find the wanted difficulty based on index
      var diff = 'all';
      if (index === 0)   { diff = 'green';  }
      if (index === 1)   { diff = 'blue';   }
      if (index === 2)   { diff = 'black';  }
      if (index === 3)   { diff = 'all';    }
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
      if(map.favButtonColor === "white") {
        map.favButtonColor = "yellow";
      }
      else if(map.favButtonColor === "yellow") {
        map.favButtonColor = "white";
      }
    }
    
    //card clicked (route to new page)
    $scope.cardClicked = function(map) {

    }
  })

  .controller('MapCtrl', function ($scope, $stateParams, MapService, SHORT_STYLE, mapReference) {

    var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Esri_WorldPhysical = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
      maxZoom: 8
    });

    var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    var Esri_DeLorme = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
      minZoom: 1,
      maxZoom: 11
    });

    var currentTileLayer = Esri_WorldTopoMap; // Change this to change the tileLayer

    // Initialize leaflet map
    MapService.getTrail($stateParams.mapId).done(function(data) {
      // Create new layer
      mapReference.layer = L.geoJson(data, {style: SHORT_STYLE});

      if (mapReference.map !== null){
        // Remove the layer, add a new one
        console.log('Map Exists');

        // This is the way it should be done, but does not work...
        // mapReference.map.removeLayer(mapReference.layer);
        // mapReference.map.addLayer(mapReference.layer);

        mapReference.map.remove();

        mapReference.map = new L.Map('cartodbMap', {
          dragging: true,
          layers: [mapReference.layer, currentTileLayer]
        });

      } else {
        // Create new map
        console.log('New Map');
        mapReference.map = new L.Map('cartodbMap', {
          dragging: true,
          layers: [mapReference.layer, currentTileLayer]
        });
      }

      // Fit map to trail bounds
      mapReference.map.fitBounds(mapReference.layer.getBounds());

    });


  });