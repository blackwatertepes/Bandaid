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

    var t = this;
    $.get('templates/events.html', function(template) {
      t.template = $(Mustache.to_html(template, {date: formattedDate}));
      $("content").html(t.template);

      t.spinner = new Spinner().spin();
      $('#events', t.template).append(t.spinner.el);
      $(t.spinner.el).css("left", "200px").css("top", "200px");

      Map.init(t.options.location);
    });
  },

  updateDate: function(day, month, date) {
    $('#showing #date').text(day + ', ' + month + ' ' + date);
  },

  addItem: function(time, name, place, event_url, map_url, event_id, lat, lon) {
    $(this.spinner.el).remove();
    var letter = Alphabet.getLetter(this.counter).toUpperCase();
    var marker = Map.addMarker({latitude: lat, longitude: lon, letter: letter});

    var event = new EventView({letter: letter, time: time, place: place, name: name, event_url: event_url, map_url: map_url});

    this.counter++;
  }
});