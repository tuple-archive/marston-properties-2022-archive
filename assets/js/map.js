// @codekit-prepend 'map/styles.grey.js'

var app = app || {};

app.map = function() {

  if ('google' in window) {
    var G = google.maps;

    G.event.addDomListener(window, 'load', function() {
      $('.block-map').each(function() {
        var $map = $(this),
          $hand = $map.find('.block-map-hand-inner'),
          $canvas = $map.find('.block-map-canvas');

        var latLng = new G.LatLng(
          parseFloat($canvas.data('lat')),
          parseFloat($canvas.data('lng'))
        );

        // Generate a Google Map instance
        var map = new G.Map($canvas[0], {
          backgroundColor: '#d3d3d3',
          center: latLng,
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          scrollwheel: false,
          styles: mapStyles.grey,
          zoom: 16
        });

        // Add a marker
        var marker = new G.Marker({
          position: latLng,
          map: map,
          icon: {
            anchor: new G.Point(20, 20),
            size: new G.Size(60, 60),
            url: '/assets/img/maps/marker.svg?v=4'
          }
        });

        // G.event.addListenerOnce(map, 'idle', function() {
        //   setTimeout(function() {
        //     // Hack: Adjust the colour of the copyright and other notices
        //     $canvas.find('[style*="background-color"]:visible').css('background-color', '#9f2323');
        //     $canvas.find('[style*="color"]:visible').css('color', '#ffa9a9');
        //     $canvas.find('a[target="_blank"] img')
        //       // Trigger replacement on load
        //       .one('load', function() {
        //         this.src = '/assets/img/maps/google.svg';
        //       })
        //       // Trigger load event if loading is complete (i.e. cached)
        //       .filter(function() {
        //         return this.complete;
        //       }).trigger('load');
        //   }, 100);
        // });

        map.addListener('center_changed', function() {
          var overlay = new G.OverlayView();
          overlay.draw = function() {};
          overlay.setMap(map);
          var projection = overlay.getProjection();

          var handPoint = new G.Point(
            ($canvas.width() / 2),
            ($canvas.height() / 2) - 60
          );

          if (projection) {
            var handLatLng = projection.fromContainerPixelToLatLng(handPoint);
            var heading = G.geometry.spherical.computeHeading(handLatLng, latLng);
            $hand.css('transform', 'rotate(' + (heading + 180) + 'deg)');
          }
        });

        $hand.on(Modernizr.touch ? 'touchend' : 'click', function() {
          map.panTo(latLng);
        });
      });
    });
  }

};
