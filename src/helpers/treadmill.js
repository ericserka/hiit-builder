export const MAX_TREADMILL_SPEED = 5

export const calculateMaxSpeed = (displacement, time) => {
  const currMaxSpeed = (90 * displacement) / (61 * time)
  const actualMaxSpeed = Math.min(MAX_TREADMILL_SPEED, currMaxSpeed)
  const changed = actualMaxSpeed === MAX_TREADMILL_SPEED

  return [actualMaxSpeed, changed]
}

export const calculateDisplacement = (maxSpeed, time) => (maxSpeed * 61 * time) / 90
