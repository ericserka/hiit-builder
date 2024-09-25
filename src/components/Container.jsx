import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"

export const Container = ({ children }) => {
  return (
    <View style={styles.container} >
      {children}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      margin: 32,
      alignItems: 'center'
    }
  }
)
