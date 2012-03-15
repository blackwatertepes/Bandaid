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

  Map.addMarker = function(coords, letter, color) {
    var color = color || 'red';
    var point = new google.maps.LatLng(coords.latitude, coords.longitude);
    var marker = new google.maps.Marker({
      map: Map.map,
      position: point,
      animation: google.maps.Animation.DROP,
      icon: 'images/markers/'+color+'_Marker'+letter+'.png',
    });

    Map.markers.push(marker);
    return marker;
  }

  Map.removeMarker = function(marker) {
    var index = Map.markers.indexOf(marker);
    Map.markers.splice(index, 1);
    marker.setMap(null);
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

  Map.panTo = function(location) {
    var point = new google.maps.LatLng(location.latitude, location.longitude);
    try {
      Map.map.panTo(point);
    } catch (error) {
      console.warn("panTo called without map being initialized!");
    }
  }

  Map.panToMarker = function(id) {
    marker = Map.getMarkerById(id);
    Map.map.panTo(marker.position);
  }

  Map.setZoom = function(n) {
    try {
      Map.map.setZoom(n);
    } catch (error) {
      console.warn("panTo called without map being initialized!");
    }
  }

  // Removes the overlays from the map, but keeps them in the array
  Map.clearOverlays = function() {
    if (Map.markers) {
      for (i in Map.markers) {
        Map.markers[i].setMap(null);
      }
    }
  }

  // Shows any overlays currently in the array
  Map.showOverlays = function() {
    if (Map.markers) {
      for (i in Map.markers) {
        Map.markers[i].setMap(Map.map);
      }
    }
  }

  // Deletes all markers in the array by removing references to them
  Map.deleteOverlays = function() {
    if (Map.markers) {
      for (i in Map.markers) {
        Map.markers[i].setMap(null);
      }
      Map.markers.length = 0;
    }
  }

  window.Map = Map;
}(window));