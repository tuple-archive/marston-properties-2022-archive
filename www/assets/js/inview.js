// @ codekit-prepend 'vendor/jquery.inview.js'

var app = app || {};

app.inview = function() {

  var $window = $(window);
  var $elems = $('[data-show="on-scroll"]');

  // The delay multiplier
  var delayMultiplier = 0;

  // Get the correct transition end event name. This prevents duplicate calls
  // to the same handler later.
  var transitionEnd = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'    : 'transitionend',
    'transition'       : 'transitionend'
  }[Modernizr.prefixed('transition')];

  // Get the prefixed transition delay CSS property name
  var transitionDelay = Modernizr.prefixed('transitionDelay');

  // Scroll event handler
  var scroll = function() {

    // Calculate the bottom of the viewport
    var viewportBottom = $window.scrollTop() + $window.height();

    // Loop through the matched elements
    $elems.each(function() {

      // Get the element, top offset and height
      var $elem = $(this),
          top = $elem.offset().top,
          height = $elem.height(),
          visibleHeight = Math.min($window.height() / 2, height / 2);

      // Check if the top half is above the bottom of the viewport (at least)
      if (viewportBottom > top + visibleHeight) {

        // Add delay to transition based on current multiplier value
        $elem
          .one(transitionEnd, function() {
            // Reduce delay multiplier
            delayMultiplier--;
          })
          .css(transitionDelay, (delayMultiplier * 100) + 'ms')
          .addClass('in-view');

        // Remove this element from the elements set
        $elems = $elems.not($elem);

        // Increase the delay multiplier
        delayMultiplier++;
      }

    });

    // Check if we need to keep running the scroll handler
    if (!$elems.length) {
      $window.off('scroll', scroll);
    }
  };

  $window.on('scroll', scroll);
  scroll();

};
