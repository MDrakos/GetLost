angular.module('starter.controllers', [])

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
    //Create Map...
  });