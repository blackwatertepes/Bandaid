(function($){
  var location;
  var venues = new Array();
  var events = new Array();
  var date = new Date();

  navigator.geolocation.watchPosition(function(pos){
    //Only execute the following on the initial location return
    if (!location) {
      console.log("Location: ", pos.coords.latitude, ' : ', pos.coords.longitude);
      location = pos.coords;

      initSonic();
    }
  });

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
      events = getEventsToday(e);
      if (events) addEvents(events);
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
      if (d == date.getDate() && m == date.getMonth()+1) {
        ev.push(val);
      }
    });
    return ev;
  }

  function addEvents(e) {
    $.each(e, function(key, val) {
      var v = getVenueByID(val.venue_id);
      var time = Datetime.formatDatetime(val.start_datetime);
      var place = val.venue_name + ', ' + val.venue_city
      var map_url = "http://maps.google.com/maps?q="+v.address+", "+v.venue_city+", "+v.venue_state;
      eventsView.addItem(time, val.name, place, val.event_url, map_url);
    });
  }
})(jQuery);