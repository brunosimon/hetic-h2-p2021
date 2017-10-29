const clock = document.querySelector('.clock')
const needleHours = clock.querySelector('.hours')
const needleMinutes = clock.querySelector('.minutes')
const needleSeconds = clock.querySelector('.seconds')

const tick = () =>
{
    const date = new Date()
    
    const hours = date.getHours()
    const hoursAngle = hours / 12 * 360
    needleHours.style.transform = `rotate(${hoursAngle}deg)`
    
    const minutes = date.getMinutes()
    const minutesAngle = hours * 360 + minutes / 60 * 360
    needleMinutes.style.transform = `rotate(${minutesAngle}deg)`
    
    const seconds = date.getSeconds()
    const secondsAngle = hours * 360 + minutes * 360 + seconds / 60 * 360
    needleSeconds.style.transform = `rotate(${secondsAngle}deg)`
}

window.setInterval(tick, 1000)
tick()