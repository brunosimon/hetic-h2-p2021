$(document).ready(function() {
    $(".nyan-anim").hide();
    $(".agree").on('click', function() { // transition warning page to main page
        $(".warning").hide();
        $(".nyan-anim").show();
        $('#normal-speed').get(0).play();
    });

    $(".nyan").hover(function() { // Change sound on hover
            $('#normal-speed').get(0).pause();
            $('#hard-speed').get(0).play();
        },

        function() {
            $('#normal-speed').get(0).play();
            $('#hard-speed').get(0).pause();
        }
    );
});
