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
    // initiate leaflet map
    var map = new L.Map('cartodbMap', {
      center: [53.966, -122.88],
      zoom: 2
    });

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    L.tileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib}).addTo(map);

    var layerUrl = 'https://sparkgeo.cartodb.com/api/v2/viz/5d02bb8c-0a03-11e5-a7d9-0e018d66dc29/viz.json';

    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {

      }).on('error', function() {
      //log the error
    });


  });