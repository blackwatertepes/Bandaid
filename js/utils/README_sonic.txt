Sonic Living API Javascript Wrapper
Open Source Licensed

Author: Tyler J. Kuhn
Copyright 2012

Dependent on jQuery

Sonic Class Methods
(*) Denotes required parameter

Example Usage:
Sonic.key = 'your_sonic_api_key';
Sonic.getMethods(callback);

!IMPORTANT!
You must set an api key before calling the API

getMethods(callback:Function)
  Returns all available methods for the given API key

getEventRSVP(callback:Function, *event_id:Integer)
  Returns the RSVP count for an event

getEvents(callback:Function, *event_ids:Array(Integers), host_info:Boolean, offset:Integer)
  Returns details for specific event(s)

getEventsByPerformers(callback:Function, *performer_ids:Array(Integers||Performer Objects))
  Returns upcoming events for performer(s)

getEventsByVenues(callback:Function, venue_ids:Array(Integers||Venue Objects))
  Returns upcoming events for venue(s)

getEventsPopular(callback:Function, sort:String='popular'||'date')
  Returns the most popular events

getEventsPopularByIP(callback:Function, *ip:IP, sort:String='popular'||'date', limit:Integer=25)

getEventsPopularByLongLat(callback, coords, _sort, _limit)
getLocationsByZip(callback, zip, _radius)
getLocationsByIP(callback, ip, _radius)
getLocationsByLatLong(callback, coords, _radius)
getLocationsByName(callback, name)
getPerformer(callback, id)
getPerformerByName(callback, name)
getPerformers(callback, ids)
getPerformersByGUID(callback, guids, _host)
getPerformersByName(callback, name, _hosts)
getVenue(callback, id)
getVenueByName(callback, name)
getVenueByNameCity(callback, name, _city)
getVenuesByCity(callback, city)

request(type, callback, params)