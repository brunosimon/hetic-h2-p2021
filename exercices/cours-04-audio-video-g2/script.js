const $player = document.querySelector('.player')
const $video = $player.querySelector('video')
const $play = $player.querySelector('.play')
const $pause = $player.querySelector('.pause')
const $volumeDown = $player.querySelector('.volume-down')
const $volumeUp = $player.querySelector('.volume-up')
const $seekBar = $player.querySelector('.seek-bar')
const $fillBar = $seekBar.querySelector('.fill-bar')

$play.addEventListener('click', () =>
{
    $video.play()
})

$pause.addEventListener('click', () =>
{
    $video.pause()
})

$volumeDown.addEventListener('click', () =>
{
    $video.volume = Math.max(0, $video.volume - 0.1)
})

$volumeUp.addEventListener('click', () =>
{
    $video.volume = Math.min(1, $video.volume + 0.1)
})

$seekBar.addEventListener('mousedown', (event) =>
{
    event.preventDefault()

    const ratio = (event.clientX - $seekBar.offsetLeft) / $seekBar.offsetWidth
    const videoTime = ratio * $video.duration

    $video.currentTime = videoTime
})

$video.addEventListener('timeupdate', () =>
{
    const ratio = $video.currentTime / $video.duration

    $fillBar.style.transform = `scaleX(${ratio})`
})