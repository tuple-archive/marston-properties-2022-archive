var app = app || {};

app.units = function() {

  // Get all relevant options
  var $options = $('#min_size option, #max_size option');

  // Attach change event to units field
  $('#units').change(function() {
    var units = this.value;

    // Loop through each option
    $options.each(function() {
      var $option = $(this);

      // Get value and text for the selected unit type
      var value = $option.data(units + '-value');
      var option = $option.data(units + '-option');

      // Set the option value and text accordingly
      $option.attr('value', value);
      $option.text(option);
    });
  });

};
