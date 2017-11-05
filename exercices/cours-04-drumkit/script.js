// Set variables
const $drumkit = document.querySelector('.drumkit')
const $buttons = Array.from($drumkit.querySelectorAll('.button'))
const $sounds = Array.from($drumkit.querySelectorAll('.sound'))

// Listen to keydown event
document.addEventListener('keydown', (event) =>
{
    // Find button with the keycode as class
    const $button = $buttons.find(($item) => $item.classList.contains(`key-${event.keyCode}`))

    // Play the data-sound of the button found
    if($button)
    {
        playSound($button.dataset.sound)
    }
})

// Loop through each button
for(const $button of $buttons)
{
    // Listen to mouse down event
    $button.addEventListener('mousedown', (event) =>
    {
        // Prevent default event
        event.preventDefault()

        // Play the data-sound
        playSound($button.dataset.sound)
    })
}

// Play sound function
const playSound = (soundName) =>
{
    // Found the sound with the class
    const $sound = $sounds.find(($item) => $item.classList.contains(soundName))

    // If found, reset sound and play
    if($sound)
    {
        $sound.currentTime = 0
        $sound.play()
    }
}