// Set variables
const $shooter = document.querySelector('.shooter')
const $targets = $shooter.querySelector('.targets')
const $score = $shooter.querySelector('.score .value')
let score = 0

// Create target function
const createTarget = () =>
{
    // Create element
    const $target = document.createElement('div')

    // Add class and style
    $target.classList.add('target')
    $target.style.top = `${Math.random() * 88}%`
    $target.style.left = `${Math.random() * 88}%`

    // Listen to mouse enter
    $target.addEventListener('mouseenter', () =>
    {
        // Update score
        score++
        $score.textContent = score

        // Remove target
        $targets.removeChild($target)

        // Clear remove timeout
        window.clearTimeout(timeoutId)
    })

    // Add to targets element
    $targets.appendChild($target)

    // Wait and create another
    window.setTimeout(createTarget, Math.random() * 1000)

    // Wait and delete target
    const timeoutId = window.setTimeout(() =>
    {
        // Remove target
        $targets.removeChild($target)
    }, 1000)
}

// Create first target
createTarget()
