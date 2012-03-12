(function(window) {

  function Datetime() {
    throw ("Datetime cannot be instantiated.");
  }

  Datetime.formatDatetime = function(datetime) {
    var date = Datetime.formatDate(datetime.substr(5, 5));
    var time = Datetime.formatTime(datetime.substr(11, 5));

    return date + ' @ ' + time;
  }

  Datetime.formatDate = function(date) {
    var mon = date.substr(0, 2);
    var day = date.substr(3, 2);
    var month;
    switch (mon) {
      case '01':
        month = 'January';
        break;
      case '02':
        month = 'February';
        break;
      case '03':
        month = 'March';
        break;
      case '04':
        month = 'April';
        break;
      case '05':
        month = 'May';
        break;
      case '06':
        month = 'June';
        break;
      case '07':
        month = 'July';
        break;
      case '08':
        month = 'August';
        break;
      case '09':
        month = 'September';
        break;
      case '10':
        month = 'October';
        break;
      case '11':
        month = 'November';
        break;
      case '12':
        month = 'December';
        break;
    }

    var ist;
    switch (parseInt(day.substr(1))) {
      case 1:
        ist = 'st';
        break;
      case 2:
        ist = 'nd';
        break;
      case 3:
        ist = 'rd';
        break;
      default:
        ist = 'th';
    }

    if (parseInt(day.substr(0, 1)) == 1) ist = 'th';
    if (parseInt(day.substr(0, 1)) == 0) day = day.substr(1);

    date = month + ' ' + day + ist;

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