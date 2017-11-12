const $drumkit = document.querySelector('.drumkit')
const $buttons = Array.from($drumkit.querySelectorAll('.button'))
const $sounds = Array.from($drumkit.querySelectorAll('.sound'))

for(const $button of $buttons)
{
    $button.addEventListener('mousedown', (event) =>
    {
        event.preventDefault()
        
        playSound($button.dataset.sound)
    })
}

document.addEventListener('keydown', (event) =>
{
    const $button = $buttons.find((element) => element.classList.contains(`key-${event.keyCode}`))

    if($button)
    {
        playSound($button.dataset.sound)
    }
})

const playSound = (soundName) => 
{
    const $sound = $sounds.find((element) => element.classList.contains(soundName))

    $sound.currentTime = 0
    $sound.play()
}

