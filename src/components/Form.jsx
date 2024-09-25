import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View, Button } from "react-native"
import { range } from "../helpers/utils"
import { useStore } from "../helpers/store"

export const Form = () => {
  const [displacement, setDisplacement] = useState("")
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const state = useStore(state => state)

  const generateHiitWorkout = () => {
    state.generateHiitWorkout(minutes, seconds, parseFloat(displacement))
  }

  const onChangeDisplacement = (value) => {
    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(value)) {
      setDisplacement(value);
    }
  }

  return (
    <View>
      <Text style={styles.title} >Provide the desired workout time and displacement</Text>
      <TextInput
        inputMode="decimal"
        style={styles.input}
        value={displacement}
        onChangeText={onChangeDisplacement}
        placeholder="Displacement in km"
      />
      <Text style={styles.pickerLabel}>Minutes</Text>
      <Picker
        selectedValue={minutes}
        onValueChange={(itemValue, _itemIndex) =>
          setMinutes(itemValue)
        }
        style={styles.input}
      >
        {range(1, 59).map(n => (
          <Picker.Item key={n} label={n} value={n} />
        ))}
      </Picker>
      <Text style={styles.pickerLabel}>Seconds</Text>
      <Picker
        selectedValue={seconds}
        onValueChange={(itemValue, _itemIndex) =>
          setSeconds(itemValue)
        }
        style={styles.input}
      >
        {range(0, 59).map(n => (
          <Picker.Item key={n} label={n} value={n} />
        ))}
      </Picker>
      <Pressable
        style={styles.pressable}
        onPress={generateHiitWorkout}
      >
        <Text style={{ color: "white" }}>Generate HIIT Workout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    marginVertical: 12,
  },
  pickerLabel: {
    textTransform: "capitalize",
    fontWeight: "bold"
  },
  pressable: {
    backgroundColor: "blue",
    fontWeight: "bold",
    height: 40,
    padding: 10,
    flex: 1,
    alignItems: "center"
  }
})

