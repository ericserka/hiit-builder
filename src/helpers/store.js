import { Alert } from "react-native"
import { dayjs } from "./dayjs"
import { create } from 'zustand'
import { metersPerSecToKmh } from "./speedUnitConverter"
import { kmToMeters, metersToKm } from "./distanceUnitConverter"
import { calculatePercentage, round } from "./math"
import { calculateDisplacement, calculateMaxSpeed, MAX_TREADMILL_SPEED } from './treadmill'
import { msToSec } from "./timeUnitConverter"

export const useStore = create(set => ({
  mode: "form",
  sets: [],
  currSet: {},
  startWorkout: () => set(state => ({ mode: "workout", currSet: state.sets[0] })),
  endWorkout: () => set({ mode: "postworkout" }),
  nextSet: () => set(state => ({
    currSet: state.sets.find(s => s.id === state.currSet.id + 1)
  })
  ),
  generateHiitWorkout: (minutes, seconds, displacement) => set(state => {
    if (Number.isNaN(displacement)) {
      Alert.alert("Invalid displacement", "Fill in the form correctly")
      return state
    }
    else {
      const displacementMeters = kmToMeters(displacement)
      const duration = dayjs.duration({ minutes, seconds })
      const durationSeconds = duration.asSeconds()
      const durationMilliseconds = duration.asMilliseconds()
      const [maxSpeed, changed] = calculateMaxSpeed(displacementMeters, durationSeconds)
      const newDisplacement = changed ? calculateDisplacement(maxSpeed, durationSeconds) : displacementMeters

      if (changed) {
        Alert.alert(
          "Workout changed automatically",
          `Since the treadmill's maximum speed is ${metersPerSecToKmh(MAX_TREADMILL_SPEED)} km/h, your workout displacement has been updated to ${round(metersToKm(newDisplacement), 2)} km.`
        )
      }

      const speed50 = round(metersPerSecToKmh(calculatePercentage(maxSpeed, 50)), 1)
      const speed70 = round(metersPerSecToKmh(calculatePercentage(maxSpeed, 70)), 1)
      const speed100 = round(metersPerSecToKmh(maxSpeed), 1)
      const duration10 = round(msToSec(calculatePercentage(durationMilliseconds, 10)), 0)
      const duration20 = round(msToSec(calculatePercentage(durationMilliseconds, 20)), 0)

      const sets = [
        { id: 0, duration: 13, speed: 0 },
        { id: 1, duration: duration10, speed: speed50 },
        { id: 2, duration: duration20, speed: speed70 },
        { id: 3, duration: duration10, speed: speed100 },
        { id: 4, duration: duration10, speed: speed50 },
        { id: 5, duration: duration10, speed: speed70 },
        { id: 6, duration: duration10, speed: speed50 },
        { id: 7, duration: duration10, speed: speed100 },
        { id: 8, duration: duration10, speed: speed70 },
        { id: 9, duration: duration10, speed: speed50 },
      ]

      return {
        mode: "preworkout",
        sets
      }
    }
  })
}))
