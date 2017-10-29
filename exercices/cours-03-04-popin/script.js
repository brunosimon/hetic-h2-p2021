/**
 * Learnt:
 * - mouse click event
 * - preventDefault
 * - getAttribute
 * - string slice
 * - Array find
 * - classList contains
 * - classList remove
 * - short function
 * - alert
 * - keydown event
 */

const $popinTriggers = Array.from(document.querySelectorAll('.popin-trigger'))
const $popins = Array.from(document.querySelectorAll('.popin'))

// Each trigger
for(const $popinTrigger of $popinTriggers)
{
    $popinTrigger.addEventListener('click', (event) =>
    {
        event.preventDefault()

        const href = $popinTrigger.getAttribute('href')
        const popinName = href.slice(1, href.length)

        openPopin(popinName)
    })
}

// Each popin
for(const $popin of $popins)
{
    // Close
    const $close = $popin.querySelector('.close')
    
    $close.addEventListener('click', (event) =>
    {
        event.preventDefault()

        closePopin()
    })

    // Mask
    const $mask = $popin.querySelector('.mask')
    
    $mask.addEventListener('click', (event) =>
    {
        event.preventDefault()

        closePopin()
    })
}

// Keyboard
document.addEventListener('keydown', (event) =>
{
    event.preventDefault()

    closePopin()
})

// Open popin
const openPopin = (popinName) =>
{
    const $targetPopin = $popins.find($popin => $popin.classList.contains(popinName))

    if(typeof $targetPopin === 'undefined')
    {
        alert('Popin not found')
    }
    else
    {
        $targetPopin.classList.add('active')
    }
}

// Close popin
const closePopin = () =>
{
    for(const $popin of $popins)
    {
        $popin.classList.remove('active')
    }
}