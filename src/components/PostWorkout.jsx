import { StyleSheet, Text, View } from "react-native"

export const PostWorkout = () => {
  return (
    <View style={styles.view} >
      <Text style={styles.title}>Congratulations!</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  view: {
    flex: 1,
    justifyContent: "center"
  }
})
