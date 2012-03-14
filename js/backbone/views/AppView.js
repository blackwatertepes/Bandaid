var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    this.eventsView = new EventsView();
    $("content").html(this.eventsView.template);
  },

  changeDate: function() {
    var template = $('#calendarTP').html();
    this.calendar_html = Mustache.to_html(template);
    $("content").html(this.calendar_html);
  },

  goHome: function() {
    $('content').html(this.eventsView.template);
  }
});

var appView = new AppView();