var app = app || {};

app.geolocation = function() {

  var $form = $('form');
  var $location = $form.find('[name="location"]');
  var $submit = $form.find('[type="submit"]');
  var value = $location.val();

  // Remove the option if geolocation is unsupported
  if (!navigator.geolocation) {
    $('[value="near"]').remove();
  }

  var nothing = function(event) {
    event.preventDefault();
  };

  // Disable form
  var disable = function() {
    $form.on('submit', nothing);
    $submit.prop('disabled', true);
  };

  // Enable form
  var enable = function() {
    $form.off('submit', nothing);
    $submit.prop('disabled', false);
  };

  // Save the coordinate values into the ‘near’ field
  var success = function(position) {
    $('[name="near"]').val(position.coords.latitude + ',' + position.coords.longitude);
    enable();
  };

  // Restore the value before changing
  var error = function() {
    $location.val(value);
    enable();
  };

  // Handle location value changing
  $location.change(function() {
    if (this.value == 'near') {
      disable();
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      value = $location.val();
      enable();
    }
  });

  // Ensure we’ve got the latest location
  if ($location.val() == 'near') {
    navigator.geolocation.getCurrentPosition(success, nothing);
  }

};
