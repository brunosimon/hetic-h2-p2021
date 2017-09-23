
$(document).ready(function() {


/********attribution des class pour l'animation ***********/

  setTimeout(function(){
    $( "#left").addClass( "play_left" );
    $( "#bottom-left").addClass( "play_bottom-left" );
    $( "#bottom-left .pack-4-1").addClass( "play_bottom-left_pack-4-1" );
    $( "#bottom-left .pack-4-2").addClass( "play_bottom-left_pack-4-2" );
    $( "#bottom-left .pack-4-1 .pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
    $( "#bottom-left .pack-4-2 .pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
    $( "#bottom-left .pack-4-1 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_left" );
    $( "#bottom-left .pack-4-1 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_left" );
    $( "#bottom-left .pack-4-2 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_left" );
    $( "#bottom-left .pack-4-2 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_left" );
    $( "#top-left").addClass( "play_top-left" );
    $( "#top-left .pack-4-1").addClass( "play_bottom-left_pack-4-1" );
    $( "#top-left .pack-4-2").addClass( "play_bottom-left_pack-4-2" );
    $( "#top-left .pack-4-1 .pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
    $( "#top-left .pack-4-2 .pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
    $( "#top-left .pack-4-1 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_top_left" );
    $( "#top-left .pack-4-1 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_top_left" );
    $( "#top-left .pack-4-2 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_top_left" );
    $( "#top-left .pack-4-2 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_top_left" );
    $( "#right").addClass( "play_right" );
    $( "#bottom-right").addClass( "play_bottom-left" );
    $( "#bottom-right .pack-4-1").addClass( "play_bottom-left_pack-4-1" );
    $( "#bottom-right .pack-4-2").addClass( "play_bottom-left_pack-4-2" );
    $( "#bottom-right .pack-4-1 .pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
    $( "#bottom-right .pack-4-2 .pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
    $( "#bottom-right .pack-4-1 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_right" );
    $( "#bottom-right .pack-4-1 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_right" );
    $( "#bottom-right .pack-4-2 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_right" );
    $( "#bottom-right .pack-4-2 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_right" );
    $( "#top-right").addClass( "play_top-left" );
    $( "#top-right .pack-4-1").addClass( "play_bottom-left_pack-4-1" );
    $( "#top-right .pack-4-2").addClass( "play_bottom-left_pack-4-2" );
    $( "#top-right .pack-4-1 .pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
    $( "#top-right .pack-4-2 .pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
    $( "#top-right .pack-4-1 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_top_right" );
    $( "#top-right .pack-4-1 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_top_right" );
    $( "#top-right .pack-4-2 .pack-2-1 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_top_right" );
    $( "#top-right .pack-4-2 .pack-2-2 .left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_top_right" );
  },5000);


/********creation de la boucle d'animation***********/

  var loadDelay = 5000;

  setInterval(function(){

    /********* debut reverse ********/

    setTimeout(function(){
      $( "#bottom-left .pack-4-1 .pack-2-1 .left").removeClass( "play_bottom-left_pack-4-1_pack-2-1_left" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-1_left" );
      $( "#bottom-left .pack-4-1 .pack-2-2 .left").removeClass( "play_bottom-left_pack-4-1_pack-2-2_left" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2_left" );
      $( "#bottom-left .pack-4-2 .pack-2-1 .left").removeClass( "play_bottom-left_pack-4-2_pack-2-1_left" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-1_left" );
      $( "#bottom-left .pack-4-2 .pack-2-2 .left").removeClass( "play_bottom-left_pack-4-2_pack-2-2_left" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2_left" );
      $( "#top-left .pack-4-1 .pack-2-1 .left" ).removeClass( "play_bottom-left_pack-4-1_pack-2-1_top_left" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-1_top_left" );
      $( "#top-left .pack-4-1 .pack-2-2 .left" ).removeClass( "play_bottom-left_pack-4-1_pack-2-2_top_left" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2_top_left" );
      $( "#top-left .pack-4-2 .pack-2-1 .left" ).removeClass( "play_bottom-left_pack-4-2_pack-2-1_top_left" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-1_top_left" );
      $( "#top-left .pack-4-2 .pack-2-2 .left" ).removeClass( "play_bottom-left_pack-4-2_pack-2-2_top_left" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2_top_left" );
      $( "#bottom-right .pack-4-1 .pack-2-1 .left").removeClass( "play_bottom-left_pack-4-1_pack-2-1_right" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-1_right" );
      $( "#bottom-right .pack-4-1 .pack-2-2 .left").removeClass( "play_bottom-left_pack-4-1_pack-2-2_right" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2_right" );
      $( "#bottom-right .pack-4-2 .pack-2-1 .left").removeClass( "play_bottom-left_pack-4-2_pack-2-1_right" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-1_right" );
      $( "#bottom-right .pack-4-2 .pack-2-2 .left").removeClass( "play_bottom-left_pack-4-2_pack-2-2_right" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2_right" );
      $( "#top-right .pack-4-1 .pack-2-1 .left" ).removeClass( "play_bottom-left_pack-4-1_pack-2-1_top_right" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-1_top_right" );
      $( "#top-right .pack-4-1 .pack-2-2 .left" ).removeClass( "play_bottom-left_pack-4-1_pack-2-2_top_right" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2_top_right" );
      $( "#top-right .pack-4-2 .pack-2-1 .left" ).removeClass( "play_bottom-left_pack-4-2_pack-2-1_top_right" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-1_top_right" );
      $( "#top-right .pack-4-2 .pack-2-2 .left" ).removeClass( "play_bottom-left_pack-4-2_pack-2-2_top_right" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2_top_right" );
    }, loadDelay);

    setTimeout(function(){
      $( "#bottom-left .pack-4-2 .pack-2-2").removeClass( "play_bottom-left_pack-4-2_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-left .pack-4-1 .pack-2-2").removeClass( "play_bottom-left_pack-4-1_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-left .pack-4-1 .pack-2-2" ).removeClass( "play_bottom-left_pack-4-1_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-left .pack-4-2 .pack-2-2" ).removeClass( "play_bottom-left_pack-4-2_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-right .pack-4-2 .pack-2-2").removeClass( "play_bottom-left_pack-4-2_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-right .pack-4-1 .pack-2-2").removeClass( "play_bottom-left_pack-4-1_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-right .pack-4-1 .pack-2-2" ).removeClass( "play_bottom-left_pack-4-1_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-right .pack-4-2 .pack-2-2" ).removeClass( "play_bottom-left_pack-4-2_pack-2-2" ).addClass( "reverse_bottom-left_pack-4-2_pack-2-2" );
    }, loadDelay+=1000);

    setTimeout(function(){
      $( "#top-left .pack-4-1").removeClass( "play_bottom-left_pack-4-1" ).addClass( "reverse_bottom-left_pack-4-1" );
      $( "#top-left .pack-4-2").removeClass( "play_bottom-left_pack-4-2" ).addClass( "reverse_bottom-left_pack-4-2" );
      $( "#bottom-left .pack-4-2").removeClass( "play_bottom-left_pack-4-2" ).addClass( "reverse_bottom-left_pack-4-2" );
      $( "#bottom-left .pack-4-1").removeClass( "play_bottom-left_pack-4-1" ).addClass( "reverse_bottom-left_pack-4-1" );
      $( "#top-right .pack-4-1").removeClass( "play_bottom-left_pack-4-1" ).addClass( "reverse_bottom-left_pack-4-1" );
      $( "#top-right .pack-4-2").removeClass( "play_bottom-left_pack-4-2" ).addClass( "reverse_bottom-left_pack-4-2" );
      $( "#bottom-right .pack-4-2").removeClass( "play_bottom-left_pack-4-2" ).addClass( "reverse_bottom-left_pack-4-2" );
      $( "#bottom-right .pack-4-1").removeClass( "play_bottom-left_pack-4-1" ).addClass( "reverse_bottom-left_pack-4-1" );
    }, loadDelay+=1000);

    setTimeout(function(){
      $( "#top-left").removeClass( "play_top-left" ).addClass( "reverse_top-left" );
      $( "#bottom-left").removeClass( "play_bottom-left" ).addClass( "reverse_bottom-left" );
      $( "#top-right").removeClass( "play_top-left" ).addClass( "reverse_top-left" );
      $( "#bottom-right").removeClass( "play_bottom-left" ).addClass( "reverse_bottom-left" );
    }, loadDelay+=1000);

    setTimeout(function(){
      $( "#right").removeClass( "play_right" ).addClass( "reverse_right" );
      $( "#left").removeClass( "play_left" ).addClass( "reverse_left" );
    }, loadDelay+=1000);


      /********* debut replay ********/

    setTimeout(function(){
      $( "#right").removeClass( "reverse_right" ).addClass( "play_right" );
      $( "#left").removeClass( "reverse_left" ).addClass( "play_left" );
    }, loadDelay+=1500);

    setTimeout(function(){
      $( "#top-left").removeClass( "reverse_top-left" ).addClass( "play_top-left" );
      $( "#bottom-left").removeClass( "reverse_bottom-left" ).addClass( "play_bottom-left" );
      $( "#top-right").removeClass( "reverse_top-left" ).addClass( "play_top-left" );
      $( "#bottom-right").removeClass( "reverse_bottom-left" ).addClass( "play_bottom-left" );
    },loadDelay+=100);

    setTimeout(function(){
      $( "#top-left .pack-4-1").removeClass( "reverse_bottom-left_pack-4-1" ).addClass( "play_bottom-left_pack-4-1" );
      $( "#top-left .pack-4-2").removeClass( "reverse_bottom-left_pack-4-2" ).addClass( "play_bottom-left_pack-4-2" );
      $( "#bottom-left .pack-4-2").removeClass( "reverse_bottom-left_pack-4-2" ).addClass( "play_bottom-left_pack-4-2" );
      $( "#bottom-left .pack-4-1").removeClass( "reverse_bottom-left_pack-4-1" ).addClass( "play_bottom-left_pack-4-1" );
      $( "#top-right .pack-4-1").removeClass( "reverse_bottom-left_pack-4-1" ).addClass( "play_bottom-left_pack-4-1" );
      $( "#top-right .pack-4-2").removeClass( "reverse_bottom-left_pack-4-2" ).addClass( "play_bottom-left_pack-4-2" );
      $( "#bottom-right .pack-4-2").removeClass( "reverse_bottom-left_pack-4-2" ).addClass( "play_bottom-left_pack-4-2" );
      $( "#bottom-right .pack-4-1").removeClass( "reverse_bottom-left_pack-4-1" ).addClass( "play_bottom-left_pack-4-1" );
    }, loadDelay+=100);

    setTimeout(function(){
      $( "#bottom-left .pack-4-2 .pack-2-2").removeClass( "reverse_bottom-left_pack-4-2_pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-left .pack-4-1 .pack-2-2").removeClass( "reverse_bottom-left_pack-4-1_pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-left .pack-4-1 .pack-2-2" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-left .pack-4-2 .pack-2-2" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-right .pack-4-2 .pack-2-2").removeClass( "reverse_bottom-left_pack-4-2_pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
      $( "#bottom-right .pack-4-1 .pack-2-2").removeClass( "reverse_bottom-left_pack-4-1_pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-right .pack-4-1 .pack-2-2" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-2" ).addClass( "play_bottom-left_pack-4-1_pack-2-2" );
      $( "#top-right .pack-4-2 .pack-2-2" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-2" ).addClass( "play_bottom-left_pack-4-2_pack-2-2" );
    }, loadDelay+=100);

    setTimeout(function(){
      $( "#bottom-left .pack-4-1 .pack-2-1 .left").removeClass( "reverse_bottom-left_pack-4-1_pack-2-1_left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_left" );
      $( "#bottom-left .pack-4-1 .pack-2-2 .left").removeClass( "reverse_bottom-left_pack-4-1_pack-2-2_left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_left" );
      $( "#bottom-left .pack-4-2 .pack-2-1 .left").removeClass( "reverse_bottom-left_pack-4-2_pack-2-1_left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_left" );
      $( "#bottom-left .pack-4-2 .pack-2-2 .left").removeClass( "reverse_bottom-left_pack-4-2_pack-2-2_left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_left" );
      $( "#top-left .pack-4-1 .pack-2-1 .left" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-1_top_left" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_top_left" );
      $( "#top-left .pack-4-1 .pack-2-2 .left" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-2_top_left" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_top_left" );
      $( "#top-left .pack-4-2 .pack-2-1 .left" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-1_top_left" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_top_left" );
      $( "#top-left .pack-4-2 .pack-2-2 .left" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-2_top_left" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_top_left" );
      $( "#bottom-right .pack-4-1 .pack-2-1 .left").removeClass( "reverse_bottom-left_pack-4-1_pack-2-1_right" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_right" );
      $( "#bottom-right .pack-4-1 .pack-2-2 .left").removeClass( "reverse_bottom-left_pack-4-1_pack-2-2_right" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_right" );
      $( "#bottom-right .pack-4-2 .pack-2-1 .left").removeClass( "reverse_bottom-left_pack-4-2_pack-2-1_right" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_right" );
      $( "#bottom-right .pack-4-2 .pack-2-2 .left").removeClass( "reverse_bottom-left_pack-4-2_pack-2-2_right" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_right" );
      $( "#top-right .pack-4-1 .pack-2-1 .left" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-1_top_right" ).addClass( "play_bottom-left_pack-4-1_pack-2-1_top_right" );
      $( "#top-right .pack-4-1 .pack-2-2 .left" ).removeClass( "reverse_bottom-left_pack-4-1_pack-2-2_top_right" ).addClass( "play_bottom-left_pack-4-1_pack-2-2_top_right" );
      $( "#top-right .pack-4-2 .pack-2-1 .left" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-1_top_right" ).addClass( "play_bottom-left_pack-4-2_pack-2-1_top_right" );
      $( "#top-right .pack-4-2 .pack-2-2 .left" ).removeClass( "reverse_bottom-left_pack-4-2_pack-2-2_top_right" ).addClass( "play_bottom-left_pack-4-2_pack-2-2_top_right" );
    }, loadDelay+=100);

  }, 5900);

});
