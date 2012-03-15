var PlaceView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    var o = this.options;
    this.template = $(Mustache.to_html(o.template, {letter: o.letter, name: o.name, address: o.address, rating_img: o.rating_img, photo_img: o.photo_img, map_url: o.map_url, place_url: o.place_url}));
    $("#places").append(this.template);
  }
});