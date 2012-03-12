var EventsView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'setLocation');

    this.render();
  },

  render: function() {
    var self = this;
    $(this.el).append("<h2>Local Events in San Francisco for tonight!</h2>");
    $(this.el).append("<div id='events'></div>")
  },

  addItem: function(time, name, place, event_url, map_url) {
    $('#events', this.el).append("<div id='event'>"+time+"<br/><a href='"+event_url+"'>"+name+"</a><br/><a href='"+map_url+"'>"+place+"</a></div>");
  },

  setLocation: function(location) {
    $('#location', this.el).text('for ' + location)
  }
});

var eventsView = new EventsView();