angular.module('starter.factories', [])

  .constant('LAYER_NAME', 'otway_ski_trails')

// Services for fetching data from CartoDB
  .factory('MapService', function (LAYER_NAME) {

    var sql = new cartodb.SQL({user: 'sparkgeo', format: 'geojson'});

    return {
      // Get the data for trail
      getTrail: function (trailID) {

        var sqlString = "SELECT * FROM {{layerName}} WHERE cartodb_id={{trailID}}";

        var args = {
          layerName: LAYER_NAME,
          trailID: trailID
        };

        return sql.execute(sqlString, args);
      },

      // Get a list of trails for a layer
      listTrails: function () {

        var sqlString = "SELECT * FROM {{layerName}}";

        var args = {
          layerName: LAYER_NAME
        };

        return sql.execute(sqlString, args);
      }
    };

  });