var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'changeDate', 'goHome');

    this.location = {latitude: 37.760673, longitude: -122.429968};

    this.render();
  },

  render: function() {
    if (!this.eventsView) {
      this.eventsView = new EventsView({location: this.location});
    } else {
      this.eventsView.render();
    }
  },

  changeDate: function() {
    if (!this.calendarView) {
      this.calendarView = new CalendarView()
    } else {
      this.calendarView.render();
    }
  },

  goHome: function() {
    $('content').html(this.eventsView.template);
  }
});