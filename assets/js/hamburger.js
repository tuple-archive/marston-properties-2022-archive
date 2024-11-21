// @codekit-prepend 'vendor/jquery.breakpoint.js'
// @codekit-prepend 'vendor/velocity.js'

var app = app || {};

app.hamburger = function() {

  // Query elements only when we need to
  var $body;
  var $nav;
  var $hamburger;
  var $bread;

  var isOpen = false;

  // Get the correct scroll event. On touch devices we want to prevent scrolling
  // so need to hook into the touchmove event.
  var scrollEvent = Modernizr.touch ? 'touchmove' : 'scroll';

  // Event handler to prevent scrolling
  var scrollHandler = function(event) {
    event.preventDefault();
  };

  // Shows the navigation
  var showNav = function() {
    isOpen = true;

    $nav.velocity({ opacity: [1, 0] }, { display: 'block', duration: 250 });

    $bread.velocity({ top: 37, backgroundColor: '#ffffff' }, { duration: 250 });

    $bread.eq(0).velocity({ rotateZ: '135deg' }, { duration: 250, queue: false });
    $bread.eq(1).velocity({ rotateZ: '45deg' }, { duration: 250, queue: false });

    $body
      .velocity('scroll', { duration: 125 })
      .css('overflow', 'hidden')
      .on(scrollEvent, scrollHandler);
  };

  // Hides the navigation
  var hideNav = function() {
    isOpen = false;

    $nav.velocity({ opacity: 0 }, { display: 'none', duration: 250 });

    $bread.velocity({ backgroundColor: '#ee3938' }, { duration: 250 });

    $bread.velocity({ rotateZ: '0deg' }, { duration: 250, queue: false });

    $bread.eq(0).velocity({ top: 33 }, { duration: 250, queue: false });
    $bread.eq(1).velocity({ top: 41 }, { duration: 250, queue: false });

    $body
      .css('overflow', 'auto')
      .off(scrollEvent, scrollHandler);
  };

  // Attach a media query based listener
  // Based on our tests this is ~30% faster than a resize event on the window
  $.breakpoint({

    // Set the condition using Modernizr.mq to bring support to IE9
    condition: function() {
      return Modernizr.mq('(max-width: 767px)');
    },

    first_enter: function() {
      // Query elements, now that we need them
      $body = $('body');
      $nav = $('.header-nav');
      $hamburger = $('.hamburger');
      $bread = $hamburger.children('.bread');

      $hamburger.on(Modernizr.touch ? 'touchend' : 'click', function(event) {
        event.preventDefault();

        if (!$nav.is(':animated')) {
          if (!isOpen) {
            showNav();
          } else {
            hideNav();
          }
        }
      });
    },

    enter: function() {
      $nav.toggle(isOpen);
      $hamburger.show();
    },

    exit: function() {
      $nav.css({ display: 'block', opacity: 1 });
      $hamburger.hide();
    }

  });

};
