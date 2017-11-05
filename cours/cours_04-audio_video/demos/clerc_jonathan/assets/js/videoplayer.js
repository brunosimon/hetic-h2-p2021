
function VideoPlayer(player) {

    // We need to do this to use reference of the object in the callback functions
    var self = this;

    if (!(this instanceof VideoPlayer)) {
        throw new Error('Please use the "new" operator, this object constructor cannot be called as a function.');
    }

    // Check argument
    var playerElement;

    if (typeof player === 'string') {
        playerElement = document.querySelector(player);
    } else if (player && player.nodeType) {
        playerElement = player;
    } else if (typeof player === 'undefined') {
        throw new Error('One argument is needed to find the player.');
    } else {
        throw new Error('Player has to be a string or a DOMElement, "' + (typeof player) + '" given.');
    }

    if (!playerElement) {
        throw new Error('The player was not found. Please check the argument given.');
    }

    /* 
     * ------------------------------------
     *              CONSTANTS
     * ------------------------------------
     * 
     */

    self.elements = {
        player  : playerElement,
        ambient : playerElement.querySelector('.ambient'),
        video   : playerElement.querySelector('.video'),
        panel   : playerElement.querySelector('.panel'),

        progress: {
            loaded : playerElement.querySelector('.progress-bar .progress-loaded'),
            viewed : playerElement.querySelector('.progress-bar .progress-viewed'),
            volume : playerElement.querySelector('.buttons .volume-slider .bar-on')
        },

        slider: {
            cursor : playerElement.querySelector('.panel .progress-bar'),
            volume : playerElement.querySelector('.buttons .volume-slider .bar-slider')
        },

        preview: {
            container  : playerElement.querySelector('.seeking-preview'),
            canvas     : playerElement.querySelector('.seeking-preview .frame-canvas'),
            label      : playerElement.querySelector('.seeking-preview .frame-label .center-label'),
            thumbnails : playerElement.querySelector('.seeking-preview .thumbnails'),
        },

        controls: {
            playState    : playerElement.querySelector('.buttons .button.play-state'),
            volumeToggle : playerElement.querySelector('.buttons .button.volume-toggle'),
            share        : playerElement.querySelector('.buttons .button.share'),
            hd           : playerElement.querySelector('.buttons .button.hd'),
            fullscreen   : playerElement.querySelector('.buttons .button.fullscreen')
        },
        
        timer: {
            current : playerElement.querySelector('.buttons .timer .current'),
            max     : playerElement.querySelector('.buttons .timer .max'),
        },

        sharing: {
            shareLink : playerElement.querySelector('.panel .share-link'),
            triangle  : playerElement.querySelector('.buttons .button.share .triangle'),
            link      : playerElement.querySelector('.panel .share-link .link'),
        },

        light: [
            playerElement.querySelector('.ambient .light-1'),
            playerElement.querySelector('.ambient .light-2'),
            playerElement.querySelector('.ambient .mask')
        ]
    };

    /* 
     * ------------------------------------
     *              VARIABLES
     * ------------------------------------
     * 
     */

    self.data = {
        hovered: false,
        toggleTimeout: null,
        canvas: document.createElement('canvas'),
        context: null,
        playingHD: null,
        isChangingQuality: false,
        useHash: false,
        corsSecurity: null,
        gradientPrefix: ''
    };
    
    /* 
     * ------------------------------------
     *            INITIALIZATION
     * ------------------------------------
     * 
     */

    // Init controls
    self.getVideo().controls = false;

    var fullscreenSupport = document.exitFullscreen || document.oExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
    if (!fullscreenSupport) self.elements.controls.fullscreen.style.display = 'none';

    // Set canvas size to 2px, to get the 2 main colors of video
    self.data.canvas.width = 1;
    self.data.canvas.height = 2;
    self.data.context = self.data.canvas.getContext('2d');

    // Update quality controls
    // "dataset" is not used, due to IE 10..
    if (!self.getVideo().hasAttribute('data-src') || !self.getVideo().hasAttribute('data-quality')) {
        self.elements.controls.hd.style.display = 'none';
    } else {
        self.data.playingHD = self.getVideo().getAttribute('data-quality').toLowerCase() === 'hd';
        if (self.data.playingHD === false) {
            self.elements.controls.hd.classList.add('clicked');
        }
    }

    // Update controls with initial video state
    self.togglePause(self.isPaused() && !self.getVideo().autoplay);
    self.toggleMute(self.isMuted());

    // Update buffer progress
    self.updateBuffer();

    // Update timer
    self.updateTimer();
    self.getVideo().addEventListener('loadedmetadata', function (e) {
        if (!self.data.isChangingQuality) {
            self.updateTimer();
        }
    });

    // Update size of canvas frame preview
    self.elements.preview.canvas.width = self.elements.preview.canvas.offsetWidth;
    self.elements.preview.canvas.height = self.elements.preview.canvas.offsetHeight;

    // Detect which prefix is needed for the gradient
    var div = document.createElement('div'),
        prefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];

    for (var i = 0; i < prefixes.length; i++) {
        div.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';
        if (div.style.background) {
            // If style was set, it means that the prefix worked
            self.data.gradientPrefix = prefixes[i];
            break;
        }
    }

    // Here we detect if we can put a frame in canvas and retrieve what we just drew
    // If it causes a security error, it throws an error and goes into catch block
    self.getVideo().addEventListener('loadeddata', function (e) {
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');
        context.drawImage(self.getVideo(), 0, 0, 1, 1);
        try {
            // Here is the line that may throw an error
            var get = context.getImageData(0, 0, 1, 1).data;
            // Every thing seems to work, so we'll not use any fallback
            self.data.corsSecurity = false;
        } catch (error) {
            // An error was thrown..
            self.data.corsSecurity = true;
            // Hopefully we have a fallback for ambient colors !
            self.elements.light[2].classList.add('active');
        }
    });

    /* 
     * ------------------------------------
     *           TOGGLE CONTROLS
     * ------------------------------------
     * 
     */

    self.elements.player.addEventListener('mousemove', function (e) {
        if (self.isPanelHidden() && e.target && !self.elements.ambient.contains(e.target)) {
            self.togglePanel(true).delayUpdatePanel();
        }
    });

    self.elements.panel.addEventListener('mouseenter', function (e) {
        if (e.target && !self.elements.ambient.contains(e.target)) {
            self.setHovered(true);
        }
    });

    self.elements.panel.addEventListener('mouseleave', function (e) {
        if (e.target && !self.elements.ambient.contains(e.target)) {
            self.setHovered(false).delayUpdatePanel();
        }
    });
    
    /* 
     * ------------------------------------
     *           CLICK ACTIONS
     * ------------------------------------
     * 
     */

    // Play Pause
    var playStateListener = function (e) {
        e.preventDefault();
        self.togglePause();
    };

    self.elements.controls.playState.addEventListener('click', playStateListener);
    self.elements.preview.container.addEventListener('click', playStateListener);
    self.elements.player.querySelector('.indicators').addEventListener('click', playStateListener);
    self.elements.player.querySelector('.video-wrapper').addEventListener('click', playStateListener);

    // Toggle Volume
    self.elements.controls.volumeToggle.addEventListener('click', function (e) {
        e.preventDefault();
        self.toggleMute();
    });
    
    // Share link
    self.elements.controls.share.addEventListener('click', function (e) {
        e.preventDefault();
        self.toggleSharing();
    });

    self.elements.sharing.link.addEventListener('click', function (e) {
        this.select();
    });

    // Toggle HD
    self.elements.controls.hd.addEventListener('click', function (e) {
        e.preventDefault();
        self.toggleHD();
    });

    // Toggle Fullscreen
    self.elements.controls.fullscreen.addEventListener('click', function (e) {
        e.preventDefault();
        self.toggleFullscreen();
    });
    
    /* 
     * ------------------------------------
     *             KEYBOARD ACTIONS
     * ------------------------------------
     * 
     */
    
    document.addEventListener('keyup', function (e) {
        if (e.target && self.elements.player.contains(e.target)) {
            e.preventDefault();
            var key = 'which' in e ? e.which : e.keyCode, current;

            if (key === 32) { // [ ] Space
                playStateListener(e);
            
            } else if (key === 37) { // [←] Rewind
                current = self.getCurrentPercentage();
                current = current < 10 ? 0 : current - 10;
                self.setCurrentPercentage(current);
            
            } else if (key === 39) { // [→] Forward
                current = self.getCurrentPercentage();
                current = current > 90 ? 100 : current + 10;
                self.setCurrentPercentage(current);
            
            } else if (key === 38) { // [↑] Volume Up
                current = self.getVolumePercentage();
                current = current > 80 ? 100 : current + 20;
                self.setVolumePercentage(current);

            } else if (key === 40) { // [↓] Volume Down
                current = self.getVolumePercentage();
                current = current < 20 ? 0 : current - 20;
                self.setVolumePercentage(current);
            
            } else if (key === 70 && fullscreenSupport) { // [F] Fullscreen
                self.toggleFullscreen();
            
            } else if (key === 77) { // [M] Mute
                self.toggleMute();
            
            } else if (key === 81) { // [Q] Quality
                self.toggleHD();
            
            } else if (key >= 48 && key <= 57) { // [0 - 9] Change cursor
                var pos = (key - 48);    // [0, 9]
                var percent = pos * 100 / 9; // [0, 100]
                self.setCurrentPercentage(percent);
            }
        }
    });
    
    /* 
     * ------------------------------------
     *             UPDATE PANEL
     * ------------------------------------
     * 
     */

    // If video is changed without using our controls, we want to be notified to update it

    self.getVideo().addEventListener('play', function (e) {
        self.elements.controls.playState.classList.add('clicked');
        self.elements.player.classList.remove('paused');
        self.delayUpdatePanel();
    });

    self.getVideo().addEventListener('pause', function (e) {
        self.elements.controls.playState.classList.remove('clicked');
        self.elements.player.classList.add('paused');
        self.togglePanel(true);
    });

    self.getVideo().addEventListener('volumechange', function (e) {
        self.toggleMute(self.isMuted());
    });

    var exitFullscreenListener = function (e) {
        if (!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)) {
            self.toggleFullscreen(false);
        }
    };

    document.addEventListener('webkitfullscreenchange', exitFullscreenListener);
    document.addEventListener('mozfullscreenchange',    exitFullscreenListener);
    document.addEventListener('fullscreenchange',       exitFullscreenListener);
    document.addEventListener('MSFullscreenChange',     exitFullscreenListener);

    self.getVideo().addEventListener('waiting', function (e) {
        self.toggleLoading(true);
    });

    self.getVideo().addEventListener('playing', function (e) {
        self.toggleLoading(false);
    });

    self.getVideo().addEventListener('canplay', function (e) {
        self.toggleLoading(false);
    });

    self.getVideo().addEventListener('error', function (e) {
        if (e.target.error && e.target.error.code) {
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    console.warn('Loading was aborted');
                    break;
                case e.target.error.MEDIA_ERR_NETWORK:
                    console.warn('Network error.');
                    break;
                case e.target.error.MEDIA_ERR_DECODE:
                    console.warn('Decoding error.');
                    break;
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.warn('Format is not supported.');
                    break;
                default:
                    console.warn('Unknown error.');
                    break;
            }
        } else {
            console.warn('Error was not provided.');
        }
        self.elements.player.classList.add('failed');
        self.togglePause(true);
    });

    /* 
     * ------------------------------------
     *            PROGRESS BAR
     * ------------------------------------
     * 
     */

    // Update time indicator
    self.getVideo().addEventListener('timeupdate', function (e) {
        if (!self.data.isChangingQuality) {
            self.updateTimer();
        }
    });

    window.setInterval(function () {
        if (!self.data.isChangingQuality) {
            self.applyTransform(self.elements.progress.viewed, self.getCurrentPercentage() - 100);
            self.applyTransform(document.querySelector('.player .progress-bar .bubble-bar'), self.getCurrentPercentage());
        }
    }, 50);

    // Buffer progress
    window.setInterval(function () {
        self.updateBuffer();
    }, 100);

    // Backward compatibility for buffer progress
    self.getVideo().addEventListener('progress', function (e) {
        if (e.total && e.loaded) {
            var loaded = e.loaded * 100 / e.total;
            self.applyTransform(self.elements.progress.loaded, loaded - 100);
        }
    });

    // When video ends
    self.getVideo().addEventListener('ended', function (e) { self.togglePause(true); });

    /* 
     * ------------------------------------
     *             DRAG ACTIONS
     * ------------------------------------
     * 
     */

    var calcOffset = function (event, element) {
        var clientRect = element.getBoundingClientRect(),
            leftOffset = event.clientX - clientRect.left;
        return leftOffset * 100 / (clientRect.right - clientRect.left);
    };
    
    // Cursor: on simple click
    self.elements.slider.cursor.addEventListener('click', function (e) {
        self.setCurrentPercentage(calcOffset(e, this));
        e.preventDefault();
    });

    // Cursor: on drag
    self.elements.slider.cursor.addEventListener('mousedown', function (e) {
        var cursor = this,
            wasPaused = self.isPaused();

        self.elements.player.classList.add('seeking');
        if (!wasPaused) self.togglePause(true);
        e.preventDefault();

        var refreshProgress = function (e) {
            var percentage = calcOffset(e, cursor),
                width = self.elements.preview.canvas.width,
                height = self.elements.preview.canvas.height;

            if (percentage < 0) percentage = 0;
            else if (percentage > 100) percentage = 100;

            var frame = Math.round(percentage * (self.elements.preview.thumbnails.children.length - 1) / 100),
                source = self.elements.preview.thumbnails.children[frame];

            self.setCurrentPercentage(percentage);
            self.applyTransform(self.elements.preview.thumbnails, -percentage);
            self.setHovered(true); // Keep panel opened
            self.elements.preview.label.textContent = self.getFormattedTime(self.getCurrentSeconds());

            if (self.elements.preview.container.classList.contains('loaded') && self.elements.preview.canvas.getAttribute('data-frame') !== source.getAttribute('data-frame')) {
                self.elements.preview.canvas.setAttribute('data-frame', source.getAttribute('data-frame'));
                self.elements.preview.canvas.getContext('2d').drawImage(source, 0, 0, width, height);
            }
        };

        refreshProgress(e);

        document.addEventListener('mousemove', refreshProgress);
        document.addEventListener('mouseup', function mouseup(e) {
            document.removeEventListener('mouseup', mouseup);
            document.removeEventListener('mousemove', refreshProgress);
            self.elements.player.classList.remove('seeking');
            if (!wasPaused) self.togglePause(false);
        });
    });

    // Volume: on simple click
    self.elements.slider.volume.addEventListener('click', function (e) {
        self.setVolumePercentage(calcOffset(e, this));
        e.preventDefault();
    });

    // Volume: on drag
    self.elements.slider.volume.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var slider = this,
            volume = self.elements.player.querySelector('.buttons .volume');
        volume.classList.add('dragging');

        var mousemove = function (e) {
            self.setVolumePercentage(calcOffset(e, slider));
            self.setHovered(true); // Keep panel opened
        };
        document.addEventListener('mousemove', mousemove);

        document.addEventListener('mouseup', function mouseup(e) {
            document.removeEventListener('mouseup', mouseup);
            document.removeEventListener('mousemove', mousemove);
            volume.classList.remove('dragging');
        });
    });
    
    /* 
     * ------------------------------------
     *         GENERATE THUMBNAILS
     * ------------------------------------
     * 
     */

    var videoContainer = self.elements.player.querySelector('.video-source'),
        videoSource;

    // We take the lowest quality if possible
    if (typeof self.data.playingHD === 'boolean') {
        var src    = self.getVideo().getAttribute('data-src'),
            format = (self.getVideo().getAttribute('data-format') || 'mp4,webm,ogv').split(',');

        videoSource = document.createElement('video');

        for (var j = 0; j < format.length; j++) {
            var source = document.createElement('source');
            source.src = src.replace('{quality}', 'sd').replace('{format}', format[j]);
            source.type = 'video/' + format[j].replace('ogv', 'ogg');
            videoSource.appendChild(source);
        }
    } else {
        videoSource = document.createElement('video');
        if (self.elements.video.src) {
            videoSource.src = self.elements.video.src;
        } else {
            var sources = self.elements.video.querySelectorAll('source');
            for (var k = 0; k < sources.length; k++) {
                videoSource.appendChild(sources[k]);
            }
        }
    }

    videoSource.load();

    var first = true,
        currentFrame = 0,
        totalFrames;

    videoSource.addEventListener('loadeddata', function makeThumbnail(e) {
        totalFrames = ~~(videoSource.duration / 2);
        videoSource.currentTime = 0;
        videoSource.removeEventListener('loadeddata', makeThumbnail);
    });

    videoSource.addEventListener('seeked', function makeThumbnail(e) {
        if (currentFrame < totalFrames) {
        // if (videoSource.currentTime < videoSource.duration - 2) {

            var canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');

            canvas.width = 160;
            canvas.height = 90;
            canvas.classList.add('thumbnail');
            // canvas.setAttribute('data-frame', videoSource.currentTime);
            canvas.setAttribute('data-frame', currentFrame);

            context.drawImage(videoSource, 0, 0, canvas.width, canvas.height);
            self.elements.preview.thumbnails.appendChild(canvas);

            if (first) {
                self.elements.preview.canvas.getContext('2d').drawImage(self.elements.preview.thumbnails.children[0], 0, 0, canvas.width, canvas.height);
                first = false;
            }

            // videoSource.currentTime += 2;
            currentFrame++;
            videoSource.currentTime = videoSource.duration * (currentFrame / totalFrames);

        } else {
            // Ended
            self.elements.preview.container.classList.add('loaded');
            videoSource.removeEventListener('seeked', makeThumbnail);
            videoSource.remove();
        }

    });

    videoContainer.appendChild(videoSource);

}

    /* 
     * ------------------------------------
     *          GETTERS AND SETTERS
     * ------------------------------------
     * 
     */

VideoPlayer.prototype.getVideo = function () {    
    return this.elements.video;
};

VideoPlayer.prototype.getDuration = function () {    
    return this.getVideo().duration;
};

VideoPlayer.prototype.getCurrentSeconds = function () {    
    return this.getVideo().currentTime;
};

VideoPlayer.prototype.setCurrentSeconds = function (seconds) {
    if (seconds < 0) {
        this.getVideo().currentTime = 0;
    } else if (seconds > this.getDuration()) {
        this.getVideo().currentTime = this.getDuration();
    } else if (isFinite(seconds)) {
        this.getVideo().currentTime = seconds;
        this.updateTimer();
    }
    return this;
};

VideoPlayer.prototype.getCurrentPercentage = function () {
    return Math.min(this.getCurrentSeconds() * 100 / this.getDuration(), 100);
};

VideoPlayer.prototype.setCurrentPercentage = function (percentage) { 
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    this.setCurrentSeconds(this.getDuration() * percentage / 100);
    return this;
};

VideoPlayer.prototype.getVolumePercentage = function () {    
    return this.getVideo().volume * 100;
};

VideoPlayer.prototype.setVolumePercentage = function (percentage) {    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    if (isFinite(percentage)) {
        this.getVideo().muted = false;
        this.getVideo().volume = percentage / 100;
        this.applyTransform(this.elements.progress.volume, percentage - 100);
    }
    return this;
};

VideoPlayer.prototype.getPlaybackRate = function () {    
    return this.getVideo().playbackRate;
};

VideoPlayer.prototype.setPlaybackRate = function (rate) {
    this.getVideo().playbackRate = rate;
    return this;
};

VideoPlayer.prototype.isPaused = function () {
    return this.getVideo().paused;
};

// Play or pause the video (boolean)
// Without argument, the function toggles it 
VideoPlayer.prototype.togglePause = function (forceState) {    
    if (typeof forceState === 'undefined') forceState = !this.isPaused();
    if (forceState) {
        this.elements.controls.playState.classList.remove('clicked');
        this.elements.player.classList.add('paused');
        this.getVideo().pause();
    } else {
        this.elements.controls.playState.classList.add('clicked');
        this.elements.player.classList.remove('paused');
        this.getVideo().play();
        this.toggleSharing(false);
    }
    return this;
};

VideoPlayer.prototype.isMuted = function () {
    return this.getVideo().muted;
};

// Enable or disable the sound (boolean)
// Without argument, the function toggles it 
VideoPlayer.prototype.toggleMute = function (forceState) {    
    if (typeof forceState === 'undefined') forceState = !this.isMuted();
    this.getVideo().muted = forceState;
    if (forceState) {
        this.elements.controls.volumeToggle.classList.add('clicked');
        // We don't use setVolumePercentage, because
        // we want to keep original volume percentage
        this.applyTransform(this.elements.progress.volume, -100);
    } else {
        this.elements.controls.volumeToggle.classList.remove('clicked');
        this.setVolumePercentage(this.getVolumePercentage());
    }
    return this;
};

VideoPlayer.prototype.isHovered = function () {
    return this.data.hovered;
};

// Set whether the panel is hovered or not
VideoPlayer.prototype.setHovered = function (state) {    
    this.data.hovered = state;
    return this;
};

VideoPlayer.prototype.isSharing = function () {
    return this.elements.panel.querySelector('.share-link').classList.contains('active');
};

VideoPlayer.prototype.toggleSharing = function (forceState) {
    if (typeof forceState === 'undefined') forceState = !this.isSharing();

    if (forceState) {
        this.elements.sharing.shareLink.classList.add('active');
        this.elements.sharing.triangle.classList.add('active');
        this.togglePause(true);
        this.elements.sharing.link.value = this.getLink();
        this.elements.sharing.link.select();
    } else {
        this.elements.sharing.shareLink.classList.remove('active');
        this.elements.sharing.triangle.classList.remove('active');
    }
};

VideoPlayer.prototype.isHD = function () {
    return this.data.playingHD;
};

VideoPlayer.prototype.toggleHD = function (forceState) {
    var self        = this,
        src         = self.getVideo().getAttribute('data-src'),
        formats      = (self.getVideo().getAttribute('data-format') || 'mp4,webm,ogv').split(','),
        percentage  = self.getCurrentPercentage(),
        wasPaused   = self.isPaused(),
        wasMuted    = self.isMuted(),
        hasStarted  = self.getCurrentSeconds() > 0 || (self.getVideo().played && self.getVideo().played.length);

    if (typeof forceState === 'undefined') forceState = !self.isHD();

    if (forceState) self.elements.controls.hd.classList.remove('clicked');
    else self.elements.controls.hd.classList.add('clicked');

    // If playingHD is not a boolean, it means that quality wasn't defined
    if (typeof self.data.playingHD === 'boolean') {
        self.getVideo().pause();

        // If video has started, we put the current frame in front of video while the quality is loading
        // Then we take it off when the video play again
        if (hasStarted) {
            var canvas = self.elements.player.querySelector('.loading-preview'),
                context = canvas.getContext('2d');

            canvas.classList.add('active');
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            context.drawImage(self.getVideo(), 0, 0, canvas.width, canvas.height);
        }

        // Here we just remove old sources, and replace by the new ones 
        if (self.getVideo().src) {
            var format = self.getVideo().src.substring(self.getVideo().src.lastIndexOf('.') + 1);
            self.getVideo().src = src.replace('{quality}', forceState ? 'hd' : 'sd').replace('{format}', format);
        } else {
            var sources = self.getVideo().querySelectorAll('source');
            for (var i = 0; i < sources.length; i++) sources[i].remove();

            for (var j = 0; j < formats.length; j++) {
                var source = document.createElement('source');
                source.src = src.replace('{quality}', forceState ? 'hd' : 'sd').replace('{format}', formats[j]);
                source.type = 'video/' + formats[j].replace('ogv', 'ogg');
                self.getVideo().appendChild(source);
            }
        }

        // Reload video
        self.getVideo().load();
        self.toggleLoading(true);
        self.data.isChangingQuality = true;
        self.data.playingHD = forceState;

        // When the video is enough loaded, we play it again
        var canPlay = function canPlay() {
            self.getVideo().removeEventListener('canplay', canPlay);
            self.getVideo().removeEventListener('loadedmetadata', canPlay);
            if (hasStarted) self.setCurrentPercentage(percentage);

            // Timeout is used to avoid video flashing, as the browser may take a while to render new video
            window.setTimeout(function () {
                if (!wasPaused) self.getVideo().play();
                self.setVolumePercentage(self.getVolumePercentage())
                    .toggleMute(wasMuted)
                    .updateTimer()
                    .updateBuffer();
                if (canvas) canvas.classList.remove('active');
                self.data.isChangingQuality = false;
            }, 250);
        };

        self.getVideo().addEventListener('canplay', canPlay);
        self.getVideo().addEventListener('loadedmetadata', canPlay);
    }

    return this;
};

// Is fullscreen enabled
VideoPlayer.prototype.isFullscreen = function () {    
    return !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement);
};

// Enable or disable the fullscreen (boolean)
// Without argument, the function toggles it 
VideoPlayer.prototype.toggleFullscreen = function (forceState) {    
    if (typeof forceState === 'undefined') forceState = !this.isFullscreen();

    if (forceState) {
        var v = this.elements.player;
        if      (v.requestFullscreen)       v.requestFullscreen();
        else if (v.oRequestFullscreen)      v.oRequestFullscreen();
        else if (v.msRequestFullscreen)     v.msRequestFullscreen();
        else if (v.mozRequestFullScreen)    v.mozRequestFullScreen();
        else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
        this.elements.controls.fullscreen.classList.add('clicked');
        this.elements.player.classList.add('fullscreen');
    } else {
        if      (document.cancelFullScreen)       document.cancelFullScreen();
        else if (document.oCancelFullScreen)      document.oCancelFullScreen();
        else if (document.msCancelFullScreen)     document.msCancelFullScreen();
        else if (document.mozCancelFullScreen)    document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        this.elements.controls.fullscreen.classList.remove('clicked');
        this.elements.player.classList.remove('fullscreen');
    }

    return this;
};

VideoPlayer.prototype.isPanelHidden = function () {
    return this.elements.panel.classList.contains('hide');
};

// Show or hide the panel (boolean)
// Without argument, the function toggles it 
VideoPlayer.prototype.togglePanel = function (forceState) {    
    if (typeof forceState === 'undefined') forceState = this.isPanelHidden();

    if (forceState) this.elements.panel.classList.remove('hide');
    else this.elements.panel.classList.add('hide');
    return this;
};

VideoPlayer.prototype.isLoading = function () {
    return this.getVideo().paused;
};

// Play or pause the video (boolean)
// Without argument, the function toggles it 
VideoPlayer.prototype.toggleLoading = function (forceState) {    
    if (typeof forceState === 'undefined') forceState = !this.isLoading();
    if (forceState) {
        this.elements.player.classList.add('loading');
    } else {
        this.elements.player.classList.remove('loading');
    }
    return this;
};

    /* 
     * ------------------------------------
     *                PANEL
     * ------------------------------------
     * 
     */

// Check if the panel has to be shown or not
VideoPlayer.prototype.updatePanel = function () {
    if (this.isHovered()) {
        this.togglePanel(true);
    } else if (this.isPanelHidden()) {
        if (this.isPaused()) this.togglePanel(true);
    } else {
        if (!this.isPaused()) this.togglePanel(false);
    }
    return this;
};

// Update state of panel after a 2s delay
VideoPlayer.prototype.delayUpdatePanel = function () {
    var self = this;

    if (typeof self.data.toggleTimeout === 'number') {
        clearTimeout(self.data.toggleTimeout);
    }

    self.data.toggleTimeout = window.setTimeout(function () {
        self.updatePanel();
    }, 2000);

    return this;
};

VideoPlayer.prototype.updateTimer = function () {
    var timerCurrent = this.elements.timer.current,
        timerMax     = this.elements.timer.max;

    timerCurrent.textContent = this.getCurrentSeconds() > 0 ? this.getFormattedTime(this.getCurrentSeconds()) : '0:00';
    timerMax.textContent     = this.getDuration() > 0 ? this.getFormattedTime(this.getDuration()) : '0:00';

    this.elements.sharing.link.value = this.getLink();
    if (~~(this.elements.sharing.link.selectionEnd - this.elements.sharing.link.selectionStart) !== 0) {
        this.elements.sharing.link.select();
    }
    return this;
};

VideoPlayer.prototype.updateBuffer = function () {
    var bufferLength = this.getVideo().buffered.length;
    if (bufferLength > 0) {
        var loaded = this.getVideo().buffered.end(bufferLength - 1) * 100 / this.getVideo().duration;
        this.applyTransform(this.elements.progress.loaded, loaded - 100);
    }
    return this;
};

VideoPlayer.prototype.setColorTheme = function(color) {
    var colors = ['red', 'blue', 'green'];
    if (colors.indexOf(color.toLowerCase()) > -1) {
        for (var i = 0; i < colors.length; i++) {
            if (this.elements.player.classList.contains(colors[i])) {
                this.elements.player.classList.remove(colors[i]);
            }
        }
        this.elements.player.classList.add(color.toLowerCase());        
    }
};

    /* 
     * ------------------------------------
     *               AMBIENT
     * ------------------------------------
     * 
     */

VideoPlayer.prototype.enableAmbient = function () {
    var self = this;

    window.setInterval(function () {
        if (self.isPaused() || typeof self.data.corsSecurity !== 'boolean') return;

        var applyTo = self.elements.light[0].classList.contains('active') ? self.elements.light[1] : self.elements.light[0];

        if (!self.data.corsSecurity) {

            // We draw a 2x1 picture of current video, so browser picks the 2 main colors
            self.data.context.drawImage(self.getVideo(), 0, 0, self.data.canvas.width, self.data.canvas.height);
            
            // We get color that we just draw
            var c = self.data.context.getImageData(0, 0, self.data.canvas.width, self.data.canvas.height).data;

            // We skip black colors (often happen when video is not loaded, or is about to end)
            if (c[0] + c[1] + c[2] + c[4] + c[5] + c[6] === 0) return;

            // And now we put the colors in a CSS gradient
            if (!self.data.gradientPrefix.length) {
                applyTo.style.background = 'radial-gradient(ellipse at center -600px, rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ') 0%, rgb(' + c[4] + ', ' + c[5] + ', ' + c[6] + ') 100%)';
            } else {
                applyTo.style.background = self.data.gradientPrefix + 'radial-gradient(center -600px, ellipse, rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ') 0%, rgb(' + c[4] + ', ' + c[5] + ', ' + c[6] + ') 100%)';
            }

        } else {

            // We can't get image data due to cross origin security
            // Instead we just show a 1x1 canvas in 100% width/height

            if (!applyTo.children[0]) {
                // If canvas doesn't exist, we create it
                var canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d');

                canvas.width = 1;
                canvas.height = 1;
                canvas.classList.add('background');

                applyTo.appendChild(canvas);
            }

            applyTo.children[0].getContext('2d').drawImage(self.getVideo(), 0, 0, 1, 1);

        }        

        // As we can't do transition on gradient, we use 2 layers
        // And we apply gradient to one, and do a transition on opacity
        // Then next time we apply gradient to other one, etc...
        self.elements.light[0].classList.toggle('active');
        self.elements.light[1].classList.toggle('active');

    }, 1000);

    return this;
};

    /* 
     * ------------------------------------
     *                MISC
     * ------------------------------------
     * 
     */

// Focus player element to capture keyboard actions
VideoPlayer.prototype.focus = function () {
    this.elements.player.focus();
    return this;
};

// Update current time with hash provided
VideoPlayer.prototype.useHash = function (time) {
    // So the link shared will provide a hash
    this.data.useHash = true;
    // If argument is not provided, we use hash from location
    if (typeof time === 'undefined') {
        if (window.location.hash && window.location.hash.substring(0, 3) === '#t=') {
            time = window.location.hash;
        } else {
            return this;
        }
    }
    if (time.substring(0, 3) === '#t=') {
        time = time.substring(3);
    }
    var digits = time.match(/\d+\D/g),
        startAt = 0,
        multipliers = { s: 1, m: 60, h: 3600 };
    for (var t in digits) {
        var multiplier = multipliers[digits[t].slice(-1)],
            add = ~~digits[t].slice(0, -1) * multiplier;
        if (!isNaN(add)) startAt += add;
    }
    this.setCurrentSeconds(startAt);
    return this;
};

    /* 
     * ------------------------------------
     *                UTILS
     * ------------------------------------
     * 
     */

// Return formatted time
VideoPlayer.prototype.getLink = function () {
    var totalSeconds = this.getCurrentSeconds(),
        hours = ~~(totalSeconds / 3600),
        minutes = ~~((totalSeconds - hours * 3600) / 60),
        seconds = ~~(totalSeconds - hours * 3600 - minutes * 60),
        link = window.location.href.split('#')[0],
        hash = (hours ? hours + 'h' : '') + (minutes ? minutes + 'm' : '') + (seconds ? seconds + 's' : '');

    return link + (hash ? '#t=' + hash : '');
};

// Return formatted time
VideoPlayer.prototype.getFormattedTime = function (totalSeconds) {
    var hours = ~~(totalSeconds / 3600),
        minutes = ~~((totalSeconds - hours * 3600) / 60),
        seconds = ~~(totalSeconds - hours * 3600 - minutes * 60);

    return (hours ? hours + (minutes < 10 ? ':0' : ':') : '') + minutes + (seconds < 10 ? ':0' : ':') + seconds;
};

VideoPlayer.prototype.applyTransform = function (element, percentage, precision) {
    precision = typeof precision === 'number' ? precision : 100;
    var percentageRounded = Math.round(percentage * precision) / precision;
    element.style.webkitTransform = 'translateX('  + percentageRounded + '%)';
    element.style.mozTransform    = 'translateX('  + percentageRounded + '%)';
    element.style.msTransform     = 'translateX('  + percentageRounded + '%)';
    element.style.oTransform      = 'translateX('  + percentageRounded + '%)';
    element.style.transform       = 'translateX('  + percentageRounded + '%)';
    return this;
};

// Static function - Show usage
VideoPlayer.usage = function () {
    if (!console || !console.groupCollapsed) return;
    console.log('VideoPlayer API');

    console.groupCollapsed('Getters and Setters (percentage are between 0 and 100)');
    console.log('%O - Return the duration in seconds of the video', this.prototype.getDuration);
    console.log('%O - Return the current seconds already viewed', this.prototype.getCurrentSeconds);
    console.log('%O - Set how many seconds are already viewed', this.prototype.setCurrentSeconds);
    console.log('%O - Return the percentage of video that is already viewed', this.prototype.getCurrentPercentage);
    console.log('%O - Set the percentage of video that is already viewed', this.prototype.setCurrentPercentage);
    console.log('%O - Return the volume percentage', this.prototype.getVolumePercentage);
    console.log('%O - Set the volume percentage', this.prototype.setVolumePercentage);
    console.log('%O - Return the playback rate', this.prototype.getPlaybackRate);
    console.log('%O - Set the volume playback rate', this.prototype.setPlaybackRate);
    console.groupEnd();

    console.groupCollapsed('Player state (forceState is always optional)');
    console.log('%O - Return true if the video is paused', this.prototype.isPaused);
    console.log('%O - Pause or play the video', this.prototype.togglePause);
    console.log('%O - Return true if the video is mutted', this.prototype.isMuted);
    console.log('%O - Mute or unmute the video', this.prototype.toggleMute);
    console.log('%O - Return true if the panel is hovered', this.prototype.isHovered);
    console.log('%O - Set whether the panel is hovered or not', this.prototype.setHovered);
    console.log('%O - Return true if the sharing box is opened', this.prototype.isSharing);
    console.log('%O - Show or hide the sharing box', this.prototype.toggleSharing);
    console.log('%O - Return true if the video is in HD', this.prototype.isHD);    
    console.log('%O - Change quality of video', this.prototype.toggleHD);    
    console.log('%O - Return true if the player is in fullscreen', this.prototype.isFullscreen);
    console.log('%O - Enable or disable fullscreen', this.prototype.toggleFullscreen);
    console.log('%O - Return true if the panel is hidden', this.prototype.isPanelHidden);
    console.log('%O - Show or hide the panel', this.prototype.togglePanel);
    console.log('%O - Return true if the video is loading', this.prototype.isLoading);
    console.log('%O - Show or hide loading icon', this.prototype.toggleLoading);
    console.groupEnd();

    console.groupCollapsed('Update panel');
    console.log('%O - Show or hide the panel if needed', this.prototype.updatePanel);
    console.log('%O - Update panel 2s later', this.prototype.delayUpdatePanel);
    console.log('%O - Update the label "x:xx / x:xx"', this.prototype.updateTimer);
    console.log('%O - Update the progress bar of video loaded', this.prototype.updateBuffer);
    console.log('%O - Change color theme ("red", "blue" or "green")', this.prototype.setColorTheme);
    console.groupEnd();

    console.groupCollapsed('Other methods');
    console.log('%O - Enable background ambient colors when video is playing', this.prototype.enableAmbient);
    console.log('%O - Focus player element to capture keyboard actions', this.prototype.focus);
    console.log('%O - Update current time with hash provided', this.prototype.useHash);
    console.groupEnd();
};
