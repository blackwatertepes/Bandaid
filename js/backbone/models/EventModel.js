var EventModel = Backbone.Model.extend({
  defaults: {
    letter: '',
    time: '',
    date: '',
    day: '',
    month: '',
    venue: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    event_url: 'http://ticketmaster.com',
    map_url: 'http://maps.google.com',
    marker_id: 0,
    event_id: 0
  }
});