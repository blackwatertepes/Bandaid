var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'changeDate', 'goHome');

    this.location = {latitude: 37.760673, longitude: -122.429968};

    this.render();
  },

  render: function() {
    this.eventsView = eventsView = new EventsView({location: this.location});
  },

  changeDate: function() {
    if (!this.calendarView) {
      this.calendarView = new CalendarView()
    } else {
      $('content').html(this.calendarView.template);
    }
  },

  goHome: function() {
    $('content').html(this.eventsView.template);
  }
});

var eventsView;