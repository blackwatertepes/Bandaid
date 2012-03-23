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
    try {
      var color = color || 'red';
      var point = new google.maps.LatLng(coords.latitude, coords.longitude);
      var marker = new google.maps.Marker({
        map: Map.map,
        position: point,
        animation: google.maps.Animation.DROP,
        icon: 'images/markers/'+color+'_Marker'+letter+'.png',
        zindex: Map.markers.length-1,
      });

      Map.markers.push(marker);
      return marker;
    } catch (error) {
      console.warn("Map.addMarker()::Failure");
    }
  }

  Map.removeMarker = function(marker) {
    try {
      var index = Map.markers.indexOf(marker);
      Map.markers.splice(index, 1);
      marker.setMap(null);
    } catch (error) {
      console.warn("Map.removeMarker()::Failure");
    }
  }

  Map.highlightMarker = function(id) {
    Map.resetMarkers();
    marker = Map.getMarkerById(id);
    marker.setIcon(marker.icon.replace('red', 'yellow'));
    marker.setZIndex(Map.markers.length);
  }

  Map.resetMarkers = function() {
    $.each(Map.markers, function(key, val){
      val.setIcon(val.icon.replace('yellow', 'red'));
      val.setZIndex(key);
    });
  }

  Map.getMarkerById = function(id) {
    try {
      var marker;
      $.each(Map.markers, function(key, val){
        if (val.__gm_id == id) {
          marker = val;
        }
      });
      return marker;
    } catch (error) {
      console.warn("Map.getMarkerById()::Failure");
    }
  }

  Map.panTo = function(location) {
    try {
      var point = new google.maps.LatLng(location.latitude, location.longitude);
      try {
        Map.map.panTo(point);
      } catch (error) {
        console.warn("panTo called without map being initialized!");
      }
    } catch (error) {
      console.warn("Map.panTo()::Failure");
    }
  }

  Map.panToMarker = function(id) {
    try {
      marker = Map.getMarkerById(id);
      Map.map.panTo(marker.position);
    } catch (error) {
      console.warn("Map.panToMarker()::Failure");
    }
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

  Map.showOverlay = function(marker) {
    marker.setMap(Map.map);
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