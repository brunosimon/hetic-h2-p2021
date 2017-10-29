/**
 * Learnt:
 * - const
 * - query selector
 * - Date
 * - back quote string
 * - setInterval
 */

const clock = document.querySelector('.clock')
const hoursNeedle = document.querySelector('.needle.hours')
const minutesNeedle = document.querySelector('.needle.minutes')
const secondsNeedle = document.querySelector('.needle.seconds')

const tick = () =>
{
    const date = new Date()

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const hoursAngle = hours / 24 * 360
    const minutesAngle = hours * 360 + minutes / 60 * 360
    const secondsAngle = hours * 360 + minutes * 360 + seconds / 60 * 360

    hoursNeedle.style.transform = `rotate(${hoursAngle}deg)`
    minutesNeedle.style.transform = `rotate(${minutesAngle}deg)`
    secondsNeedle.style.transform = `rotate(${secondsAngle}deg)`
}

window.setInterval(tick, 1000)
tick()