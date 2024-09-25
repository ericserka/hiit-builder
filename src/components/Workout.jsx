import { dayjs } from '../helpers/dayjs'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress'
import { useStore } from '../helpers/store'
import * as Speech from 'expo-speech'

export const Workout = () => {
  const { sets, currSet, nextSet, endWorkout } = useStore()
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    setSecondsLeft(currSet.duration)
  }, [currSet])

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (currSet.id === 9) {
        endWorkout()
      }
      else {
        nextSet()
      }
      return;
    }

    if (secondsLeft === 13) {
      if (currSet.id < 9) {
        const defaultSpeech = `Speed adjustment: ${sets[currSet.id + 1].speed} per hour`
        if (currSet.id === 0) {
          Speech.speak(`Let's start! ${defaultSpeech}`, { language: "en" })
        }
        else {
          Speech.speak(defaultSpeech, { language: "en" })
        }
      }
    }
    if (secondsLeft <= 5 && secondsLeft > 0) {
      Speech.speak(`${secondsLeft}`, { language: "en" })
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return (
    <View>
      <Progress.Circle
        size={320}
        borderWidth={0}
        unfilledColor="#d3d3d3"
        indeterminate={false}
        progress={1 - (secondsLeft / currSet.duration)}
        formatText={_progress => dayjs.duration(secondsLeft, "seconds").format("mm:ss")}
        showsText
      />
      <View style={styles.speedView}>
        <Text style={styles.text}>Current speed</Text>
        <Text style={styles.currSpeed}>{currSet.speed} km/h</Text>
        {currSet.id !== 9 && <Text style={styles.text}>next {sets[currSet.id + 1].speed} km/h</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  speedView: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    gap: 20
  },
  currSpeed: {
    fontWeight: "bold",
    fontSize: 64
  },
  text: {
    fontSize: 32
  }
})
