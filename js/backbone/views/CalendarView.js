var CalendarView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    var date = new Date();
    var month = Datetime.getMonth(date.getMonth());

    var t = this;
    $.get('templates/calendar.html', function(template) {
      t.template = $(Mustache.to_html(template, {month: month}));
      $("content").html(t.template);
    });

    var col = date.getDay();
    var start = col;
    _.times(date.getDate()-1, function(n) {
      start -= 1;
      if (start < 0) start = 6;
    });
    //var row = Math.ceil((date.getDate() - col - 1) / 7);
    //$('tr:nth-child('+(row+1)+') td:nth-child('+(col+1)+')', this.template).css('background', '#FEE');
    $.each($('tr', this.template), function(rowIndex, rowValue) {
      $.each($('td',rowValue), function(colIndex, colValue) {
        var cell = $(colValue);
        var cellIndex = (rowIndex-1) * 7 + (colIndex);
        var dat = cellIndex - start + 1;
        console.log(Datetime.getLength(date.getMonth()));
        if (dat > 0 && dat <= Datetime.getLength(date.getMonth())) {
          cell.append("<span class='label'>"+dat+"</span>")
        }
      });
    });
  }
});