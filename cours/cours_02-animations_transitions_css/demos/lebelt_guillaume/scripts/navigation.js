jQuery(document).ready(function($) {

	// NAV

    $(".op-menu").click(function(e) {
    	if ($('.menu').hasClass("vhidden")) {
			$('.menu').removeClass("vhidden");
			$('body').addClass("overflow");
			$('.op-menu').addClass("darkt");
			$('.op').addClass("hidden");
			$('.cl').removeClass("hidden");
			$('.menu-icon').addClass("close");
		} else {
			$('.menu').addClass("vhidden");
			$('body').removeClass("overflow");
			$('.op').removeClass("hidden");
			$('.cl').addClass("hidden");
			$('.op-menu').removeClass("darkt");
			$('.menu-icon').removeClass("close");
		}
	 });
		
		$(".menu a").click(function(e) {
    	if ($('.menu').hasClass("vhidden")) {
			$('.menu').removeClass("vhidden");
			$('body').addClass("overflow");
			$('.op-menu').addClass("darkt");
			$('.op').addClass("hidden");
			$('.cl').removeClass("hidden");
			$('.menu-icon').addClass("close");
		} else {
			$('.menu').addClass("vhidden");
			$('body').removeClass("overflow");
			$('.op').removeClass("hidden");
			$('.cl').addClass("hidden");
			$('.menu-icon').removeClass("close");
		}
    });
 });