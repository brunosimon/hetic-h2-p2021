$(document).ready(function() {
  function cover() {
      var height = $(window).height();
      $("#cover").css({ "height": height });
  }
  cover();
  $(window).resize(function() {
      cover();
  });
});
