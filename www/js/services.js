angular.module('starter.services', [])

.service('geojsonService', function() {
  //aquire the data
  var request = new XMLHttpRequest();
  var jsonInfo = [];

  //save the city names
  var placeNames = [];

  request.open("GET", "resources/otway_ski_trails.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Otway');

  /*
  request.open("GET", "resources/otway_snowshoe_trails.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Otway');
  request.open("GET", "resources/otway_singletrack_04082016_2.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Otway');
  request.open("GET", "resources/otway_trail_places.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Otway');
  request.open("GET", "resources/pidherny_mtb_places.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Pidherny');
  request.open("GET", "resources/pidherny_08042016.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Pidherny');
  request.open("GET", "resources/pidherny_rec_bdy.geojson", false);
  request.send(null);
  jsonInfo.push(JSON.parse(request.responseText));
  placeNames.push('Pidherny');
  */

  this.getData = function() {
    var data = [];
    var ctr=1;
    for(var i=0; i<jsonInfo.length; i++) {
      for (var j=0; j<jsonInfo[i]["features"].length; j++) {
        var d = {
          placeName: placeNames[i],
          id: jsonInfo[i]["features"][j]["properties"]["cartodb_id"],
          name: jsonInfo[i]["features"][j]["properties"]["name"],
          difficulty: jsonInfo[i]["features"][j]["properties"]["difficulty"],
          iterID: ctr
        }
        data.push(d);
        ctr++;
      }
    }
    return data;
  }
})
  
  
  .service('TrailService', function () {
    this.fullTrailList = null;
    this.currentTrailList = null;
  })


;