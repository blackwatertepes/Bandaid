(function($){
  var location;
  var venues = new Array();
  var events = new Array();
  var date = new Date();
  var map;

  navigator.geolocation.watchPosition(function(pos){
    //Only execute the following on the initial location return
    if (!location) {
      console.log("Location: ", pos.coords.latitude, ' : ', pos.coords.longitude);
      location = pos.coords;

      initMap(location);
      initSonic();
    }
  });

  function initMap(coords) {
    var myOptions = {
      zoom: 12,
      center: new google.maps.LatLng(coords.latitude, coords.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    //addMapPoint(coords);
  }

  function addMapPoint(coords) {
    console.log(coords);
    var point = new google.maps.LatLng(coords.latitude, coords.longitude);
    var marker = new google.maps.Marker({
      map: map,
      position: point,
    });
    //marker.setMap(map);
  }

  function initSonic() {
    Sonic.key = 'b3b4c28f';
    //Sonic.getLocationLocate(gotLocation, location.coords);
    Sonic.getVenuesByCity(gotVenues, 27907);
  }

  // function gotLocation(locs) {
  //   var loc = locs[0];
  //   console.log('Got Location:',loc,loc.city+', '+loc.state);
  //   eventsView.setLocation(loc.city + ', ' + loc.state);
  //   //Sonic.getVenueLookup(gotVenues, loc.location_id);
  // }

  function gotVenues(v) {
    console.log('Total Venues:',v.length);
    venues = getVenuesByLatLong(v, location);
    console.log('Local Venues',venues.length);
    var a = 0;
    var off = 100;
    while(a < venues.length) {
      Sonic.getEventsByVenues(gotEvents, venues.slice(a, a + off));
      a += off;
    }
  }

  function getVenuesByLatLong(v, coords) {
    var set = new Array();
    $.each(v, function(key, val){
      if (val.lat && val.lon) {
        var radius = 4;
        if (69.1 * Math.abs(val.lat - coords.latitude) < radius && 69.1 * Math.abs(val.lon - coords.longitude) * Math.cos(coords.longitude / 57.3) < radius) {
          set.push(val);
        }
      }
    });
    return set;
  }

  function getVenueByID(id) {
    var v;
    $.each(venues, function(key, val) {
      if (val.master_venue_id == id) {
        v = val;
      }
    });
    return v;
  }

  function gotEvents(e) {
    //console.log(e);
    if (e) {
      var ev = getEventsToday(e);
      if (ev) {
        if (ev.length > 0) {
          addEvents(ev);
          //Sonic.getEvents(gotEventsDetailed, ev);
        }
      }
    }
  }

  function gotEventsDetailed(e) {
    if (e) {
      if (e.length > 0) {
        Sonic.getPerformers(gotPerformers, e);
      }
    }
  }

  function gotPerformers(e) {
    console.log("Performers",e);
    if (e) {
      $.each(e, function(key, val){
        if (val.image_id)
        addImage(val.image_id);
      });
    }
  }

  function getEventsToday(e) {
    //e.start_datetime = 2012-05-06 17:00:00
    var ev = new Array();
    $.each(e, function(key, val){
      var d = val.start_datetime.substr(8, 2);
      if (d[0] == 0) d = d[1];
      var m = val.start_datetime.substr(5, 2);
      if (m[0] == 0) m = m[1];
      if (m == date.getMonth()+1) {
        if (d == date.getDate()) {
          ev.push(val);
        }
      }
    });
    return ev;
  }

  function addEvents(e) {
    $.each(e, function(key, val) {
      events.push(val);
      var v = getVenueByID(val.venue_id);
      var time = Datetime.formatDatetime(val.start_datetime);
      var place = val.venue_name + ', ' + val.venue_city;
      var map_url = "http://maps.google.com/maps?q="+v.address+", "+v.venue_city+", "+v.venue_state;
      eventsView.addItem(time, val.name, place, val.event_url, map_url, val.event_id);
      addMapPoint({latitude: v.lat, longitude: v.lon});
    });
  }

  function addImage(id) {
    eventsView.addImage("http://img.freebase.com/api/trans/raw" + id);
  }

  window.showBite = function(id) {
    console.log(id);
  }

  window.showBrew = function(id) {
    console.log(id);
  }
})(jQuery);