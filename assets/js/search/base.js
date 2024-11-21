// @codekit-append 'map.js'

window.searchBase = {

  hitsPerPage: 1000,

  checkboxTemplate: '<div class="facet-item">' +
    '<label for="{{name}}" class="facet-item__label custom-checkbox">' +
      '<input type="radio" id="{{name}}" class="custom-checkbox__input"{{#isRefined}} checked{{/isRefined}}>' +
      '<span class="custom-checkbox__indicator"></span>' +
      '<span class="custom-checkbox__text">{{name}}</span>' +
    '</label>' +
  '</div>'

};
