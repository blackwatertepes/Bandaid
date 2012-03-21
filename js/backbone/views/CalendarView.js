var CalendarView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.date = new Date();
    this.year = this.date.getYear();
    this.month = Datetime.getMonth(this.date.getMonth());
    this.day = this.date.getDate();

    this.import();
  },

  import: function() {
    var t = this;
    $.get('templates/calendar.html', function(template) {
      t.template = $(Mustache.to_html(template, {month: t.month}));
      $("content").html(t.template);

      t.render();
    });
  },

  render: function() {
    var col = this.date.getDay();
    this.start = col;
    _.times(this.date.getDate()-1, function(n) {
      this.start -= 1;
      if (this.start < 0) this.start = 6;
    });

    var t = this;
    $.each($('tr', this.template), function(rowIndex, rowValue) {
      $.each($('td',rowValue), function(colIndex, colValue) {
        var cell = $(colValue);
        var cellIndex = (rowIndex-1) * 7 + (colIndex);
        var dat = cellIndex - t.start + 1;
        if (dat > 0) {
          var monthLength = Datetime.getLength(t.date.getMonth());
          var month = t.date.getMonth() + 1;
          if (dat <= monthLength) {
            cell.append("<span class='label label-info'>"+dat+"</span>");
            cell.append("<ul id="+month+"_"+dat+"></ul>");
          } else {
            cell.append("<span class='label'>"+(dat-monthLength)+"</span>");
            cell.append("<ul id="+(month+1)+"_"+(dat-monthLength)+" class='next-month'></ul>");
          }
        }
      });
    });
  },

  addEvent: function(event) {
    var year = parseInt(event.start_datetime.substr(0, 4));
    var month = parseInt(event.start_datetime.substr(5, 2));
    var day = parseInt(event.start_datetime.substr(8, 2));
    if ($('ul#'+month+'_'+day).children().length < 5) {
      $('ul#'+month+'_'+day).append('<li>'+event.name+'</li>');
    }
  }
});