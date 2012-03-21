// Yelp API Javascript Wrapper
// Open Source Licensed
//
// Author: Tyler J. Kuhn
// Copyright 2012
//
// Dependent on jQuery

(function(window) {

  function Yelp() {
    throw ("Yelp cannot be instantiated.");
  }

  Yelp.getPlaces = function(callback, category, term, lat, lon) {
    var url = 'yelp.php?term='+term+'&cat='+category+'&lat='+lat+'&lon='+lon+'&rad=320&lim=5';

    console.log('Yelp::request', url);

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        console.log('Yelp::response',res);
        if (callback) callback(res.businesses);
      },
      error: function(res) {
        console.error('Yelp::response',res);
      }
    });
  }

window.Yelp = Yelp;
}(window));