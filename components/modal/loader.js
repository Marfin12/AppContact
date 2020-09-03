import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";

const App = ({isVisible}) => (
<Modal transparent={true} animationType={'none'} visible={isVisible}>
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color="#000000"/>
  </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'rgba(4,0,0,0.8)'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;