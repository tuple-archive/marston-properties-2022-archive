// @codekit-prepend 'carousel.js'
// @codekit-prepend 'geolocation.js'
// @codekit-prepend 'hamburger.js'
// @codekit-prepend 'inview.js'
// @codekit-prepend 'map.js'
// @codekit-prepend 'order.js'
// @codekit-prepend 'units.js'
// @codekit-prepend 'vendor/jquery.deserialize.js'

(function($, undefined) {
  var $window = $(window);

  $(function() {

    app.carousel();
    // app.geolocation();
    app.hamburger();
    app.inview();
    app.map();
    app.order();
    app.units();

    /*$('[data-form="residential"]').each(function() {
      var $form = $(this);
      var $results = $('.result');

      $form.find('input, select').on('change', function() {
        var data = {};
        $form.serializeArray().map(function(x) {
          data[x.name] = x.value;
        });

        var path = window.location.pathname + '?' + $form.serialize();
        history.pushState({}, document.title, path);

        $results.each(function() {
          var $result = $(this);
          var show = true;

          if (data.location && $result.data('location') != data.location) {
            show = false;
          }

          if (data.type && $result.data('type') != data.type) {
            show = false;
          }

          if (data.bedrooms) {
            if (data.bedrooms == 1 && $result.data('bedrooms') !== 1) {
              show = false;
            } else if ($result.data('bedrooms') < data.bedrooms) {
              show = false;
            }
          }

          if (data.min_price && $result.data('price') < data.min_price) {
            show = false;
          }

          if (data.max_price && $result.data('price') > data.max_price) {
            show = false;
          }

          $result.toggle(show);
        });
      });
    });*/


    $.fn.serializeObject = function() {
      var data = {};
      $(this).serializeArray().map(function(x) {
        data[x.name] = x.value;
      });
      return data;
    };


    // $(window).on('statechange', function(event) {
      // $('[data-form="residential"]').each(function() {
      //   var $form = $(this);

      //   $form.find(':input').change(function() {
      //     var data = $form.serializeObject();

      //     console.log(data);
      //   });

      //   $('.result').each(function() {
      //     var $result = $(this);
      //     var show = true;

      //     if (data.location && $result.data('location') != data.location) {
      //       show = false;
      //     }

      //     if (data.type && $result.data('type') != data.type) {
      //       show = false;
      //     }

      //     if (data.bedrooms) {
      //       if (data.bedrooms == 1 && $result.data('bedrooms') !== 1) {
      //         show = false;
      //       } else if ($result.data('bedrooms') < data.bedrooms) {
      //         show = false;
      //       }
      //     }

      //     if (data.min_price && $result.data('price') < data.min_price) {
      //       show = false;
      //     }

      //     if (data.max_price && $result.data('price') > data.max_price) {
      //       show = false;
      //     }

      //     $result.toggle(show);
      //   });
      // });
    // });



    $('form[data-form]').each(function() {
      var $form = $(this);

      // Change URL when input changes
      $form.find(':input').change(function() {
        var path = window.location.pathname + '?' + $form.serialize();
        history.pushState({}, document.title, path);
        $window.trigger('propertysearch');
      });

      // Handle result filtering
      $window.on('propertysearch', function() {
        var formData = $form.serializeObject();
        console.log(formData);

        // Resi
        $form.filter('[data-form="residential"]').each(function() {
          $('.result').each(function() {
            var $result = $(this);
            var show = true;

            if (formData.location && $result.data('location') != formData.location) {
              show = false;
            }

            if (formData.type && $result.data('type') != formData.type) {
              show = false;
            }

            if (formData.bedrooms) {
              if (formData.bedrooms == 1 && $result.data('bedrooms') !== 1) {
                show = false;
              } else if ($result.data('bedrooms') < formData.bedrooms) {
                show = false;
              }
            }

            if (formData.min_price && $result.data('price') < formData.min_price) {
              show = false;
            }

            if (formData.max_price && $result.data('price') > formData.max_price) {
              show = false;
            }

            $('.result').toggle(show);
          });
        });
      });

      // Populate form based on query string on initial page load or backwards navigation
      function handleStateChange() {
        $form.deserialize(window.location.search.substr(1));
        $window.trigger('propertysearch');
      }

      $window.on('popstate', handleStateChange);
      handleStateChange();
    });


    var $resultsNavFilters = $('.results-nav-filters');
    var filterShown = $resultsNavFilters.is(':visible');

    $('.results-nav-filters-toggle').click(function(event) {
      event.preventDefault();
      $resultsNavFilters.slideToggle();
      filterShown = !filterShown;
    });

    $window.resize(function() {
      $resultsNavFilters.toggle($window.width() > 1024 || filterShown);
    });

  });
}(window.jQuery));
