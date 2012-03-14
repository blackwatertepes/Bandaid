var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
  },

  changeDate: function() {
    var template = $('#calendarTP').html();
    var html = Mustache.to_html(template);
    $("content").html(html);
  }
});

var appView = new AppView();