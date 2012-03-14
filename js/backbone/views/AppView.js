var AppView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'render', 'changeDate', 'goHome');

    this.location = {latitude: 37.760673, longitude: -122.429968};

    this.changeDate();
  },

  render: function() {
    this.eventsView = new EventsView();
    $("content").html(this.eventsView.template);

    Map.init(this.location);
  },

  changeDate: function() {
    this.calendarView = new CalendarView();
    $("content").html(this.calendarView.template);
  },

  goHome: function() {
    $('content').html(this.eventsView.template);
  }
});