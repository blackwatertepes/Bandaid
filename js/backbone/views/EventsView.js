var EventsView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'addItem');

    this.counter = 0;
    this.render();
  },

  render: function() {
    var date = new Date();
    var day = Datetime.getDay(date.getDay());
    var month = Datetime.getMonth(date.getMonth());
    var dat = Datetime.getDate(date.getDate());
    var formattedDate = day + ', ' + month + ' ' + dat;
    var template = $('#eventsTP').html();
    this.template = $(Mustache.to_html(template, {date: formattedDate}))[0];

    this.spinner = new Spinner().spin();
    $('#events', this.template).append(this.spinner.el);
    $(this.spinner.el).css("left", "200px").css("top", "200px");
  },

  updateDate: function(day, month, date) {
    $('#showing #date').text(day + ', ' + month + ' ' + date);
  },

  addItem: function(time, name, place, event_url, map_url, event_id, lat, lon) {
    $(this.spinner.el).remove();
    var letter = Alphabet.getLetter(this.counter).toUpperCase();
    var marker = Map.addMarker({latitude: lat, longitude: lon, letter: letter});

    var event = new EventView({letter: letter, time: time, place: place, name: name, event_url: event_url, map_url: map_url});
    $("#events", this.template).append(event.template);

    this.counter++;
  }
});