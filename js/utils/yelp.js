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

  Yelp.getPlaces = function(callback, category, term, lat, long) {
    var url = 'http://api.yelp.com/business_review_search?category='+category+'&term='+term+'&lat='+lat+'&long='+long+'&radius=0.2&limit=5&ywsid=jdFMj4VwdGp5lK9D94Z6tA';

    console.log('Yelp::request', url);

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(res) {
        console.log('Yelp::response',res.message.text, res);
        if (callback) callback(res.businesses);
      }
    });
  }

window.Yelp = Yelp;
}(window));