// Create variables
const $shooter = document.querySelector('.shooter')
const $score = $shooter.querySelector('.score .value')
const $targets = $shooter.querySelector('.targets')
let score = 0

// Create target function
const createTarget = () =>
{
    // Create target element
    const $target = document.createElement('div')

    // Update class and style
    $target.classList.add('target')
    $target.style.top = `${Math.random() * 88}%`
    $target.style.left = `${Math.random() * 88}%`

    // Listen to mouse enter event
    $target.addEventListener('mouseenter', () =>
    {
        // Update score
        score++
        $score.textContent = score

        // Remove target element
        $targets.removeChild($target)

        // Clear timeout
        window.clearTimeout(timeoutId)
    })

    // Add to targets element
    $targets.appendChild($target)

    // Wait and add another target
    window.setTimeout(createTarget, Math.random() * 1000)

    // Wait and remove target
    const timeoutId = window.setTimeout(() =>
    {
        $targets.removeChild($target)
    }, 1000)
}

// Create first target
createTarget()