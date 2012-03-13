(function(window) {

  function Datetime() {
    throw ("Datetime cannot be instantiated.");
  }

  Datetime.getDay = function(n) {
    var day;
    switch (n) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
    }
    return day;
  }

  Datetime.getMonth = function(n) {
    var month;
    switch (n) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    return month;
  }

  Datetime.getDate = function(date) {
    var ist;
    switch (date) {
      case 1:
      case 21:
      case 31:
        ist = 'st';
        break;
      case 2:
      case 22:
        ist = 'nd';
        break;
      case 3:
      case 23:
        ist = 'rd';
        break;
      default:
        ist = 'th';
    }
    return date + ist;
  }

  Datetime.formatDatetime = function(datetime) {
    var date = Datetime.formatDate(datetime.substr(5, 5));
    var time = Datetime.formatTime(datetime.substr(11, 5));

    return date + ' @ ' + time;
  }

  Datetime.formatDate = function(date) {
    var mon = date.substr(0, 2);
    var d = date.substr(3, 2);

    var month = Datetime.getMonth(parseInt(mon)-1);
    var day = Datetime.getDate(parseInt(d));

    date = month + ' ' + day;

    return date;
  }

  Datetime.formatTime = function(time) {
    var hour = time.substr(0, 2);
    if (hour > 12) {
      hour = parseInt(hour - 12);
      time = hour + time.substr(2) + 'pm';
    } else {
      time = time + 'am';
    }

    return time;
  }

window.Datetime = Datetime;
})(window);