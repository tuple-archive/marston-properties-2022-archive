// (function() {

//   var hitsPerPage = 1000;

//   var checkboxTemplate = '<div class="facet-item">' +
//       '<label for="{{name}}" class="facet-item__label custom-checkbox">' +
//         '<input type="radio" id="{{name}}" class="custom-checkbox__input"{{#isRefined}} checked{{/isRefined}}>' +
//         '<span class="custom-checkbox__indicator"></span>' +
//         '<span class="custom-checkbox__text">{{name}}</span>' +
//       '</label>' +
//     '</div>';

//   var search = instantsearch({
//     appId: 'CHT4QA8HS8',
//     apiKey: '0025e7e2024954cd386ffabc17a85b26',
//     indexName: 'residentialProperties',
//     urlSync: false
//   });

//   search.addWidget(
//     instantsearch.widgets.refinementList({
//       container: '#filter-bedrooms',
//       attributeName: 'bedrooms',
//       sortBy: ['name:desc'],
//       templates: {
//         header: 'Bedrooms',
//         item: checkboxTemplate
//       }
//     })
//   );

//   search.addWidget(
//     instantsearch.widgets.refinementList({
//       container: '#filter-prices',
//       attributeName: 'priceRanges.label',
//       sortBy: function(a, b) {
//         var regexp = /^£([0-9]),?([0-9]+)?.*/;

//         return a.name.replace(regexp, '$1$2') - b.name.replace(regexp, '$1$2');
//       },
//       templates: {
//         header: 'Price',
//         item: checkboxTemplate
//       }
//     })
//   );

//   search.addWidget(
//     instantsearch.widgets.refinementList({
//       container: '#filter-locations',
//       attributeName: 'locations.title',
//       templates: {
//         header: 'Locations',
//         item: checkboxTemplate
//       }
//     })
//   );

//   search.addWidget(
//     instantsearch.widgets.refinementList({
//       container: '#filter-types',
//       attributeName: 'types.title',
//       templates: {
//         header: 'Types',
//         item: checkboxTemplate
//       }
//     })
//   );

//   var templateHitsItem = $('#template-hits-item').html();

//   search.addWidget(
//     instantsearch.widgets.hits({
//       container: '#results-list',
//       hitsPerPage: hitsPerPage,
//       templates: {
//         item: templateHitsItem
//       }
//     })
//   );

//   var mapWidget = {
//     $canvas: null,
//     _currentInfoWindow: null,

//     getConfiguration: function(searchParams) {
//       return {};
//     },

//     init: function(params) {
//       this.markers = [];
//     },

//     // Called every time there is new data
//     render: function(params) {
//       if (this.map && this.$canvas.is(':visible')) {
//         this.bounds = new google.maps.LatLngBounds();

//         var i;

//         for (i = 0; i < this.markers.length; i++) {
//           this.markers[i].setMap(null);
//         }

//         for (i = params.results.hits.length - 1; i >= 0; i--) {
//           this.addMarker(params.results.hits[i]);
//         }

//         this.map.fitBounds(this.bounds);
//       }
//     },

//     initMap: function() {
//       if (!this.map) {
//         this.$canvas = $('#results-map');

//         this.map = new google.maps.Map(this.$canvas.get(0), {
//           center: {lat: 51.4683508, lng: -0.1910273},
//           zoom: 12
//         });

//         this.map.addListener('click', function() {
//           self.closeInfoWindows();
//         });
//       }
//     },

//     addMarker: function(hit) {
//       if (hit.geo.lat && hit.geo.lng) {
//         var self = this;

//         var modifiers = ['infowin'];

//         if (!hit.isToLet) {
//           modifiers.push('infowin--unavailable');
//         }

//         var info = new google.maps.InfoWindow({
//           content: '<div class="' + modifiers.join(' ') + '">' +
//               (hit.image ? '<div class="infowin-image">' +
//                 '<a href="' + hit.url + '" target="_blank">' +
//                   '<img src="' + hit.image.url + '">' +
//                 '</a>' +
//               '</div>' : '') +
//               '<div class="infowin-info">' +
//                 '<div class="infowin-heading">' +
//                   '<a href="' + hit.url + '">' + hit.title + '</a>' +
//                 '</div>' +
//                 '<div class="infowin-description">' + hit.description + '</div>' +
//                 '<div class="infowin-link"><a href="' + hit.url + '" target="_blank">View Property</a></div>' +
//               '</div>' +
//             '</div>'
//         });

//         var availableMarker = this.getMarkerIcon('#ee3938', '#b22929');
//         var unavailableMarker = this.getMarkerIcon('#b4b4b4', '#979797');

//         var marker = new google.maps.Marker({
//           position: hit.geo,
//           map: this.map,
//           icon: hit.isToLet ? availableMarker : unavailableMarker
//         });

//         marker.addListener('click', function(event) {
//           self.closeInfoWindows();
//           info.open(self.map, marker);
//           self._currentInfoWindow = info;
//         });

//         this.bounds.extend(hit.geo);

//         this.markers.push(marker);
//       }
//     },

//     closeInfoWindows: function() {
//       if (this._currentInfoWindow) {
//         this._currentInfoWindow.close();
//         this._currentInfoWindow = null;
//       }
//     },

//     getMarkerIcon: function(fillColor, strokeColor) {
//       return {
//         path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
//         fillColor: fillColor,
//         fillOpacity: 1,
//         strokeColor: strokeColor,
//         strokeWeight: 1,
//         scale: 1,
//       };
//     }
//   };

//   search.addWidget(mapWidget);

//   search.start();

//   var $results = $('.results');

//   var updateViewState = function() {
//     if ($results.hasClass('results--map')) {
//       mapWidget.initMap();
//       search.helper.setQueryParameter('hitsPerPage', 1000).search();
//     } else {
//       search.helper.setQueryParameter('hitsPerPage', hitsPerPage).search();
//     }
//   };
//   updateViewState();

//   $('.results-nav-toggle').click(function() {
//     $results.toggleClass('results--list results--map');
//     updateViewState();
//   });

// }());
