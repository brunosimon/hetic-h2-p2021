if(Modernizr.touchevents)
{
    window.addEventListener('touchmove', (event) =>
    {
        // console.log(event.touches[0].clientX, event.touches[0].clientY)
    })
}
else
{
    window.addEventListener('mousemove', (event) =>
    {
        // console.log(event.clientX, event.clientY)
    })
}

const orientationSquare = document.querySelector('.orientation-square')

window.addEventListener('deviceorientation', (event) =>
{
    orientationSquare.style.transform = `rotateY(${event.alpha}deg) rotateX(${-event.beta + 90}deg) rotateZ(${event.gamma}deg)`
})