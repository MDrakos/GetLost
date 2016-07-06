angular.module('starter.controllers')

  .controller('ExploreCtrl', function ($scope, MapService) {
    MapService.listTrails().done(function(data){
      var features = data.features;
      $scope.maps = features;
    });
  })

  .controller('MapCtrl', function ($scope, MapService) {
    MapService.getTrail($stateParams.playlistId).done(function(data){
      console.log(data);
      $scope.geojson = data;
    });
  });