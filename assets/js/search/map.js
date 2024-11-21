/* global google */

window.searchBase.mapWidget = {

  getConfiguration: function() {
    return {};
  },

  init: function() {
    this.$canvas = null;
    this.markers = [];
    this.currentInfowin = null;
  },

  // Called every time there is new data
  render: function(params) {
    if (this.map && this.$canvas.is(':visible')) {
      this.bounds = new google.maps.LatLngBounds();

      var i;

      for (i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }

      for (i = params.results.hits.length - 1; i >= 0; i--) {
        this.addMarker(params.results.hits[i]);
      }

      this.map.fitBounds(this.bounds);

      if (this.map.getZoom() > 18) {
        this.map.setZoom(18);
      }
    }
  },

  initMap: function() {
    if (!this.map) {
      this.$canvas = $('#results-map');

      this.map = new google.maps.Map(this.$canvas.get(0), {
        center: {lat: 51.4683508, lng: -0.1910273},
        zoom: 12
      });

      var self = this;

      this.map.addListener('click', function() {
        self.closeInfoWindows();
      });
    }
  },

  addMarker: function(hit) {
    if (hit.geo.lat && hit.geo.lng) {
      var self = this;

      var modifiers = ['infowin'];

      if (!hit.isToLet) {
        modifiers.push('infowin--unavailable');
      }

      var info = new google.maps.InfoWindow({
        content: '<div class="' + modifiers.join(' ') + '">' +
            (hit.image ? '<div class="infowin-image">' +
              '<a href="' + hit.url + '" target="_blank">' +
                '<img src="' + hit.image.url + '">' +
              '</a>' +
            '</div>' : '') +
            '<div class="infowin-info">' +
              '<div class="infowin-heading">' +
                '<a href="' + hit.url + '">' + hit.title + '</a>' +
              '</div>' +
              '<div class="infowin-description">' + hit.description + '</div>' +
              '<div class="infowin-link"><a href="' + hit.url + '" target="_blank">' +
                (hit.isToLet ? 'View full details' : 'Contact us') +
              '</a></div>' +
            '</div>' +
          '</div>'
      });

      var availableMarker = this.getMarkerIcon('#ee3938', '#b22929');
      var unavailableMarker = this.getMarkerIcon('#b4b4b4', '#979797');

      // Generate a slight variant of the position to prevent overlapping
      var position = {
        lat: hit.geo.lat + this.getRandomInt(-0.0001, 0.0001),
        lng: hit.geo.lng + this.getRandomInt(-0.0001, 0.0001)
      };

      var marker = new google.maps.Marker({
        position: position,
        map: this.map,
        icon: hit.isToLet ? availableMarker : unavailableMarker,
        zIndex: hit.order
      });

      marker.addListener('click', function() {
        self.closeInfoWindows();
        info.open(self.map, marker);
        self.currentInfowin = info;
      });

      this.bounds.extend(position);

      this.markers.push(marker);
    }
  },

  closeInfoWindows: function() {
    if (this.currentInfowin) {
      this.currentInfowin.close();
      this.currentInfowin = null;
    }
  },

  getMarkerIcon: function(fillColor, strokeColor) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: fillColor,
      fillOpacity: 1,
      strokeColor: strokeColor,
      strokeWeight: 1,
      scale: 1,
    };
  },

  getRandomInt: function(min, max) {
    return Math.random() * (max - min) + min;
  }

};
