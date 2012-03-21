var CalendarView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.date = new Date();
    this.month = Datetime.getMonth(this.date.getMonth());

    this.import();
  },

  import: function() {
    var t = this;
    $.get('templates/calendar.html', function(template) {
      t.template = $(Mustache.to_html(template, {month: this.month}));
      $("content").html(t.template);

      t.render();
    });
  },

  render: function() {
    var col = this.date.getDay();
    var start = col;
    _.times(this.date.getDate()-1, function(n) {
      start -= 1;
      if (start < 0) start = 6;
    });

    var t = this;
    $.each($('tr', this.template), function(rowIndex, rowValue) {
      $.each($('td',rowValue), function(colIndex, colValue) {
        var cell = $(colValue);
        var cellIndex = (rowIndex-1) * 7 + (colIndex);
        var dat = cellIndex - start + 1;
        if (dat > 0 && dat <= Datetime.getLength(t.date.getMonth())) {
          cell.append("<span class='label'>"+dat+"</span>")
        }
      });
    });
  }
});