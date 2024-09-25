import { Alert } from "react-native"
import { dayjs } from "./dayjs"
import { create } from 'zustand'
import { calculateMaxSpeed, calculateDisplacement, MAX_TREADMILL_SPEED, calculatePercentage, msToSec } from "./utils"

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
      const duration = dayjs.duration({ minutes, seconds })
      const [maxSpeed, changed] = calculateMaxSpeed(displacement, duration.asHours())
      const newDisplacement = changed ? calculateDisplacement(maxSpeed, duration.asHours()) : displacement

      if (changed) {
        Alert.alert(
          "Workout changed automatically",
          `Since the treadmill's maximum speed is ${MAX_TREADMILL_SPEED} km/h, your workout displacement has been updated to ${newDisplacement} km.`
        )
      }

      const speed50 = parseFloat(calculatePercentage(maxSpeed, 50).toFixed(1))
      const speed70 = parseFloat(calculatePercentage(maxSpeed, 70).toFixed(1))
      const duration10 = msToSec(calculatePercentage(duration.asMilliseconds(), 10))
      const duration20 = msToSec(calculatePercentage(duration.asMilliseconds(), 20))

      const sets = [
        { id: 0, duration: 13, speed: 0 },
        { id: 1, duration: duration10, speed: speed50 },
        { id: 2, duration: duration20, speed: speed70 },
        { id: 3, duration: duration10, speed: maxSpeed },
        { id: 4, duration: duration10, speed: speed50 },
        { id: 5, duration: duration10, speed: speed70 },
        { id: 6, duration: duration10, speed: speed50 },
        { id: 7, duration: duration10, speed: maxSpeed },
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
