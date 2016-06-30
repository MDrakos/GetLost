angular.module('starter.controllers')

  .controller('ExploreCtrl', function ($scope) {
    $scope.maps = [
      {title: 'Otway', id: 1},
      {title: 'Pidherny', id: 2},
      {title: 'UNBC', id: 3},
      {title: 'Moores Meadow', id: 4},
      {title: 'Cottonwood Park', id: 5}
    ]
  })

  .controller('MapCtrl', function ($scope) {

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

    // initiate leaflet map
    var map = new L.Map('cartodbMap', {
      center: [53.966, -122.88],
      zoom: 14,
      layers: [Esri_WorldImagery]
    });

    // // create the tile layer with correct attribution
    // var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // // var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    // var osmAttrib='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    //
    // L.tileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib}).addTo(map);

    var layerUrl = 'https://sparkgeo.cartodb.com/api/v2/viz/5d02bb8c-0a03-11e5-a7d9-0e018d66dc29/viz.json';

    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {

      }).on('error', function() {
      //log the error
    });

  });