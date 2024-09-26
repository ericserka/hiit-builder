import { Pressable, StyleSheet, Text, View } from "react-native"
import { useStore } from "../helpers/store"

export const PreWorkout = () => {
  const { startWorkout } = useStore()

  return (
    <View>
      <Text style={styles.title}>HIIT workout generated successfully! When ready, press the button below</Text>
      <Pressable onPress={startWorkout} style={styles.pressable}>
        <Text style={{ color: "white" }}>Start Workout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },
  pressable: {
    backgroundColor: "blue",
    fontWeight: "bold",
    height: 40,
    padding: 10,
    alignItems: "center"
  }
})
