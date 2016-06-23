angular.module('starter.factories', [])

// Services for fetching data from CartoDB
  .service('MapService', function () {

    var sql = new cartodb.SQL({user: 'sparkgeo', format: 'geojson'});

    return {
      // Get the data for trail
      getTrail: function (layerName, trailID) {

        var sqlString = "SELECT * FROM {{layerName}} WHERE cartodb_id={{trailID}}";

        var args = {
          layerName: layerName,
          trailID: trailID
        };

        return sql.execute(sqlString, args);
      },

      // Get a list of trails for a layer
      listTrails: function (layerName) {

        var sqlString = "SELECT * FROM {{layerName}}";

        var args = {
          layerName: layerName
        };

        return sql.execute(sqlString, args);
      }
    };

  });