// @codekit-prepend 'base.js'

/* global instantsearch */

(function($) {

  var hitsPerPage = window.searchBase.hitsPerPage;
  var checkboxTemplate = window.searchBase.checkboxTemplate;

  var search = instantsearch({
    appId: 'CHT4QA8HS8',
    apiKey: '4c3aa8450878c5acdddb1fb13cf00003',
    indexName: 'commercialUnits',
    urlSync: false,
    searchParameters: {
      facetsRefinements: {
        enabled: [true]
      },
      facets: ['isToLet']
    }
  });

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter-sqfeet',
      attributeName: 'squareFeetRanges.label',
      sortBy: function(a, b) {
        var regexp = /^([0-9]),?([0-9]+)?.*/;

        return a.name.replace(regexp, '$1$2') - b.name.replace(regexp, '$1$2');
      },
      templates: {
        header: 'Square Feet',
        item: checkboxTemplate
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter-sqmetres',
      attributeName: 'squareMetresRanges.label',
      sortBy: function(a, b) {
        var regexp = /^([0-9]),?([0-9]+)?.*/;

        return a.name.replace(regexp, '$1$2') - b.name.replace(regexp, '$1$2');
      },
      templates: {
        header: 'Square Metres',
        item: checkboxTemplate
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter-locations',
      attributeName: 'locations.title',
      templates: {
        header: 'Locations',
        item: checkboxTemplate
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#filter-types',
      attributeName: 'types.title',
      templates: {
        header: 'Types',
        item: checkboxTemplate
      }
    })
  );

  var templateHitsItem = $('#template-hits-item').html();
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#results-list',
      hitsPerPage: hitsPerPage,
      templates: {
        item: templateHitsItem
      }
    })
  );

  search.addWidget(window.searchBase.mapWidget);

  search.start();

  var $results = $('.results');

  var updateViewState = function() {
    if ($results.hasClass('results--map')) {
      window.searchBase.mapWidget.initMap();
      // search.helper.setQueryParameter('hitsPerPage', 1000).search();
      search.helper
        .setQueryParameter('hitsPerPage', 1000)
        .removeFacetRefinement('isToLet')
        .search();
    } else {
      // search.helper.setQueryParameter('hitsPerPage', hitsPerPage).search();
      search.helper
        .setQueryParameter('hitsPerPage', hitsPerPage)
        .addFacetRefinement('isToLet', true)
        .search();
    }
  };
  updateViewState();

  $('.results-nav-toggle').click(function() {
    $results.toggleClass('results--list results--map');
    updateViewState();
  });


  $('#filter-unit-toggle [name="unit"]').change(function() {
    $('#filter-sqfeet, #filter-sqmetres')
      .toggleClass('hidden')
      .find('.ais-refinement-list--item__active')
        .click();
  });

}(window.jQuery));
