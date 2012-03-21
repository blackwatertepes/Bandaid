var appView;

(function($){
  var date = new Date();

  $(window).ready(function(){
    appView = new AppView();
    window.initSonic();
  });

  // navigator.geolocation.watchPosition(function(pos){
  //   //Only execute the following on the initial location return
  //   if (!location) {
  //     console.log("Location: ", pos.coords.latitude, ' : ', pos.coords.longitude);
  //     location = pos.coords;
  //   }
  // });

  window.initSonic = function() {
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
    appView.venues = getVenuesByLatLong(v, appView.location);
    console.log('Local Venues', appView.venues.length);
    var a = 0;
    var off = 100;
    while(a < appView.venues.length) {
      Sonic.getEventsByVenues(gotEvents, appView.venues.slice(a, a + off));
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

  function gotEvents(e) {
    //console.log(e);
    if (e) {
      var ev = getEventsToday(e);
      if (ev) {
        if (ev.length > 0) {
          appView.addEvents(ev);
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
})(jQuery);