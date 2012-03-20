var PlaceModel = Backbone.Model.extend({
  defaults: {
    letter: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    category: '',
    rating_img_url: '',
    photo_img_url: '',
    map_url: 'http://maps.google.com',
    place_url: 'http://yelp.com',
    event_id: 0,
  }
});