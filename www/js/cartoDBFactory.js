angular.module('starter.factories')
// Services for fetching data from CartoDB
  .service('mapService', function () {
    
    // Get the trail data from cartoDB
    this.getTrail = function(layerName, trailName) {
      sql = new cartodb.SQL({user: 'sparkgeo', format: 'geojson'});
      sql.execute("SELECT * FROM " + layerName + " WHERE name='" + trailName + "'")
        .done(function (data) {
          return data;
        })
        .error(function (errors) {
          console.log("fetch trail errors:" + errors);
        });
    }
    
  });