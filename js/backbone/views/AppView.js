var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'showCal', 'goHome');

    this.location = {latitude: 37.760673, longitude: -122.429968};
    this.events = new Array();
    this.venues = new Array();

    this.render();
  },

  render: function() {
    this.eventsView = eventsView = new EventsView({location: this.location});
    this.calendarView = new CalendarView();
  },

  showEvents: function(month, date) {
    $('content').html(this.eventsView.template);
    eventsView.clearEvents();
    this.addEvents(getEventsByDate(month, date));

    var d = new Date();
    d.setMonth(month);
    d.setDate(date);
    var day = Datetime.getDay(d.getDay());
    var month = Datetime.getMonth(d.getMonth());
    var dat = Datetime.getDate(d.getDate());

    eventsView.updateDate(day, month, dat);
  },

  showCal: function() {
    $('content').html(this.calendarView.template);
  },

  goHome: function() {
    $('content').html(this.eventsView.template);
  },

  addEvents: function(e) {var t = this;
    $.each(e, function(key, val) {
      t.addEvent(val);
    });
  },

  addEvent: function(val) {
    this.events.push(val);
    var v = this.getVenueByID(val.venue_id);
    var time = Datetime.formatDatetime(val.start_datetime);
    if (val.start_datetime.substr(11, 2) == '00' && val.name.match(/\d{1,2}:\d{0,2} ?[aApP][mM]/)) {
      var hour = val.name.match(/\d{1,2}:\d{0,2} ?[aApP][mM]/)[0].replace(' ', '');
      time = time.replace('00:00am', hour.toLowerCase());
    }
    var place = val.venue_name + ', ' + val.venue_city;
    var map_url = "http://maps.google.com/maps?q="+v.address+", "+v.venue_city+", "+v.venue_state;
    this.eventsView.addEvent({time: time, name: val.name, place: place, event_url: val.event_url, map_url: map_url, event_id: val.event_id, lat: v.lat, lon: v.lon});
  },

  addCalendarEvents: function(e) {
    var t = this;
    $.each(e, function(key, val) {
      t.calendarView.addEvent(val);
    });
  },

  highlightMarker: function(id) {
    Map.highlightMarker(id);
  },

  getEventById: function(id) {
    var event;
    $.each(this.events, function(key, val){
      if (val.event_id == id) {
        event = val;
      }
    });
    return event;
  },

  getVenueByID: function(id) {
    var v;
    $.each(this.venues, function(key, val) {
      if (val.master_venue_id == id) {
        v = val;
      }
    });
    return v;
  }
});

var eventsView;