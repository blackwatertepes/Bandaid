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
      animation: google.maps.Animation.DROP,
      icon: 'images/markers/red_Marker'+coords.letter+'.png',
    });

    Map.markers.push(marker);
    return marker;
  }

  Map.getMarkerById = function(id) {
    var marker;
    $.each(Map.markers, function(key, val){
      if (val.__gm_id == id) {
        marker = val;
      }
    });
    return marker;
  }

  window.Map = Map;
}(window));