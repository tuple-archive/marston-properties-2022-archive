var app = app || {};

app.order = function() {

  // We have both a <select> and <input type="hidden"> for the order parameter
  var $order = $('[name="order"]');

  // Listen for changes to the value of either (although our focus is on the
  // <select> input here really)
  $order.change(function() {

    // Get the other input (so we don’t end up looping), and sync the value
    $order.not(this).val(this.value);

    // Submit the form
    $('form').submit();

  });

};
