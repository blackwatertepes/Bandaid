var EventsView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'addEvent', 'showBite', 'showBrew', 'showPlaces', 'gotPlaces', 'clearEvents', 'clearPlaces');

    this.event_markers = new Array();
    this.place_markers = new Array();
    this.counter = 0;
    this.import();
  },

  import: function() {
    var date = new Date();
    var day = Datetime.getDay(date.getDay());
    var month = Datetime.getMonth(date.getMonth());
    var dat = Datetime.getDate(date.getDate());
    var formattedDate = day + ', ' + month + ' ' + dat;

    var t = this;
    $.get('templates/events.html?c='+Math.random(), function(template) {
      t.template = $(Mustache.to_html(template, {date: formattedDate}));
      $("content").html(t.template);

      t.render();
    });

    $.get('templates/event.html?c='+Math.random(), function(template) {
      t.event_template = template;
    });

    $.get('templates/place.html?c='+Math.random(), function(template) {
      t.place_template = template;
    });
  },

  render: function() {
    this.spinner = new Spinner().spin();
    $('#events', this.template).append(this.spinner.el);
    $(this.spinner.el).css("left", "200px").css("top", "200px");

    try {
      Map.init(this.options.location);
    } catch (error) {
      console.warn("Map.init()::Failure");

    }
    this.showEvents();
  },

  updateDate: function(day, month, date) {
    $('#events .showing .date').text(day + ', ' + month + ' ' + date);
  },

  showEventsSpinner: function() {
    $('#events', this.template).append(this.spinner.el);
  },

  showPlacesSpinner: function() {
    $('#places', this.template).append(this.spinner.el);
  },

  addEvent: function(o) {
    $(this.spinner.el).remove();
    var letter = Alphabet.getLetter(this.counter).toUpperCase();
    var marker = Map.addMarker({latitude: o.lat, longitude: o.lon}, letter);
    this.event_markers.push(marker);

    var event = new EventView({template: this.event_template, letter: letter, time: o.time, place: o.place, name: o.name, event_url: o.event_url, map_url: o.map_url, marker_id: marker.__gm_id, event_id: o.event_id});

    this.counter++;
  },

  addPlace: function(o) {
    $(this.spinner.el).remove();
    var letter = Alphabet.getLetter(this.counter).toUpperCase();

    var place = new PlaceView({template: this.place_template, letter: letter, name: o.name, address: o.address, rating_img: o.rating_img, photo_img: o.photo_img, map_url: o.map_url, place_url: o.place_url});

    this.counter++;
  },

  showBite: function(marker_id, event_id) {
    this.moveMap(marker_id);
    this.showPlaces(marker_id, event_id, 'restaurants', 'food');
  },

  showBrew: function(marker_id, event_id) {
    this.moveMap(marker_id);
    this.showPlaces(marker_id, event_id, 'bars', 'beer');
  },

  moveMap: function(id) {
    Map.panToMarker(id);
    Map.setZoom(16);
  },

  showEvents: function() {
    this.clearPlaces();
    $('#places').hide();
    $('#events').show();
    Map.panTo(this.options.location);
    Map.setZoom(12);
  },

  showPlaces: function(marker_id, event_id, category, term) {
    this.showPlacesSpinner();
    this.clearPlaces();
    $('#events').hide();
    $('#places .term').html(category);
    var event = appView.getEventById(event_id);
    $('#places .venue').html(event.venue_name);
    $('#places').show();
    var marker = Map.getMarkerById(marker_id);
    var places = Yelp.getPlaces(this.gotPlaces, category, term, marker.position.Ua, marker.position.Va);
  },

  gotPlaces: function(places) {
    var t = this;
    this.counter = 0;
    $.each(places, function(key, val){
      var letter = Alphabet.getLetter(key).toUpperCase();
      var coords = val.location.coordinate;
      var marker = Map.addMarker({latitude: coords.latitude, longitude: coords.longitude}, letter, 'blue');
      t.place_markers.push(marker);
      var map_url = "http://maps.google.com/maps?q="+val.location.address+", "+val.location.city+", "+val.location.state_code;
      t.addPlace({name: val.name, address: val.location.address, rating_img: val.rating_img_url, photo_img: val.image_url, map_url: map_url, place_url: val.url});
    });
  },

  clearEvents: function() {
    $.each(this.event_markers, function(key, val){
      Map.removeMarker(val);
    });
    this.event_markers = [];
    this.counter = 0;
    $('#events .event').remove();
  },

  clearPlaces: function() {
    $.each(this.place_markers, function(key, val){
      Map.removeMarker(val);
    });
    this.place_markers = [];
    $('#places .place').remove();
  }
});