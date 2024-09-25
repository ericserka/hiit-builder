export const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index)

export const MAX_TREADMILL_SPEED = 18

export const calculateMaxSpeed = (displacementKm, timeHs) => {
  const currMaxSpeed = (90 * displacementKm) / (61 * timeHs)
  const actualMaxSpeed = Math.min(MAX_TREADMILL_SPEED, currMaxSpeed)
  const changed = actualMaxSpeed === MAX_TREADMILL_SPEED

  return [parseFloat(actualMaxSpeed.toFixed(1)), changed]
}

export const calculateDisplacement = (maxSpeedKmh, timeHs) => {
  const displacement = (maxSpeedKmh * 61 * timeHs) / 90

  return parseFloat(displacement.toFixed(2))
}

export const calculatePercentage = (number, percentage) => number * (percentage / 100)

export const msToSec = (ms) => {
  const sec = ms / 1000

  return parseFloat(sec.toFixed(0))
}
