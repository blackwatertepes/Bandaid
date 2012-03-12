// Sonic Living API Javascript Wrapper
// Open Source Licensed
//
// Author: Tyler J. Kuhn
// Copyright 2012
//
// Dependent on jQuery

(function(window) {

  function Sonic() {
    throw ("Sonic cannot be instantiated.");
  }

  Sonic.getMethods = function(callback) {
    Sonic.request('reflection/methods', callback);
  }

  Sonic.getEventRSVP = function(callback, id) {
    Sonic.request('event/ursvp', callback, {event_id: id});
  }

  Sonic.getEvents = function(callback, ids, _host, _offset) {
    var host = _host || false;
    var offset = _offset || 0;
    Sonic.request('event/get', callback, {event_id: ids, host: host, offset: offset})
  }

  Sonic.getEventsByPerformers = function(callback, ids) {
    if (typeof ids[0] == 'object') {
      ids = Sonic.getIds(ids, 'performer_id');
    }
    Sonic.request('performer/upcoming', callback, {performer_id: ids});
  }

  Sonic.getEventsByVenues = function(callback, ids) {
    if (typeof ids[0] == 'object') {
      ids = Sonic.getIds(ids, 'master_venue_id');
    }
    Sonic.request('venue/upcoming', callback, {venue_id: ids});
  }

  Sonic.getEventsPopular = function(callback, _sort) {
    var sort = _sort || 'popular';
    Sonic.request('event/popular', callback, {sort: sort});
  }

  Sonic.getEventsPopularByIP = function(callback, ip, _sort, _limit) {
    var sort = _sort || 'date';
    var limit = _limit || 25;
    Sonic.request('event/popular_by_ip', callback, {ip: ip, sort: sort, limit: limit});
  }

  Sonic.getEventsPopularByLongLat = function(callback, coords, _sort, _limit) {
    var sort = _sort || 'date';
    var limit = _limit || 25;
    Sonic.request('event/popular_by_ip', callback, {latitude: coords.latitude, longitude: coords.longitude, sort: sort, limit: limit});
  }

  Sonic.getLocationsByZip = function(callback, zip, _radius) {
    var radius = _radius || 1;
    Sonic.request('location/locate', callback, {postalcode: zip, radius: radius});
  }

  Sonic.getLocationsByIP = function(callback, ip, _radius) {
    var radius = _radius || 1;
    Sonic.request('location/locate', callback, {ip_address: ip, radius: radius});
  }

  Sonic.getLocationsByLatLong = function(callback, coords, _radius) {
    var radius = _radius || 1;
    Sonic.request('location/locate', callback, {latitude: coords.latitude, longitude: coords.longitude, radius: radius});
  }

  Sonic.getLocationsByName = function(callback, name) {
    Sonic.request('location/recognize', callback, {search: name});
  }

  Sonic.getPerformer = function(callback, id) {
    Sonic.request('performer/get', callback, {performer_id: id});
  }

  Sonic.getPerformerByName = function(callback, name) {
    Sonic.request('performer/get', callback, {search: name});
  }

  Sonic.getPerformers = function(callback, ids) {
    Sonic.request('performer/get', callback, {performer_id: ids});
  }

  Sonic.getPerformersByGUID = function(callback, guids, _host) {
    if (typeof guids[0] == 'object') {
      ids = Sonic.getIds(guids, 'prop');
    }
    var host = _host || '';
    Sonic.request('performer/get', callback, {performer_guid: guids, host_id: host});
  }

  Sonic.getPerformersByName = function(callback, name, _hosts) {
    var hosts = _hosts || '';
    if (typeof hosts[0] == 'object') {
      ids = Sonic.getIds(hosts, 'prop');
    }
    Sonic.request('performer/search', callback, {search: name, host_id: hosts});
  }

  Sonic.getVenue = function(callback, id) {
    Sonic.request('venue/get', callback, {venue_id: id});
  }

  Sonic.getVenueByName = function(callback, name) {
    Sonic.request('venue/recognize', callback, {search: name});
  }

  Sonic.getVenueByNameCity = function(callback, name, _city) {
    var city = _city || '';
    Sonic.request('venue/lookup', callback, {name: name, city_id: city})
  }

  Sonic.getVenuesByCity = function(callback, city) {
    Sonic.request('venue/lookup', callback, {city_id: city});
  }

  Sonic.request = function(type, callback, params) {
    var url = 'http://api.sonicliving.com/v2/' + type + '?key=' + Sonic.key;

    if (params) {
      $.each(params, function(k, v) {
        url +='&'+k+'='+v;
      });
    }

    console.log('Sonic::request', url);

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(res) {
        console.log('Sonic::response',res.statusCode, res.status, res);
        if (callback) callback(res.data);
      }
    });
  }

  Sonic.getIds = function(objs, prop) {
    var ids = new Array();
    $.each(objs, function(k, v){
      ids.push(v[prop]);
    });
    return ids;
  }

window.Sonic = Sonic;
}(window));