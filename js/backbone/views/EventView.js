var EventView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    var o = this.options;
    var template = $('#eventTP').html();
    var html = Mustache.to_html(template, {letter: o.letter, time: o.time, place: o.place, name: o.name, event_url: o.event_url, map_url: o.map_url});
    return html;
  }
});