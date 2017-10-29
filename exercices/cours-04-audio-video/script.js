const $player = document.querySelector('.player')
const $video = $player.querySelector('video')
const $volumeUp = $player.querySelector('.volume-up')
const $volumeDown = $player.querySelector('.volume-down')
const $seekBar = $player.querySelector('.seek-bar')
const $fillBar = $seekBar.querySelector('.fill-bar')

$volumeUp.addEventListener('click', () =>
{
    if($video.volume + 0.1 > 1)
    {
        $video.volume = 1
    }
    else
    {
        $video.volume += 0.1
    }
})

$volumeDown.addEventListener('click', () =>
{
    if($video.volume - 0.1 < 0)
    {
        $video.volume = 0
    }
    else
    {
        $video.volume -= 0.1
    }
})

$seekBar.addEventListener('click', (event) =>
{
    const ratio = (event.clientX - $seekBar.offsetLeft) / $seekBar.offsetWidth
    const time = ratio * $video.duration

    $video.currentTime = time
})

$video.addEventListener('timeupdate', () =>
{
    const ratio = $video.currentTime / $video.duration
    $fillBar.style.transform = `scaleX(${ratio})`
})