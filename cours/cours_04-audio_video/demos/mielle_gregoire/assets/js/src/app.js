/*
 * GGplayer
 * Author: Grégoire Mielle
 * Author URI : https://gregoiremielle.com/
 * Copyright © 2016 - All rights reserved
 */

function GGplayer( container, background ) {
    this.el                                 = {};
    this.el.controls                        = {};
    this.el.container                       = container;
    this.el.bckground                       = background;
    this.el.video                           = this.el.container.querySelector( 'video' );
    this.el.overlay                         = this.el.container.querySelector( '.gg-player-overlay' );
    this.el.controls.state                  = this.el.container.querySelector( '.gg-player-controls-bottom-state' );
    this.el.controls.fullscreen             = this.el.container.querySelector( '.gg-player-controls-bottom-fullscreen' );
    this.el.controls.cinema                 = this.el.container.querySelector( '.gg-player-controls-bottom-cinema' );
    this.el.controls.bar                    = this.el.container.querySelector( '.gg-player-controls-bottom-bar' );
    this.el.controls.bar_progression        = this.el.container.querySelector( '.gg-player-controls-bottom-bar-progression' );
    this.el.controls.thumb                  = this.el.container.querySelector( '.gg-player-controls-bottom-thumb' );
    this.el.controls.time                   = this.el.container.querySelector( '.gg-player-controls-bottom-time' );
    this.el.controls.time_current           = this.el.container.querySelector( '.current-time' );
    this.el.controls.time_full              = this.el.container.querySelector( '.full-time' );
    this.el.controls.share_facebook         = this.el.container.querySelector( '.gg-player-controls-top-share-facebook' );
    this.el.controls.share_twitter          = this.el.container.querySelector( '.gg-player-controls-top-share-twitter' );
    this.el.controls.share_googleplus       = this.el.container.querySelector( '.gg-player-controls-top-share-googleplus' );
    this.el.controls.volumebar              = this.el.container.querySelector( '.gg-player-controls-bottom-volumebar' );
    this.el.controls.volumebar_progression  = this.el.container.querySelector( '.gg-player-controls-bottom-volumebar-progression' );
    this.el.controls.volume_button          = this.el.container.querySelector( '.gg-player-controls-bottom-volume-button' );
    this.el.controls.volume_save            = null;
    this.el.timeout                         = 0;
    this.el.video.volume                    = 0.8;
    this.el.controls.volumebar_progression.style.transform = 'scaleX(0.8)';
}


GGplayer.prototype = {
    constructor: GGplayer,

    viewport: function()
    {
    	var rect = this.el.container.getBoundingClientRect();

    	return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
            rect.right <= ( window.innerWidth || document.documentElement.clientWidth )
    	);
    },

    state: function()
    {
        if( this.el.video.paused )
            this.el.video.play();
        else
            this.el.video.pause();
    },

    full_time: function()
    {
        var duration         = this.el.video.duration,
            full_minutes     = Math.floor( duration / 60 ),
            full_seconds     = Math.floor( duration - full_minutes * 60 );

        return ( full_minutes + ':' + full_seconds );
    },

    current_time: function()
    {
        var current_time    = this.el.video.currentTime,
            current_minutes = Math.floor( current_time / 60 ),
            current_seconds = Math.floor( current_time - current_minutes * 60 );

        if( current_seconds < 10 )
            current_seconds = '0' + current_seconds;

        if( current_minutes < 10 )
            current_minutes = '0' + current_minutes;

        return ( current_minutes + ':' + current_seconds );
    },

    enter_fullscreen: function()
    {
        if( this.el.container.requestFullscreen )
            this.el.container.requestFullscreen();

        else if( this.el.container.mozRequestFullScreen )
            this.el.container.mozRequestFullScreen();

        else if( this.el.container.webkitRequestFullscreen )
            this.el.container.webkitRequestFullscreen();
    },

    exit_fullscreen: function()
    {
        if( document.exitFullscreen )
            document.exitFullscreen();

        else if( document.mozCancelFullScreen )
            document.mozCancelFullScreen();

        else if( document.webkitExitFullscreen )
            document.webkitExitFullscreen();
    },

    check_fullscreen: function()
    {
        if( !window.screenTop && !window.screenY )
            this.el.container.classList.remove( 'fullscreen' );

        else
            this.el.container.classList.add( 'fullscreen' );
    },

    share: function( social_url )
    {
        var current_url = encodeURIComponent( window.location.href );
        share_url = social_url + current_url;
        window.open( share_url );
    },

    thumbnail: function( event )
    {
        var controls_bar      = this.el.controls.bar.offsetWidth,
            controls_bar_left = this.el.container.getBoundingClientRect().left,
            mouse_x           = event.clientX,
            ratio             = ( mouse_x - controls_bar_left ) / controls_bar,
            time              = ratio * this.el.video.duration,
            cues              = this.el.video.textTracks[0].cues,
            current_time      = null;

        for( var i = 0; i < cues.length; i++ )
        {
            if( cues[i].startTime <= time && cues[i].endTime > time )
                current_time = cues[i].text;
        }

        var url  = current_time.split( '#' )[0];
        var xywh = current_time.substr( current_time.indexOf( "=" ) + 1 ).split( ',' );

        this.el.controls.thumb.style.backgroundImage    = 'url(' + current_time.split( '#' )[0] + ')';
        this.el.controls.thumb.style.backgroundPosition = '-' + xywh[0] + 'px -' + xywh[1] + 'px';
        this.el.controls.thumb.style.left               = event.pageX - ( xywh[2] / 2 ) - ( xywh[2] * 0.34 ) + 30 + 'px';
        this.el.controls.thumb.style.top                = this.el.controls.bar.offsetTop - xywh[3] - 10 + 'px';
        this.el.controls.thumb.style.display            = 'block';
    },

    remove_volume_classes: function()
    {
        var prefix = 'volume-'
        var classes = this.el.container.className.split( ' ' ).filter( function( el )
        {
            return el.lastIndexOf( prefix, 0 ) !== 0;
        } );

        this.el.container.classList = classes.join( ' ' ).trim();
    },

    update_progress_bar: function()
    {
        var ratio = this.el.video.currentTime / this.el.video.duration;
        this.el.controls.bar_progression.style.transform = 'scaleX(' + ratio + ')';
    },

    update_current_time: function( time )
    {
        ggplayer.el.video.currentTime = ggplayer.el.video.currentTime + time;
        var ratio = ggplayer.el.video.currentTime / ggplayer.el.video.duration;
        ggplayer.el.controls.bar_progression.style.transform = 'scaleX('+ ratio +')';
    }
}



var ggplayer = new GGplayer(
    document.querySelector( '.gg-player' ),
    document.querySelector( '.gg-player-background' )
);



// Hide controls when user don't move mouse
ggplayer.el.container.addEventListener( 'mousemove', function()
{
    ggplayer.el.container.querySelector( '.gg-player-controls' ).style.opacity = 1;
    clearTimeout( ggplayer.el.timeout );
    ggplayer.el.timeout = setTimeout( function()
    {
        ggplayer.el.container.querySelector( '.gg-player-controls' ).style.opacity = 0;
    }, 2000 );
} );



// Controls Time update (Full + Current)
ggplayer.el.video.addEventListener( 'loadedmetadata', function()
{
    ggplayer.el.controls.time_full.innerText = ggplayer.full_time();

    ggplayer.el.video.ontimeupdate = function()
    {
        ggplayer.el.controls.time_current.innerText = ggplayer.current_time();
    };
} );



// Play/Pause the video on button click
ggplayer.el.controls.state.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();
    ggplayer.state();
} );



// Play/Pause the video on overlay click
ggplayer.el.overlay.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();
    ggplayer.state();
} );



// Fullscreen video
ggplayer.el.controls.fullscreen.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();

    if( ggplayer.el.container.classList.contains( 'fullscreen' ) )
        ggplayer.exit_fullscreen();

    else
    {
        ggplayer.enter_fullscreen();
        ggplayer.el.container.classList.remove( 'cinema' );
        ggplayer.el.bckground.classList.remove( 'visible' );
    }
} );



// Cinema mode video
ggplayer.el.controls.cinema.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();

    if( !ggplayer.el.container.classList.contains( 'fullscreen' ) )
    {
        if( ggplayer.el.container.classList.contains( 'cinema' ) )
        {
            ggplayer.el.container.classList.remove( 'cinema' );
            ggplayer.el.bckground.classList.remove( 'visible' );
        }

        else
        {
            ggplayer.el.container.classList.add( 'cinema' );
            ggplayer.el.bckground.classList.add( 'visible' );
        }
    }
} );



// Player class update (Play) + Progress bar
ggplayer.el.video.addEventListener( 'play', function()
{
    ggplayer.el.container.classList.add( 'playing' );
    ggplayer.el.container.classList.remove( 'paused' );

    window.setInterval( function()
    {
        ggplayer.update_progress_bar();
    }, 100 );
} );



// Player class update (Pause)
ggplayer.el.video.addEventListener( 'pause', function()
{
    ggplayer.el.container.classList.remove( 'playing' );
    ggplayer.el.container.classList.add( 'paused' );
} );



// Show thumbnails on progress bar mousemove
ggplayer.el.controls.bar.addEventListener( 'mousemove',function( event )
{
    if( ggplayer.el.video.textTracks[0].cues.length > 0 )
        ggplayer.thumbnail( event );
} );



// Hide thumbnails on progress bar mouseleave
ggplayer.el.controls.bar.addEventListener( 'mouseleave',function( event )
{
    ggplayer.el.controls.thumb.style.display = 'none';
} );



// Click on progress bar to change current time
ggplayer.el.controls.bar.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();

    var controls_bar      = ggplayer.el.controls.bar.offsetWidth,
        controls_bar_left = ggplayer.el.container.getBoundingClientRect().left,
        mouse_x           = event.clientX,
        ratio             = ( mouse_x - controls_bar_left ) / controls_bar,
        time              = ratio * ggplayer.el.video.duration;

    ggplayer.el.video.currentTime = time;

    ggplayer.update_progress_bar();
} );



// Click on volume bar to change volume
ggplayer.el.controls.volumebar.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();

    var controls_volumebar      = ggplayer.el.controls.volumebar.offsetWidth,
        controls_volumebar_left = ggplayer.el.controls.volumebar.offsetLeft + ggplayer.el.container.getBoundingClientRect().left,
        mouse_x                 = event.clientX,
        ratio                   = ( mouse_x - controls_volumebar_left ) / controls_volumebar,
        volume                  = ( Math.round( ratio * 10 ) ) / 10;

    ggplayer.el.video.volume = volume;
} );



// No volume on volume icon click
ggplayer.el.controls.volume_button.addEventListener( 'click', function( event )
{
    event = event || window.event;
    event.preventDefault();
    ggplayer.remove_volume_classes();

    if( ggplayer.el.video.volume == 0 )
        ggplayer.el.video.volume = ggplayer.el.controls.volume_save;

    else
    {
        ggplayer.el.controls.volume_save = ggplayer.el.video.volume;
        ggplayer.el.video.volume = 0;
    }
} );



// Volume change
ggplayer.el.video.addEventListener( 'volumechange', function()
{
    var volume = ggplayer.el.video.volume;
    ggplayer.remove_volume_classes();
    ggplayer.el.controls.volumebar_progression.style.transform = 'scaleX(' + volume + ')';

    if( volume == 0 )
        ggplayer.el.container.classList.add( 'volume-no' );

    else if( volume > 0 && volume <= 0.2 )
        ggplayer.el.container.classList.add( 'volume-zero' );

    else if( volume > 0.2 && volume <= 0.4 )
        ggplayer.el.container.classList.add( 'volume-one' );

    else if( volume > 0.4 && volume <= 0.6 )
        ggplayer.el.container.classList.add( 'volume-two' );

    else
        ggplayer.el.container.classList.add( 'volume-three' );
} );



// Share on social networks
ggplayer.el.controls.share_facebook.addEventListener( 'click', function()
{
    ggplayer.share( 'https://www.facebook.com/sharer/sharer.php?u=' );
} );

ggplayer.el.controls.share_twitter.addEventListener( 'click', function()
{
    ggplayer.share( 'http://twitter.com/share?url=' );
} );

ggplayer.el.controls.share_googleplus.addEventListener( 'click', function()
{
    ggplayer.share( 'https://plus.google.com/share?url=' );
} );



// Keyboard events
document.addEventListener( 'keydown', function( event )
{
    event = event || window.event;

    if( ggplayer.viewport() )
    {
        event.preventDefault();

        if( event.keyCode == '32' )
            ggplayer.state();

        else if( event.keyCode == '38' )
        {
            if( ggplayer.el.video.volume <= 0.9 )
                ggplayer.el.video.volume = ggplayer.el.video.volume + 0.1;
        }

        else if( event.keyCode == '40' )
        {
            if( ggplayer.el.video.volume >= 0.1 )
            ggplayer.el.video.volume = ggplayer.el.video.volume - 0.1;
        }

        else if( event.keyCode == '77' )
        {
            if( ggplayer.el.video.volume == 0 )
                ggplayer.el.video.volume = ggplayer.el.controls.volume_save;

            else
            {
                ggplayer.el.controls.volume_save = ggplayer.el.video.volume;
                ggplayer.el.video.volume = 0;
            }
        }

        else if( event.keyCode == '83' )
        {
            if( ggplayer.el.video.playbackRate == 2 )
                ggplayer.el.video.playbackRate = 0;

            ggplayer.el.video.playbackRate += 0.5;
        }

        else if( event.keyCode == '37' )
        {
            ggplayer.update_current_time(-10);
        }

        else if( event.keyCode == '39' )
        {
            ggplayer.update_current_time(10);
        }

        else if( event.keyCode == '70' )
        {
            if( ggplayer.el.container.classList.contains( 'fullscreen' ) )
                ggplayer.exit_fullscreen();

            else
            {
                ggplayer.enter_fullscreen();
                ggplayer.el.container.classList.remove( 'cinema' );
                ggplayer.el.bckground.classList.remove( 'visible' );
            }
        }

        else if( event.keyCode == '67' )
        {
            if( ggplayer.el.container.classList.contains( 'cinema' ) )
            {
                ggplayer.el.container.classList.remove( 'cinema' );
                ggplayer.el.bckground.classList.remove( 'visible' );
            }

            else
            {
                ggplayer.el.container.classList.add( 'cinema' );
                ggplayer.el.bckground.classList.add( 'visible' );
            }
        }

        else if( event.keyCode == '27' )
            ggplayer.exit_fullscreen();
    }
} );



// Check fullscreen to add or remove css class
document.addEventListener( 'webkitfullscreenchange', function( event ) { ggplayer.check_fullscreen(); } );
document.addEventListener( 'mozfullscreenchange',    function( event ) { ggplayer.check_fullscreen(); } );
document.addEventListener( 'fullscreenchange',       function( event ) { ggplayer.check_fullscreen(); } );



console.log('%c GGplayer - A responsive HTML5 video player in pure javascript.', 'background: #00E676; color: #212121;');
