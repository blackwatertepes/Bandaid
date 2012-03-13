(function(window) {

  Map.map;
  Map.markers = [];

  function Map() {
    throw ("Sonic cannot be instantiated.");
  }

  Map.init = function(coords) {
    var myOptions = {
      zoom: 12,
      center: new google.maps.LatLng(coords.latitude, coords.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    Map.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  }

  Map.addMarker = function(coords) {
    var point = new google.maps.LatLng(coords.latitude, coords.longitude);
    var marker = new google.maps.Marker({
      map: Map.map,
      position: point,
      icon: 'images/markers/red_Marker'+coords.letter+'.png',
    });

    Map.markers.push(marker);
    return marker;
  }

  Map.removeMarker = function(coords) {

  }

  window.Map = Map;
}(window));