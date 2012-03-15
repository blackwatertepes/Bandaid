var EventsView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'showBite', 'showBrew', 'showPlaces', 'gotPlaces', 'clearPlaces');

    this.place_markers = new Array();
    this.counter = 0;
    this.render();
  },

  render: function() {
    var date = new Date();
    var day = Datetime.getDay(date.getDay());
    var month = Datetime.getMonth(date.getMonth());
    var dat = Datetime.getDate(date.getDate());
    var formattedDate = day + ', ' + month + ' ' + dat;

    var t = this;
    $.get('templates/events.html?c='+Math.random(), function(template) {
      t.template = $(Mustache.to_html(template, {date: formattedDate}));
      $("content").html(t.template);

      t.spinner = new Spinner().spin();
      $('#events', t.template).append(t.spinner.el);
      $(t.spinner.el).css("left", "200px").css("top", "200px");

      t.showEvents();

      Map.init(t.options.location);
    });

    $.get('templates/event.html?c='+Math.random(), function(template) {
      t.event_template = template;
    });
  },

  updateDate: function(day, month, date) {
    $('#events .showing .date').text(day + ', ' + month + ' ' + date);
  },

  addItem: function(time, name, place, event_url, map_url, event_id, lat, lon) {
    $(this.spinner.el).remove();
    var letter = Alphabet.getLetter(this.counter).toUpperCase();
    var marker = Map.addMarker({latitude: lat, longitude: lon}, letter);

    var event = new EventView({template: this.event_template, letter: letter, time: time, place: place, name: name, event_url: event_url, map_url: map_url, marker_id: marker.__gm_id});

    this.counter++;
  },

  showBite: function(id) {
    this.moveMap(id);
    this.showPlaces(id, 'restaurants', 'food');
  },

  showBrew: function(id) {
    this.moveMap(id);
    this.showPlaces(id, 'bars', 'beer');
  },

  moveMap: function(id) {
    Map.panTo(id);
    Map.setZoom(16);
  },

  showEvents: function() {
    $('#places').hide();
    $('#events').show();
  },

  showPlaces: function(id, category, term) {
    this.clearPlaces();
    $('#events').hide();
    $('#places').show();
    var marker = Map.getMarkerById(id);
    var places = Yelp.getPlaces(this.gotPlaces, category, term, marker.position.Ua, marker.position.Va);
  },

  gotPlaces: function(places) {
    var t = this;
    $.each(places, function(key, val){
      var letter = Alphabet.getLetter(key).toUpperCase();
      var marker = Map.addMarker({latitude: val.latitude, longitude: val.longitude}, letter, 'blue');
      t.place_markers.push(marker);
    });
  },

  clearPlaces: function() {
    $.each(this.place_markers, function(key, val){
      Map.removeMarker(val);
    });
    this.place_markers = [];
  }
});