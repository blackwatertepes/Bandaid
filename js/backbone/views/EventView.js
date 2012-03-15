var EventView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    var o = this.options;
    this.template = $(Mustache.to_html(o.template, {letter: o.letter, time: o.time, place: o.place, name: o.name, event_url: o.event_url, map_url: o.map_url, marker_id: o.marker_id, event_id: o.event_id}));
    $("#events").append(this.template);
  }
});