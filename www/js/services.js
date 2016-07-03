angular.module('starter.services', ['ngResource'])

  .factory('Session', function ($resource) {
 //   return $resource('http://localhost:5000/sessions/:sessionId');
    return $resource("GetLost/www");
  })

.service("TopLoader", function ($http, $q)
{
  var deferred = $q.defer();
  $http.get('resources/TopRated.json').then(function(data)
  //$http.get('TopRated.json').then(function(data)

  {
    deferred.resolve(data);
  });

  this.TopPark = function (){
    return deferred.promise;
  }
})

;