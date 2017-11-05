// Set variables
const $player = document.querySelector('.player')
const $video = $player.querySelector('video')
const $volumeDown = $player.querySelector('.volume-down')
const $volumeUp = $player.querySelector('.volume-up')
const $seekBar = $player.querySelector('.seek-bar')
const $play = $player.querySelector('.play')
const $pause = $player.querySelector('.pause')
const $fillBar = $seekBar.querySelector('.fill-bar')

// Listen to click event on volume down button
$volumeDown.addEventListener('click', () =>
{
    // Test limit and update volume
    if($video.volume - 0.1 > 0)
    {
        $video.volume -= 0.1
    }
    else
    {
        $video.volume = 0
    }
})

// Listen to click event on volume up button
$volumeUp.addEventListener('click', () =>
{
    // Test limit and update volume
    if($video.volume + 0.1 < 1)
    {
        $video.volume += 0.1
    }
    else
    {
        $video.volume = 1
    }
})

// Listen to mousedown event on seek bar
$seekBar.addEventListener('mousedown', (event) =>
{
    // Prevent default event (text selection)
    event.preventDefault()

    // Update video current time
    const ratio = (event.clientX - $seekBar.offsetLeft) / $seekBar.offsetWidth
    const videoTime = ratio * $video.duration

    $video.currentTime = videoTime
})

// Liten to mouse down event on play button
$play.addEventListener('mousedown', (event) =>
{
    $video.play()
})

// Liten to mouse down event on pause button
$pause.addEventListener('mousedown', (event) =>
{
    $video.pause()
})

// Listen to timeupdate event on video
$video.addEventListener('timeupdate', () =>
{
    // Update fill bar scale
    const ratio = $video.currentTime / $video.duration
    $fillBar.style.transform = `scaleX(${ratio})`
})
