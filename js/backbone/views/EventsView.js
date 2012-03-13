var EventsView = Backbone.View.extend({
  el: $('body'),

  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'setLocation');

    this.counter = 0;
    this.render();
  },

  render: function() {
    $('#events', this.el).append("<div id='header'><span id='showing'>Showing concerts for <span id='date'></span></span> <button id='change' class='btn btn-mini'><i class='icon-calendar'></i> Change Date</button></div>");
  },

  updateDate: function(date) {
    $('#showing #date').text(date);
  },

  addItem: function(time, name, place, event_url, map_url, event_id, lat, lon) {
    var letter = Alphabet.getLetter(this.counter).toUpperCase();
    var marker = Map.addMarker({latitude: lat, longitude: lon, letter: letter});
    $('#events', this.el).append("<div class='event'><span class='label'>"+letter+"</span><div class='info'> "+time+"<br/><a href='"+event_url+"'>"+name+"</a><br/><a href='"+map_url+"'>"+place+"</a></div><div class='bitebrew'><a class='bite' onclick='showBite("+marker.__gm_id+", "+event_id+")' href='#'>Get a Bite</a><a class='brew' onclick='showBrew("+marker.__gm_id+", "+event_id+")' href='#'>Get a Brew</a></div></div>");
    this.counter++;
  },

  setLocation: function(location) {
    $('#location', this.el).text('for ' + location)
  },

  addImage: function(url) {
    $('#images', this.el).append("<img src="+url+"/>");
  }
});

var eventsView = new EventsView();