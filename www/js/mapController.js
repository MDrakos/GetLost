angular.module('starter.controllers')

  .constant('SHORT_STYLE', {"color": "#FFE403", "weight": 5, "opacity": 0.65})

  // Angular service to persist the map and layer between page loads.
  .service('mapReference', function () {
    this.map = null;
    this.layer = null;
    this.currentLocation = null;
  })

  .controller('MapCtrl', ['$scope', '$stateParams', 'MapService', 'SHORT_STYLE', 'mapReference', function ($scope, $stateParams, MapService, SHORT_STYLE, mapReference) {

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

    })
    .error(function (errors) {
      console.log("getTrail Errors:" + errors);
    });

    // Function for centering over the users current location
    $scope.locate = function(){

      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords);
          var latLng = [position.coords.latitude, position.coords.longitude];
          mapReference.map.setView(latLng, 15);

          if (mapReference.currentLocation === null) {
            mapReference.currentLocation = L.marker(latLng, {
              message: "You Are Here",
              focus: true,
              draggable: false
            }).addTo(mapReference.map);
          } else{
            mapReference.currentLocation.setLatLng(latLng);
          }
        }, function(err) {
          // error
          console.log("Location error!");
          console.log(err);
        });
    };

  }]);