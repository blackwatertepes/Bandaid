var EventsView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'setLocation');

    this.render();
  },

  render: function() {
  },

  addItem: function(time, name, place, event_url, map_url, id) {
    $('#events', this.el).append("<div class='event'><div class='info'>"+time+"<br/><a href='"+event_url+"'>"+name+"</a><br/><a href='"+map_url+"'>"+place+"</a></div><div class='bitebrew'><a class='bite' onclick='showBite("+id+")' href='#'>Get a Bite</a><a class='brew' onclick='showBrew("+id+")' href='#'>Get a Brew</a></div></div>");
  },

  setLocation: function(location) {
    $('#location', this.el).text('for ' + location)
  },

  addImage: function(url) {
    $('#images', this.el).append("<img src="+url+"/>");
  }
});

var eventsView = new EventsView();