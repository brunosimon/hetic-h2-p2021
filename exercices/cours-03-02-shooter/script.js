/**
 * Learnt
 * - let
 * - createElement
 * - removeChild
 * - classList add
 * - style
 * - innerHTML
 * - back quotes
 * - mouse enter event
 * - setTimeout
 */

const $shooter = document.querySelector('.shooter')
const $score = $shooter.querySelector('.score .value')
let score = 0

const addTarget = () =>
{
    // Create element
    const $target = document.createElement('div')

    // Add class and style
    $target.classList.add('target')
    $target.style.top = `${Math.random() * 100}%`
    $target.style.left = `${Math.random() * 100}%`

    // Listen to click events
    $target.addEventListener('mouseenter', (event) =>
    {
        event.preventDefault()

        // Remove target
        $shooter.removeChild($target)

        // Increment score and update DOM
        score += 1
        $score.innerHTML = score

        // Stop remove timeout
        window.clearTimeout(removeTimeout)
    })

    // Add to DOM
    $shooter.appendChild($target)

    // Wait one second and remove current target
    const removeTimeout = window.setTimeout(() =>
    {
        // Remove target
        $shooter.removeChild($target)
    }, 1000)
    
    // Wait random time and add another target
    window.setTimeout(addTarget, Math.random() * 1000)
}

// Add first target
addTarget()