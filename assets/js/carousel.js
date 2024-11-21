// @codekit-prepend 'vendor/jquery.cycle.js'

var app = app || {};

app.carousel = function() {

  $('.header-slides').cycle({
    slides: '>*'
  });

};
